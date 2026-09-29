import { Concept, QuizQuestion, Flashcard } from '../types';

export const INITIAL_CONCEPTS: Concept[] = [
  {
    id: 'composite-key',
    courseId: 'is-321',
    title: 'وش يعني Composite Key؟',
    shortExplanation: 'المفتاح الأساسي ممكن يتكوّن من أكثر من عمود مع بعض.',
    example: 'Project_ID + Employee_ID',
    sourceLabel: 'IS-321 · Slide 18',
    sourceSlide: 'Slide 18',
    sourceFile: 'Normalization.pdf',
    mediaFile: '/media/reel-composite-key.mp4',
    contentType: 'concept',
    seen: false,
    saved: false,
    reviewEligible: false,
    reviewed: false,
    needsReinforcement: false,
    mastered: false,
    qaList: [
      {
        question: 'ليش نحتاج مفتاح مركب بدل عمود واحد؟',
        answer: 'في جداول الربط (M:N) مثل علاقة الموظفين بالمشاريع، الموظف الواحد يشارك بكذا مشروع، والمشروع فيه عدة موظفين. ما نقدر نعتمد على عمود واحد لتمييز الصف بدقة بدون تكرار.'
      },
      {
        question: 'عطني مثال ثاني سريع',
        answer: 'جدول تسجيل المقررات: Student_ID + Course_Code كلاهما معاً يمثلان المفتاح المركّب للترم.'
      },
      {
        question: 'هل يمكن للمفتاح المركب يحتوي على 3 أعمدة؟',
        answer: 'نعم، ما فيه حد محدد، لكن تصميمياً يفضل أقل عدد ممكن من الأعمدة لتحقيق التفرّد.'
      }
    ]
  },
  {
    id: 'partial-dependency',
    courseId: 'is-321',
    title: 'وش يعني Partial Dependency؟',
    shortExplanation: 'إذا معلومة تعتمد على جزء فقط من المفتاح المركّب، عندنا اعتماد جزئي.',
    example: 'Project_ID → Project_Name (بينما المفتاح الكامل: Project_ID + Employee_ID)',
    sourceLabel: 'IS-321 · Slide 23',
    sourceSlide: 'Slide 23',
    sourceFile: 'Normalization.pdf',
    mediaFile: '/media/reel-partial-dependency.mp4',
    contentType: 'concept',
    seen: false,
    saved: false,
    reviewEligible: false,
    reviewed: false,
    needsReinforcement: false,
    mastered: false,
    qaList: [
      {
        question: 'ليش الاعتماد الجزئي يسبب مشكلة؟',
        answer: 'لأنه يسبب تكرار بيانات غير مبرر (Redundancy)، ومشاكل عند التعديل (Update Anomaly) والحذف (Delete Anomaly).'
      },
      {
        question: 'كيف نلغي الاعتماد الجزئي؟',
        answer: 'نفصل العمود الذي يعتمد على جزء من المفتاح في جدول مستقل مع المفتاح الجزئي اللي يعتمد عليه.'
      },
      {
        question: 'عطني مثال من الحياة العملية',
        answer: 'اسم المشروع Project_Name ما يحتاج الموظف عشان نعرفه، يحتاج فقط رقم المشروع Project_ID.'
      }
    ]
  },
  {
    id: '2nf',
    courseId: 'is-321',
    title: 'ليش 2NF موجودة أصلًا؟',
    shortExplanation: '2NF تمنع الاعتماد الجزئي وتقلل تكرار البيانات.',
    sourceLabel: 'IS-321 · Slide 22',
    sourceSlide: 'Slide 22',
    sourceFile: 'Normalization.pdf',
    mediaFile: '/media/reel-2nf.mp4',
    contentType: 'concept',
    seen: false,
    saved: false,
    reviewEligible: false,
    reviewed: false,
    needsReinforcement: false,
    mastered: false,
    reinforcementConceptId: '2nf-simple',
    qaList: [
      {
        question: 'وش شرط الوصول إلى 2NF؟',
        answer: '1. أن يكون الجدول في 1NF (كل القيم ذرية).\n2. عدم وجود أي Partial Dependency لأي عمود غير مفتاحي على جزء من المفتاح الأساسي.'
      },
      {
        question: 'وش الفرق بينها وبين 3NF؟',
        answer: '2NF تحل مشكلة الاعتماد الجزئي (Partial Dependency)، بينما 3NF تحل مشكلة الاعتماد الانتقالي (Transitive Dependency).'
      },
      {
        question: 'لو كان المفتاح عمود واحد فقط، هل الجدول تلقائياً في 2NF؟',
        answer: 'نعم! إذا كان المفتاح الأساسي بسيطاً (Simple Key وليس Composite)، وبحالة 1NF، فهو حتماً يحقق 2NF لعدم وجود أجزاء للمفتاح أصلاً.'
      }
    ]
  },
  {
    id: '2nf-example',
    courseId: 'is-321',
    title: 'مثال سريع على 2NF',
    shortExplanation: 'إذا Project_Name يعتمد على Project_ID فقط، نفصل بيانات المشروع عن جدول الربط.',
    sourceLabel: 'IS-321 · Slide 24',
    sourceSlide: 'Slide 24',
    sourceFile: 'Normalization.pdf',
    mediaFile: '/media/reel-2nf-example.mp4',
    contentType: 'example',
    seen: false,
    saved: false,
    reviewEligible: false,
    reviewed: false,
    needsReinforcement: false,
    mastered: false,
    qaList: [
      {
        question: 'كيف يصير شكل الجداول بعد الفصل؟',
        answer: 'جدول Projects: (Project_ID, Project_Name)\nجدول Project_Assignments: (Project_ID, Employee_ID, Hours_Worked)'
      },
      {
        question: 'وين راح عمود الساعات Hours؟',
        answer: 'يبقى في جدول الربط لأنه يعتمد على الاثنين معاً: كم ساعة اشتغل هالموظف في هالمشروع بالتحديد.'
      }
    ]
  }
];

export const REINFORCEMENT_CONCEPTS: Record<string, Concept> = {
  '2nf-simple': {
    id: '2nf-simple',
    courseId: 'is-321',
    title: '2NF بطريقة أبسط',
    shortExplanation: 'إذا المعلومة تعتمد على جزء من المفتاح المركّب، لسه ما وصلنا 2NF.',
    sourceLabel: 'IS-321 · Slide 22',
    sourceSlide: 'Slide 22',
    sourceFile: 'Normalization.pdf',
    mediaFile: '/media/reel-2nf-simple.mp4',
    contentType: 'reinforcement',
    seen: false,
    saved: false,
    reviewEligible: false,
    reviewed: false,
    needsReinforcement: false,
    mastered: false,
    isReinforcementOf: '2nf',
    qaList: [
      {
        question: 'وضح لي إياها بجملة واحدة',
        answer: 'كل عمود بالجدول لازم يعتمد على المفتاح كاملاً، وليس على نصف المفتاح!'
      },
      {
        question: 'لو عندي حقل يعتمد على جزء، وش أسوي فيه فوراً؟',
        answer: 'اسحبه وانقله لجدول خاص فيه.'
      }
    ]
  }
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'quiz-2nf',
    conceptId: '2nf',
    context: 'في جدول مفتاحه: (Project_ID, Employee_ID)',
    question: 'وكان Project_Name يعتمد فقط على Project_ID… هل الجدول يحقق 2NF؟',
    options: [
      {
        id: 1,
        text: 'إيه، لأنه يمتلك مفتاح أساسي',
      },
      {
        id: 2,
        text: 'لا، عندنا Partial Dependency',
      },
      {
        id: 3,
        text: 'مو متأكد',
      },
    ],
    correctAnswerId: 2,
    correctExplanation: 'صح — الفكرة ثبتت.',
    wrongExplanation: 'قريب — خلنا نثبتها. فيه معلومة تعتمد على جزء فقط من المفتاح.',
  },
  {
    id: 'quiz-composite-key',
    conceptId: 'composite-key',
    context: 'في جدول تسجيل الطلاب بالمقررات Student_Course',
    question: 'إذا كان التمييز يحتاج رقم الطالب وكود المادة معاً، وش نسمي هذا المفتاح؟',
    options: [
      {
        id: 1,
        text: 'Composite Key (مفتاح مركب)',
      },
      {
        id: 2,
        text: 'Foreign Key (مفتاح أجنبي)',
      },
      {
        id: 3,
        text: 'مو متأكد',
      },
    ],
    correctAnswerId: 1,
    correctExplanation: 'صح — المفتاح المركب يتكون من عمودين أو أكثر مجتمعين.',
    wrongExplanation: 'المفتاح الذي يتركب من عدة أعمدة معاً يسمى Composite Key.',
  },
  {
    id: 'quiz-partial-dep',
    conceptId: 'partial-dependency',
    context: 'المفتاح الكامل: (Course_ID, Professor_ID)',
    question: 'إذا كان Course_Name يعتمد على Course_ID فقط دون Professor_ID، وش نسمي هذي العلاقة؟',
    options: [
      {
        id: 1,
        text: 'اعتماد تام (Full Functional Dependency)',
      },
      {
        id: 2,
        text: 'اعتماد جزئي (Partial Dependency)',
      },
      {
        id: 3,
        text: 'مو متأكد',
      },
    ],
    correctAnswerId: 2,
    correctExplanation: 'صح — لأن المعلومة اعتمدت على جزء من المفتاح المركب فقط.',
    wrongExplanation: 'هذا اعتماد جزئي Partial Dependency لأن اسم المادة لا يحتاج رقم الأستاذ لتحديده.',
  },
];

export const FLASHCARDS: Flashcard[] = [
  {
    id: 'fc-composite-key',
    conceptId: 'composite-key',
    front: 'Composite Key',
    back: 'مفتاح أساسي يتكون من عمودين أو أكثر معاً لتمييز كل صف بشكل فريد.',
    sourceSlide: 'Slide 18',
  },
  {
    id: 'fc-partial-dep',
    conceptId: 'partial-dependency',
    front: 'Partial Dependency',
    back: 'لما حقل غير مفتاح يعتمد على جزء فقط من Composite Key.',
    sourceSlide: 'Slide 23',
  },
  {
    id: 'fc-2nf',
    conceptId: '2nf',
    front: 'Second Normal Form (2NF)',
    back: 'أن يكون الجدول في 1NF ويخلو تماماً من أي Partial Dependency.',
    sourceSlide: 'Slide 22',
  },
  {
    id: 'fc-2nf-example',
    conceptId: '2nf-example',
    front: 'كيف تعالج الاعتماد الجزئي عملياً؟',
    back: 'نفصل الأعمدة ذات الاعتماد الجزئي إلى جدول خاص، ونبقي في الجدول الأساسي الحقول المعتمدة على كامل المفتاح.',
    sourceSlide: 'Slide 24',
  },
];
