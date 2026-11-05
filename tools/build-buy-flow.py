#!/usr/bin/env python3
"""يبني نموذجَ الشراء داخل واتساب (WhatsApp Flow) — data/wa-flow/buy-flow.json.

من مسودّةِ «نموذج شراء شوجب في واتساب» التي وافقَ عليها المالك ٢٠٢٦-١٠-٢٧ (لوحةُ التصميم
https://claude.ai/artifact/GULF3QzYDyHfyJDzurFi8Y)، وطلبَ تجربتَها ٢٠٢٦-١١-٠٥:
  ١ اختاري كتبكِ (رقائقُ لكلِّ صفٍّ والمجموعُ يتحدّث)  ←  ٢ راجعي طلبكِ وادفعي (وسؤالُ صورة أم PDF)
  ←  ٣ أرفقي الإيصال (شاشةُ صورةٍ أو شاشةُ ملفّ — واتساب لا يجمعُ المنتقيَين في شاشة).

بلا خادم (لا data_exchange): المجموعُ يُحسَبُ في الهاتف — لكلِّ كتابٍ متغيّرٌ b_… يصيرُ ٣ عندَ اختيارِه
و٠ عندَ إلغائِه (‏update_data في on-select/on-unselect، ‏Flow JSON 7.1)، والمجموعُ جمعُها (‏nested expressions).
والكتبُ هي المعروضةُ للبيعِ اليومَ تُقرأُ من data/books.json وdata/bundles.json (‏onSale) — فكتابٌ جديدٌ للبيعِ
يدخلُ بإعادةِ التشغيل. والكتابُ المختارُ في الموقعِ يأتي محدَّداً سلفاً: يُرسِلُ n8n ‏sel_gN وb_… في بياناتِ الشاشةِ الأولى.

التشغيل:  python3 tools/build-buy-flow.py   ثمّ يُرفَعُ بسيرِ n8n «شوجب — نماذج واتساب (إنشاء ونشر)».
"""
import json
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / 'data' / 'wa-flow' / 'buy-flow.json'
PRICE = 3
TRANSFER = '91496256'          # رقمُ التحويل كما في docs/whatsapp-assistant-prompt.md
GRADES = [('1', 'الأول'), ('2', 'الثاني'), ('3', 'الثالث'), ('4', 'الرابع')]
# ترتيبُ الموادِّ في الرقائق (المطروحُ وحدَه يظهر)
ORDER = ['sci', 'math', 'lug', 'din', 'en', 'it', 'hw']
SHORT = {'sci': 'العلوم', 'math': 'الرياضيات', 'lug': 'أحب لغتي', 'din': 'ديني حياتي',
         'en': 'الإنجليزية', 'it': 'عالمي الرقمي', 'hw': 'الهوية والمواطنة'}
GRADE_AR = {v: k for k, v in GRADES}


def on_sale():
    books = json.loads((ROOT / 'data' / 'books.json').read_text(encoding='utf-8'))
    bundles = json.loads((ROOT / 'data' / 'bundles.json').read_text(encoding='utf-8'))
    members = {m for b in bundles.values() for m in b['members']}
    units = {g: [] for g, _ in GRADES}
    for grades in books.values():
        for gname, lst in grades.items():
            for b in lst:
                if b['key'] in members or not b.get('onSale') or b.get('devOnly'):
                    continue
                units[GRADE_AR[gname]].append(b['key'])
    for key, b in bundles.items():
        if b.get('onSale'):
            units[GRADE_AR[b['grade']]].append(key)
    for g in units:
        units[g].sort(key=lambda k: ORDER.index(k.split('-')[1]))
    return units


UNITS = on_sale()
ALL = [k for g, _ in GRADES for k in UNITS[g]]


def var(key):
    return 'b_' + key.replace('-', '_')


def total_expr():
    # على نمطِ مثالِ ميتا نفسِه: نصٌّ ثمّ عمليّةٌ حسابيّة (لا نصَّ بعدَها)
    return '`\'المجموع بالريال: \' ' + ' + '.join('${data.' + var(k) + '}' for k in ALL) + '`'


def grade_sum(g):
    return ' + '.join('${data.' + var(k) + '}' for k in UNITS[g])


def data_block():
    d = {('sel_g' + g): {'type': 'array', 'items': {'type': 'string'}, '__example__': []} for g, _ in GRADES}
    for k in ALL:
        d[var(k)] = {'type': 'number', '__example__': 0}
    return d


def carry():
    """ما يُحمَلُ من شاشةٍ إلى التالية: الاختياراتُ وقيمُ المجموع."""
    p = {('sel_g' + g): '${data.sel_g' + g + '}' for g, _ in GRADES}
    for k in ALL:
        p[var(k)] = '${data.' + var(k) + '}'
    return p


def chips(g, gname):
    return {
        'type': 'ChipsSelector', 'name': 'g' + g, 'label': 'الصف ' + gname,
        'max-selected-items': len(UNITS[g]), 'required': False,
        'init-value': '${data.sel_g' + g + '}',
        'data-source': [{
            'id': k, 'title': SHORT[k.split('-')[1]],
            'on-select-action': {'name': 'update_data', 'payload': {var(k): PRICE}},
            'on-unselect-action': {'name': 'update_data', 'payload': {var(k): 0}},
        } for k in UNITS[g]],
    }


def summary_lines():
    """سطرٌ لكلِّ كتابٍ مختار (يظهرُ إن كانَ مختاراً) — قائمةُ الطلبِ للقراءةِ فقط."""
    out = []
    for g, gname in GRADES:
        for k in UNITS[g]:
            out.append({'type': 'TextBody', 'text': '📘 ' + SHORT[k.split('-')[1]] + ' — الصف ' + gname,
                        'visible': '`${data.' + var(k) + '} > 0`'})
    return out


books_payload = {('sel_g' + g): '${form.g' + g + '}' for g, _ in GRADES}
books_payload.update({var(k): '${data.' + var(k) + '}' for k in ALL})


def receipt_screen(sid, picker, rtype):
    complete = {'kind': 'buy', 'rtype': rtype, 'receipt': '${form.receipt}'}
    complete.update({('g' + g): '${data.sel_g' + g + '}' for g, _ in GRADES})
    return {
        'id': sid, 'title': 'أرفقي الإيصال', 'terminal': True, 'data': data_block(),
        'layout': {'type': 'SingleColumnLayout', 'children': [
            {'type': 'TextCaption', 'text': 'الخطوة ٣ من ٣'},
            {'type': 'TextBody', 'text': 'أرفقي إيصال التحويل، وتأكّدي أن يظهر فيه المبلغ ورقم المرجع.'},
            picker,
            {'type': 'TextSubheading', 'text': total_expr()},
            {'type': 'Footer', 'label': 'إرسال الطلب', 'on-click-action': {'name': 'complete', 'payload': complete}},
        ]},
    }


flow = {
    'version': '7.1',
    'screens': [
        {
            'id': 'BOOKS', 'title': 'اختاري كتبكِ', 'data': data_block(),
            'layout': {'type': 'SingleColumnLayout', 'children': [
                {'type': 'TextCaption', 'text': 'الخطوة ١ من ٣'},
                {'type': 'TextHeading', 'text': 'كتب الفصل الدراسي الأول'},
                {'type': 'TextBody', 'text': 'سعر الكتاب ٣ ريالات، ويمكنكِ أن تختاري كتباً من أكثر من صف.'},
            ] + [chips(g, gname) for g, gname in GRADES] + [
                {'type': 'TextSubheading', 'text': total_expr()},
                {'type': 'Footer', 'label': 'مراجعة الطلب', 'on-click-action': {
                    'name': 'navigate', 'next': {'type': 'screen', 'name': 'REVIEW'}, 'payload': books_payload}},
            ]},
        },
        {
            'id': 'REVIEW', 'title': 'راجعي طلبكِ وادفعي', 'data': data_block(),
            'layout': {'type': 'SingleColumnLayout', 'children': [
                {'type': 'TextCaption', 'text': 'الخطوة ٢ من ٣'},
                {'type': 'TextSubheading', 'text': 'طلبكِ'},
            ] + summary_lines() + [
                {'type': 'TextBody', 'text': 'لم تختاري كتاباً بعد. ارجعي إلى الخطوة السابقة.',
                 'visible': '`' + ' + '.join('${data.' + var(k) + '}' for k in ALL) + ' == 0`'},
                {'type': 'TextSubheading', 'text': total_expr()},
                {'type': 'TextSubheading', 'text': 'الدفع'},
                {'type': 'TextBody', 'text': 'حوّلي المبلغ من تطبيق بنككِ برقم الهاتف إلى:'},
                {'type': 'TextHeading', 'text': TRANSFER},
                {'type': 'TextCaption', 'text': 'IBRAHIM KHAMIS — بنك مسقط. وتُقبل التحويلات من البنوك المحلية جميعها. بعد التحويل احفظي الإيصال، وستُرفقينه في الخطوة التالية.'},
                {'type': 'RadioButtonsGroup', 'name': 'rtype', 'label': 'إيصالكِ محفوظ على شكل', 'required': True,
                 'init-value': 'photo',
                 'data-source': [{'id': 'photo', 'title': 'صورة أو لقطة شاشة'}, {'id': 'pdf', 'title': 'ملف PDF'}]},
                {'type': 'If', 'condition': "`${form.rtype} == 'pdf'`",
                 'then': [{'type': 'Footer', 'label': 'إرفاق الإيصال', 'on-click-action': {
                     'name': 'navigate', 'next': {'type': 'screen', 'name': 'RECEIPT_PDF'}, 'payload': carry()}}],
                 'else': [{'type': 'Footer', 'label': 'إرفاق الإيصال', 'on-click-action': {
                     'name': 'navigate', 'next': {'type': 'screen', 'name': 'RECEIPT_PHOTO'}, 'payload': carry()}}]},
            ]},
        },
        receipt_screen('RECEIPT_PHOTO', {
            'type': 'PhotoPicker', 'name': 'receipt', 'label': 'صورة الإيصال',
            'description': 'صورة واحدة من المعرض أو الكاميرا.', 'photo-source': 'camera_gallery',
            'min-uploaded-photos': 1, 'max-uploaded-photos': 1, 'max-file-size-kb': 10240}, 'photo'),
        receipt_screen('RECEIPT_PDF', {
            'type': 'DocumentPicker', 'name': 'receipt', 'label': 'ملف الإيصال',
            'description': 'ملف PDF واحد من هاتفكِ.', 'allowed-mime-types': ['application/pdf'],
            'min-uploaded-documents': 1, 'max-uploaded-documents': 1, 'max-file-size-kb': 10240}, 'pdf'),
    ],
}

OUT.write_text(json.dumps(flow, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')
print(OUT.relative_to(ROOT), round(OUT.stat().st_size / 1024, 1), 'ك.ب ·', len(ALL), 'كتاباً للبيع')
