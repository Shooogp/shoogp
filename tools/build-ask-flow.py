#!/usr/bin/env python3
"""يبني نموذجَ «مساعد شوجب» داخل واتساب (WhatsApp Flow) — data/wa-flow/ask-flow.json.

طلبُ المالك ٢٠٢٦-١١-٠٥: «أريد أن يكون التصميم داخل الواتساب»، ثمّ في اليومِ نفسِه: «طبِّقْ نفسَ هذا النمطِ»
— نمطَ نموذجِ الشراء (tools/build-buy-flow.py): عدّادُ خطوات، ورقائقُ للاختيار، وسطرُ ملخّصٍ بما اختارت،
وزرٌّ أسفلَ كلِّ شاشة، بلا صور. فحلَّ محلَّ النسخةِ الأولى (دوائرُ الصفوفِ والموادِّ صوراً — images/wa/flow/).

بلا خادم (لا data_exchange): الصفُّ والمادّةُ رقيقةٌ واحدةٌ من كلٍّ، ويحفظُ اختيارَها update_data في متغيّراتِ الشاشة
(‏grade/gname · subject/sname) فيظهرُ الملخّصُ ويُحمَلُ إلى الشاشةِ التالية. وما يصلُ في nfm_reply هو ما يقرؤه
«تجهيز الرسالة» في سيرِ أولياءِ الأمور كما كان: role · grade · subject · photos · question · voice / kind · note.

التشغيل:  python3 tools/build-ask-flow.py   ثمّ يُرفَعُ بسيرِ n8n «شوجب — نماذج واتساب (إنشاء ونشر)» (زرّ «تحديث نموذج المساعد»).
"""
import json
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / 'data' / 'wa-flow' / 'ask-flow.json'

GRADES = [('1', 'الصف الأول'), ('2', 'الصف الثاني'), ('3', 'الصف الثالث'), ('4', 'الصف الرابع')]
SUBJECTS = [('sci', 'العلوم'), ('math', 'الرياضيات'), ('lug', 'أحب لغتي'), ('en', 'الإنجليزية'),
            ('din', 'ديني حياتي'), ('it', 'عالمي الرقمي'), ('hw', 'الهوية والمواطنة')]
KINDS = [('today', 'ماذا تعلّمنا اليوم؟', 'صورة السبّورة تصير ملخّصاً للدرس ونشاطاً في البيت.'),
         ('notice', 'إعلان', 'اختبار، أدوات مطلوبة، موعد، أو تذكير.'),
         ('homework', 'شرح الواجب', 'شرح أسئلة الواجب للأمهات، وكيف يساعدن أطفالهن فيه.')]

PICK = ['grade', 'gname', 'subject', 'sname']


def s(example=''):
    return {'type': 'string', '__example__': example}


def chips(name, label, items, key, title_key):
    """رقائقُ باختيارٍ واحد، يحفظُ اختيارَها في متغيّرَي الشاشة (المعرّف والاسم)."""
    return {
        'type': 'ChipsSelector', 'name': name, 'label': label, 'required': True,
        'min-selected-items': 1, 'max-selected-items': 1,
        'data-source': [{
            'id': i, 'title': t,
            'on-select-action': {'name': 'update_data', 'payload': {key: i, title_key: t}},
            'on-unselect-action': {'name': 'update_data', 'payload': {key: '', title_key: ''}},
        } for i, t in items],
    }


CHOSEN = "`${data.grade} != '' && ${data.subject} != ''`"
WHERE = "`${data.sname} ' — ' ${data.gname}`"


def summary():
    return {'type': 'TextSubheading', 'text': WHERE, 'visible': CHOSEN}


def carry(extra=None):
    p = {k: '${data.' + k + '}' for k in PICK}
    p.update(extra or {})
    return p


EMPTY = {k: '' for k in PICK}

flow = {
    'version': '7.1',
    'screens': [
        {
            'id': 'ROLE', 'title': 'مساعد شوجب',
            'layout': {'type': 'SingleColumnLayout', 'children': [
                {'type': 'TextHeading', 'text': 'كيف نساعدكِ اليوم؟'},
                {'type': 'TextBody', 'text': 'اختاري، ويصلكِ الردّ في هذه المحادثة.'},
                {'type': 'RadioButtonsGroup', 'name': 'role', 'label': 'أنا', 'required': True, 'init-value': 'parent',
                 'data-source': [
                     {'id': 'parent', 'title': 'وليّة أمر — سؤال عن الواجب',
                      'description': 'صورة الواجب أو سؤالكِ، ونشرح لكِ كيف تشرحينه لطفلكِ.'},
                     {'id': 'teacher', 'title': 'معلّمة — رسالة لجروب الأمهات',
                      'description': 'صورة السبّورة تصير رسالةً جاهزةً لجروب الصف.'}]},
                {'type': 'If', 'condition': "`${form.role} == 'teacher'`",
                 'then': [{'type': 'Footer', 'label': 'التالي', 'on-click-action': {
                     'name': 'navigate', 'next': {'type': 'screen', 'name': 'TEACHER_PICK'}, 'payload': EMPTY}}],
                 'else': [{'type': 'Footer', 'label': 'التالي', 'on-click-action': {
                     'name': 'navigate', 'next': {'type': 'screen', 'name': 'PARENT_PICK'}, 'payload': EMPTY}}]},
            ]},
        },
        {
            'id': 'PARENT_PICK', 'title': 'سؤال عن الواجب', 'data': {k: s() for k in PICK},
            'layout': {'type': 'SingleColumnLayout', 'children': [
                {'type': 'TextCaption', 'text': 'الخطوة ١ من ٢'},
                {'type': 'TextHeading', 'text': 'صفّ طفلكِ ومادّته'},
                chips('g', 'الصف', GRADES, 'grade', 'gname'),
                chips('s', 'المادة', SUBJECTS, 'subject', 'sname'),
                summary(),
                {'type': 'Footer', 'label': 'التالي', 'on-click-action': {
                    'name': 'navigate', 'next': {'type': 'screen', 'name': 'PARENT_ASK'}, 'payload': carry()}},
            ]},
        },
        {
            'id': 'PARENT_ASK', 'title': 'سؤال عن الواجب', 'terminal': True, 'data': {k: s() for k in PICK},
            'layout': {'type': 'SingleColumnLayout', 'children': [
                {'type': 'TextCaption', 'text': 'الخطوة ٢ من ٢'},
                {'type': 'TextSubheading', 'text': WHERE},
                {'type': 'PhotoPicker', 'name': 'photos', 'label': 'صورة الواجب',
                 'description': 'حتى ٣ صور من الكتاب أو ورقة الواجب.',
                 'photo-source': 'camera_gallery', 'min-uploaded-photos': 0, 'max-uploaded-photos': 3, 'max-file-size-kb': 10240},
                {'type': 'TextArea', 'name': 'question', 'label': 'سؤالكِ', 'required': False, 'max-length': 600,
                 'helper-text': 'مثلاً: لا أعرف كيف أشرح له الجمع مع الحمل'},
                {'type': 'RadioButtonsGroup', 'name': 'voice', 'label': 'كيف يصلكِ الردّ؟', 'required': True, 'init-value': '1',
                 'data-source': [{'id': '0', 'title': 'مكتوباً'}, {'id': '1', 'title': 'مكتوباً وصوتيّة'}]},
                {'type': 'TextCaption', 'text': 'يشرح لكِ المساعد الحلّ وطريقة تعليمه لطفلكِ، ولا يحلّ الواجب عنه. ولسؤالٍ بصوتكِ أرسلي صوتيّة في المحادثة.'},
                {'type': 'Footer', 'label': 'أرسلي السؤال', 'on-click-action': {'name': 'complete', 'payload': {
                    'role': 'parent', 'grade': '${data.grade}', 'subject': '${data.subject}',
                    'photos': '${form.photos}', 'question': '${form.question}', 'voice': '${form.voice}'}}},
            ]},
        },
        {
            'id': 'TEACHER_PICK', 'title': 'رسالة لجروب الأمهات', 'data': {k: s() for k in PICK},
            'layout': {'type': 'SingleColumnLayout', 'children': [
                {'type': 'TextCaption', 'text': 'الخطوة ١ من ٢'},
                {'type': 'RadioButtonsGroup', 'name': 'kind', 'label': 'ماذا تُرسلين للأمهات؟', 'required': True, 'init-value': 'today',
                 'data-source': [{'id': k, 'title': t, 'description': d} for k, t, d in KINDS]},
                chips('g', 'الصف', GRADES, 'grade', 'gname'),
                chips('s', 'المادة', SUBJECTS, 'subject', 'sname'),
                summary(),
                {'type': 'Footer', 'label': 'التالي', 'on-click-action': {
                    'name': 'navigate', 'next': {'type': 'screen', 'name': 'TEACHER_SEND'},
                    'payload': carry({'kind': '${form.kind}'})}},
            ]},
        },
        {
            'id': 'TEACHER_SEND', 'title': 'رسالة لجروب الأمهات', 'terminal': True,
            'data': dict({k: s() for k in PICK}, kind=s('today')),
            'layout': {'type': 'SingleColumnLayout', 'children': [
                {'type': 'TextCaption', 'text': 'الخطوة ٢ من ٢'},
            ] + [{'type': 'TextSubheading', 'text': t, 'visible': "`${data.kind} == '" + k + "'`"} for k, t, _ in KINDS] + [
                {'type': 'TextBody', 'text': WHERE},
                {'type': 'PhotoPicker', 'name': 'photos', 'label': 'صور السبّورة أو الواجب',
                 'description': 'حتى ٣ صور. وللإعلان يكفي النصّ.',
                 'photo-source': 'camera_gallery', 'min-uploaded-photos': 0, 'max-uploaded-photos': 3, 'max-file-size-kb': 10240},
                {'type': 'TextArea', 'name': 'note', 'label': 'ما تريدين إضافته', 'required': False, 'max-length': 600,
                 'helper-text': 'مثلاً: الاختبار القصير يوم الأحد'},
                {'type': 'OptIn', 'name': 'consent', 'required': True,
                 'label': 'صوّرتُ السبّورة أو الواجب وحده: بلا وجوه التلاميذ ولا أسمائهم.'},
                {'type': 'TextCaption', 'text': 'تصلكِ الرسالة جاهزةً في المحادثة، فتعيدين توجيهها إلى جروب الصف.'},
                {'type': 'Footer', 'label': 'اكتبي الرسالة', 'on-click-action': {'name': 'complete', 'payload': {
                    'role': 'teacher', 'kind': '${data.kind}', 'grade': '${data.grade}', 'subject': '${data.subject}',
                    'photos': '${form.photos}', 'note': '${form.note}'}}},
            ]},
        },
    ],
}

OUT.write_text(json.dumps(flow, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')
print(OUT.relative_to(ROOT), round(OUT.stat().st_size / 1024, 1), 'ك.ب')
