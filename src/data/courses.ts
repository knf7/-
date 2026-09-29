import { Major, Course } from '../types';

export const MAJORS: Major[] = [
  { id: 'cs', name: 'علوم الحاسب' },
  { id: 'is', name: 'نظم المعلومات' },
  { id: 'ba', name: 'إدارة أعمال' },
  { id: 'med', name: 'طب' },
  { id: 'eng', name: 'هندسة' },
  { id: 'gen', name: 'مواد عامة' },
];

export const COURSES: Course[] = [
  {
    id: 'is-321',
    code: 'IS-321',
    name: 'قواعد البيانات',
    majorId: 'cs',
    description: 'تصميم وبناء قواعد البيانات العلائقية ومفاهيم التطبيع (Normalization)',
    totalSlides: 48,
    filesCount: 4,
  },
  {
    id: 'is-324',
    code: 'IS-324',
    name: 'إدارة المشاريع',
    majorId: 'is',
    description: 'منهجيات أجايل، إدارة الموارد والجدولة الزمنية للمشاريع التقنية',
    totalSlides: 36,
    filesCount: 3,
  },
  {
    id: 'is-422',
    code: 'IS-422',
    name: 'التجارة الإلكترونية',
    majorId: 'is',
    description: 'بنية المتاجر الرقمية وبوابات الدفع وسلاسل التوريد الإلكترونية',
    totalSlides: 28,
    filesCount: 2,
  },
  {
    id: 'is-451',
    code: 'IS-451',
    name: 'أمن المعلومات',
    majorId: 'cs',
    description: 'التشفير، أمن الشبكات، والتحكم بالوصول والسياسات الأمنية',
    totalSlides: 52,
    filesCount: 5,
  },
  {
    id: 'cs-210',
    code: 'CS-210',
    name: 'الذكاء الاصطناعي',
    majorId: 'cs',
    description: 'خوارزميات البحث، التعلم الآلي والشبكات العصبية المبدئية',
    totalSlides: 40,
    filesCount: 3,
  },
  {
    id: 'stat-101',
    code: 'STAT-101',
    name: 'الإحصاء',
    majorId: 'gen',
    description: 'الإحصاء الوصفي والاحتمالات وتوزيعات المعاينة وتحليل البيانات',
    totalSlides: 30,
    filesCount: 2,
  },
];
