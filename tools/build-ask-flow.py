#!/usr/bin/env python3
"""يبني نموذجَ «مساعد شوجب» داخل واتساب (WhatsApp Flow) — data/wa-flow/ask-flow.json.

طلبُ المالك ٢٠٢٦-١١-٠٥: «أريد أن يكون التصميم داخل الواتساب» (لا صفحةً في المتصفح — ask.html).
النموذجُ بلا خادم (لا data_exchange): خمسُ شاشات تنتهي بإجراء «complete»، فيصلُ ما اختارته
في رسالةِ nfm_reply إلى «استقبال واتساب» ← «مساعد أولياء الأمور» كأيّ سؤال.

الصورُ base64 داخلَ الملفّ نفسِه (واتساب لا يقبلُ روابطَ صورٍ في النماذج) — مصدرُها images/wa/flow/
(دوائرُ الصفوفِ والموادِّ بسلالمِ ألوانِ المنصّة، ورسومُ المكتبة). حدودُ واتساب: صورةُ عنصرِ القائمةِ ≤ ١٠٠ ك.ب،
وصورةُ Image ≤ ٣٠٠ ك.ب، وعناوينُ الخيارات ≤ ٣٠ حرفاً، ووصفُ عنصرِ NavigationList ≤ ٢٠ حرفاً.

التشغيل:  python3 tools/build-ask-flow.py   ثمّ يُرفَعُ بسيرِ n8n «شوجب — نموذج مساعد أولياء الأمور (إنشاء ونشر)».
"""
import base64
import json
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
IMG = ROOT / 'images' / 'wa' / 'flow'
OUT = ROOT / 'data' / 'wa-flow' / 'ask-flow.json'


def b64(name):
    data = (IMG / name).read_bytes()
    assert len(data) <= 100 * 1024 or name.startswith('b-'), name + ' أكبرُ من ١٠٠ ك.ب'
    return base64.b64encode(data).decode('ascii')


GRADES = [('1', 'الصف الأول', 'g1.png'), ('2', 'الصف الثاني', 'g2.png'),
          ('3', 'الصف الثالث', 'g3.png'), ('4', 'الصف الرابع', 'g4.png')]
SUBJECTS = [('sci', 'العلوم'), ('math', 'الرياضيات'), ('lug', 'أحب لغتي'), ('en', 'اللغة الإنجليزية'),
            ('din', 'ديني حياتي'), ('it', 'عالمي الرقمي'), ('hw', 'الهوية والمواطنة')]


def grade_radio():
    return {'type': 'RadioButtonsGroup', 'name': 'grade', 'label': 'الصف', 'required': True,
            'data-source': [{'id': k, 'title': t, 'image': b64(f), 'alt-text': t} for k, t, f in GRADES]}


def subject_radio():
    return {'type': 'RadioButtonsGroup', 'name': 'subject', 'label': 'المادة', 'required': True,
            'data-source': [{'id': k, 'title': t, 'image': b64('s-' + k + '.png'), 'alt-text': t} for k, t in SUBJECTS]}


def s(example):
    return {'type': 'string', '__example__': example}


flow = {
    'version': '7.1',
    'screens': [
        {
            'id': 'ROLE',
            'title': 'مساعد شوجب',
            'layout': {'type': 'SingleColumnLayout', 'children': [{
                'type': 'NavigationList',
                'name': 'role',
                'label': 'كيف نساعدكِ اليوم؟',
                'description': 'اختاري، ويصلكِ الردّ في هذه المحادثة.',
                'media-size': 'large',
                'list-items': [
                    {'id': 'parent',
                     'main-content': {'title': 'أنا وليّة أمر', 'description': 'سؤال عن واجب طفلكِ',
                                      'metadata': 'صورة الواجب أو سؤالكِ، ونشرح لكِ كيف تشرحينه له.'},
                     'start': {'image': b64('a-earth.png'), 'alt-text': 'الأرض'},
                     'on-click-action': {'name': 'navigate', 'next': {'type': 'screen', 'name': 'PARENT_PICK'}, 'payload': {}}},
                    {'id': 'teacher',
                     'main-content': {'title': 'أنا معلّمة', 'description': 'رسالة لجروب الأمهات',
                                      'metadata': 'صورة السبّورة تصير رسالةً جاهزةً لجروب الصف.'},
                     'start': {'image': b64('a-moon.png'), 'alt-text': 'القمر'},
                     'on-click-action': {'name': 'navigate', 'next': {'type': 'screen', 'name': 'TEACHER_PICK'}, 'payload': {}}},
                ],
            }]},
        },
        {
            'id': 'PARENT_PICK',
            'title': 'سؤال عن الواجب',
            'layout': {'type': 'SingleColumnLayout', 'children': [
                {'type': 'Image', 'src': b64('b-parent.jpg'), 'height': 130, 'scale-type': 'cover', 'alt-text': 'الأرض بين السحب'},
                {'type': 'TextSubheading', 'text': 'اختاري صفّ طفلكِ ومادّته'},
                grade_radio(),
                subject_radio(),
                {'type': 'Footer', 'label': 'التالي', 'on-click-action': {
                    'name': 'navigate', 'next': {'type': 'screen', 'name': 'PARENT_ASK'},
                    'payload': {'grade': '${form.grade}', 'subject': '${form.subject}'}}},
            ]},
        },
        {
            'id': 'PARENT_ASK',
            'title': 'سؤال عن الواجب',
            'terminal': True,
            'data': {'grade': s('2'), 'subject': s('math')},
            'layout': {'type': 'SingleColumnLayout', 'children': [
                {'type': 'PhotoPicker', 'name': 'photos', 'label': 'صورة الواجب',
                 'description': 'حتى ٣ صور من الكتاب أو ورقة الواجب.',
                 'photo-source': 'camera_gallery', 'min-uploaded-photos': 0, 'max-uploaded-photos': 3, 'max-file-size-kb': 10240},
                {'type': 'TextArea', 'name': 'question', 'label': 'سؤالكِ', 'required': False, 'max-length': 600,
                 'helper-text': 'مثلاً: لا أعرف كيف أشرح له الجمع مع الحمل'},
                {'type': 'RadioButtonsGroup', 'name': 'voice', 'label': 'كيف يصلكِ الردّ؟', 'required': True, 'init-value': '1',
                 'data-source': [{'id': '0', 'title': 'مكتوباً', 'image': b64('v0.png'), 'alt-text': 'مكتوب'},
                                 {'id': '1', 'title': 'مكتوباً وصوتيّة', 'image': b64('v1.png'), 'alt-text': 'صوتيّة'}]},
                {'type': 'TextCaption', 'text': 'يشرح لكِ المساعد الحلّ وطريقة تعليمه لطفلكِ، ولا يحلّ الواجب عنه. ولسؤالٍ بصوتكِ أرسلي صوتيّة في المحادثة.'},
                {'type': 'Footer', 'label': 'أرسلي السؤال', 'on-click-action': {'name': 'complete', 'payload': {
                    'role': 'parent', 'grade': '${data.grade}', 'subject': '${data.subject}',
                    'photos': '${form.photos}', 'question': '${form.question}', 'voice': '${form.voice}'}}},
            ]},
        },
        {
            'id': 'TEACHER_PICK',
            'title': 'رسالة لجروب الأمهات',
            'layout': {'type': 'SingleColumnLayout', 'children': [
                {'type': 'Image', 'src': b64('b-teacher.jpg'), 'height': 130, 'scale-type': 'cover', 'alt-text': 'القمر والقمر الصناعي'},
                {'type': 'RadioButtonsGroup', 'name': 'kind', 'label': 'ماذا تُرسلين للأمهات؟', 'required': True, 'init-value': 'today',
                 'media-size': 'large',
                 'data-source': [
                     {'id': 'today', 'title': 'ماذا تعلّمنا اليوم؟', 'description': 'صورة السبّورة تصير ملخّصاً للدرس ونشاطاً في البيت.',
                      'image': b64('k-today.png'), 'alt-text': 'رسالة'},
                     {'id': 'notice', 'title': 'إعلان', 'description': 'اختبار، أدوات مطلوبة، موعد، أو تذكير.',
                      'image': b64('k-notice.png'), 'alt-text': 'إعلان'},
                     {'id': 'homework', 'title': 'شرح الواجب', 'description': 'شرح أسئلة الواجب للأمهات، وكيف يساعدن أطفالهن فيه.',
                      'image': b64('k-homework.png'), 'alt-text': 'واجب'}]},
                grade_radio(),
                subject_radio(),
                {'type': 'Footer', 'label': 'التالي', 'on-click-action': {
                    'name': 'navigate', 'next': {'type': 'screen', 'name': 'TEACHER_SEND'},
                    'payload': {'kind': '${form.kind}', 'grade': '${form.grade}', 'subject': '${form.subject}'}}},
            ]},
        },
        {
            'id': 'TEACHER_SEND',
            'title': 'رسالة لجروب الأمهات',
            'terminal': True,
            'data': {'kind': s('today'), 'grade': s('2'), 'subject': s('sci')},
            'layout': {'type': 'SingleColumnLayout', 'children': [
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
print(OUT.relative_to(ROOT), round(OUT.stat().st_size / 1024), 'ك.ب')
