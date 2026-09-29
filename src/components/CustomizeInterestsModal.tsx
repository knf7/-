import React, { useState } from 'react';
import { MAJORS, COURSES } from '../data/courses';
import {
  X,
  Sparkles,
  Check,
  Search,
  BookOpen,
  Laptop,
  BarChart2,
  Briefcase,
  Stethoscope,
  Settings,
  Filter,
  Layers,
  Flame,
  Lightbulb,
  CheckCircle2,
} from 'lucide-react';

interface CustomizeInterestsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedMajor: string;
  selectedCourses: string[];
  onSave: (major: string, courses: string[]) => void;
  isDayMode?: boolean;
}

export const CustomizeInterestsModal: React.FC<CustomizeInterestsModalProps> = ({
  isOpen,
  onClose,
  selectedMajor: initialMajor,
  selectedCourses: initialCourses,
  onSave,
  isDayMode = false,
}) => {
  const [activeTab, setActiveTab] = useState<'courses' | 'majors' | 'topics'>('courses');
  const [currentMajor, setCurrentMajor] = useState<string>(initialMajor || 'cs');
  const [currentCourses, setCurrentCourses] = useState<string[]>(initialCourses || ['is-321']);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([
    'قواعد البيانات العلائقية',
    'الذكاء الاصطناعي والشبكات',
    'أمن وتشفير المعلومات',
  ]);

  // Predefined trending study topics
  const POPULAR_TOPICS = [
    { id: 't1', name: 'قواعد البيانات العلائقية', count: '48 مفهوم' },
    { id: 't2', name: 'الذكاء الاصطناعي والشبكات', count: '40 مفهوم' },
    { id: 't3', name: 'أمن وتشفير المعلومات', count: '52 مفهوم' },
    { id: 't4', name: 'إدارة مشاريع أجايل (Scrum)', count: '36 مفهوم' },
    { id: 't5', name: 'التجارة الإلكترونية وبوابات الدفع', count: '28 مفهوم' },
    { id: 't6', name: 'الاحتمالات والإحصاء الوصفي', count: '30 مفهوم' },
    { id: 't7', name: 'تراكيب البيانات والخوارزميات', count: '64 مفهوم' },
    { id: 't8', name: 'شبكات الحاسب والبروتوكولات', count: '35 مفهوم' },
  ];

  if (!isOpen) return null;

  const toggleCourse = (courseId: string) => {
    if (currentCourses.includes(courseId)) {
      if (currentCourses.length > 1) {
        setCurrentCourses(currentCourses.filter((id) => id !== courseId));
      }
    } else {
      setCurrentCourses([...currentCourses, courseId]);
    }
  };

  const toggleTopic = (topicName: string) => {
    if (selectedTopics.includes(topicName)) {
      if (selectedTopics.length > 1) {
        setSelectedTopics(selectedTopics.filter((t) => t !== topicName));
      }
    } else {
      setSelectedTopics([...selectedTopics, topicName]);
    }
  };

  const handleApply = () => {
    onSave(currentMajor, currentCourses);
    onClose();
  };

  const getMajorIcon = (id: string) => {
    const iconColor = isDayMode ? 'text-[#29543C]' : 'text-[#A9B9AF]';
    switch (id) {
      case 'cs':
        return <Laptop className={`w-4 h-4 ${iconColor}`} />;
      case 'is':
        return <BarChart2 className={`w-4 h-4 ${iconColor}`} />;
      case 'ba':
        return <Briefcase className={`w-4 h-4 ${iconColor}`} />;
      case 'med':
        return <Stethoscope className={`w-4 h-4 ${iconColor}`} />;
      case 'eng':
        return <Settings className={`w-4 h-4 ${iconColor}`} />;
      default:
        return <BookOpen className={`w-4 h-4 ${iconColor}`} />;
    }
  };

  const filteredCourses = COURSES.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      c.code.toLowerCase().includes(searchQuery.toLowerCase().trim());
    return matchesSearch;
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 backdrop-blur-md bg-black/60 animate-in fade-in duration-200"
      dir="rtl"
    >
      {/* Modal / Bottom Sheet Box */}
      <div
        className={`w-full max-w-[420px] max-h-[90dvh] rounded-t-[32px] sm:rounded-[32px] flex flex-col shadow-2xl border transition-colors overflow-hidden ${
          isDayMode
            ? 'bg-[#F2F6F3] text-[#112318] border-[#CFDCD4]'
            : 'bg-[#121614] text-[#F1EDE5] border-[#262D29]'
        }`}
      >
        {/* Top Handle on Mobile */}
        <div className="w-full flex justify-center pt-2.5 pb-1 sm:hidden">
          <div className={`w-10 h-1 rounded-full ${isDayMode ? 'bg-[#C2D4C8]' : 'bg-[#323B36]'}`} />
        </div>

        {/* Modal Header */}
        <div className={`p-4 pb-3 border-b flex items-center justify-between shrink-0 ${
          isDayMode ? 'border-[#D8E4DC]' : 'border-[#222825]'
        }`}>
          <div className="flex items-center gap-2.5">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center border shadow-xs ${
              isDayMode ? 'bg-white border-[#CFDCD4] text-[#1B3E2A]' : 'bg-[#18201C] border-[#2C3630] text-[#A6C4B2]'
            }`}>
              <Sparkles className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <h2 className={`text-[17px] font-bold leading-tight ${isDayMode ? 'text-[#0E2116]' : 'text-[#F1EDE5]'}`}>
                تخصيص اهتماماتك وموادك
              </h2>
              <p className={`text-[11px] ${isDayMode ? 'text-[#4A6755]' : 'text-[#8C928E]'}`}>
                اختر تخصصك والمقررات ليتم تغذية الـ Feed بمفاهيم تناسبك
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer border ${
              isDayMode 
                ? 'bg-white border-[#D2DED6] text-[#294B37] hover:bg-[#E8F0EA]' 
                : 'bg-[#1A211D] border-[#2B352F] text-[#B6BBB7] hover:text-white'
            }`}
            aria-label="إغلاق"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Switcher Tabs */}
        <div className="px-4 pt-3 shrink-0">
          <div className={`p-1 rounded-xl flex items-center border ${
            isDayMode ? 'bg-[#E3EBE5] border-[#CFDCD4]' : 'bg-[#161B18] border-[#252B27]'
          }`}>
            <button
              onClick={() => setActiveTab('courses')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'courses'
                  ? isDayMode
                    ? 'bg-white text-[#0E2116] shadow-xs'
                    : 'bg-[#222B26] text-[#F1EDE5] shadow-xs'
                  : isDayMode
                  ? 'text-[#486353] hover:text-[#0E2116]'
                  : 'text-[#848B86] hover:text-[#F1EDE5]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>المواد ({currentCourses.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('majors')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'majors'
                  ? isDayMode
                    ? 'bg-white text-[#0E2116] shadow-xs'
                    : 'bg-[#222B26] text-[#F1EDE5] shadow-xs'
                  : isDayMode
                  ? 'text-[#486353] hover:text-[#0E2116]'
                  : 'text-[#848B86] hover:text-[#F1EDE5]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>التخصص الحالي</span>
            </button>

            <button
              onClick={() => setActiveTab('topics')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'topics'
                  ? isDayMode
                    ? 'bg-white text-[#0E2116] shadow-xs'
                    : 'bg-[#222B26] text-[#F1EDE5] shadow-xs'
                  : isDayMode
                  ? 'text-[#486353] hover:text-[#0E2116]'
                  : 'text-[#848B86] hover:text-[#F1EDE5]'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              <span>المواضيع</span>
            </button>
          </div>
        </div>

        {/* Tab 1: COURSES SELECTION */}
        {activeTab === 'courses' && (
          <div className="flex-1 min-h-0 flex flex-col p-4 pt-3 overflow-hidden">
            {/* Search courses */}
            <div className={`relative mb-2.5 flex items-center rounded-xl border px-3 py-1.5 shrink-0 ${
              isDayMode ? 'bg-white border-[#CFDCD4]' : 'bg-[#151917] border-[#252B27]'
            }`}>
              <Search className={`w-3.5 h-3.5 shrink-0 ml-1.5 ${isDayMode ? 'text-[#567563]' : 'text-[#747B77]'}`} />
              <input
                type="text"
                placeholder="ابحث عن مادة أو رمزها (مثال: IS-321)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full bg-transparent text-xs placeholder-opacity-70 focus:outline-none text-right ${
                  isDayMode ? 'text-[#0E2116] placeholder-[#567563]' : 'text-[#F1EDE5] placeholder-[#747B77]'
                }`}
              />
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar space-y-2 pr-0.5 pb-1">
              {filteredCourses.map((c) => {
                const isSelected = currentCourses.includes(c.id);
                return (
                  <div
                    key={c.id}
                    onClick={() => toggleCourse(c.id)}
                    className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all active:scale-[0.99] ${
                      isSelected
                        ? isDayMode
                          ? 'bg-white border-[#183626] shadow-xs ring-1 ring-[#183626]'
                          : 'bg-[#1A2520] border-[#3E5548] text-white ring-1 ring-[#3E5548]'
                        : isDayMode
                        ? 'bg-white/80 border-[#D4E0D8] hover:bg-white'
                        : 'bg-[#141816] border-[#222724] hover:border-[#2C342F]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                        isSelected
                          ? isDayMode
                            ? 'bg-[#183626] border-[#183626] text-white'
                            : 'bg-[#FAF6EF] border-[#FAF6EF] text-[#0E100F]'
                          : isDayMode
                          ? 'border-[#B6C9BD] bg-[#F2F6F3]'
                          : 'border-[#36403A] bg-[#121614]'
                      }`}>
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>

                      <div className="text-right">
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[11px] font-mono font-bold px-1.5 py-0.5 rounded ${
                            isDayMode ? 'bg-[#E3EBE5] text-[#1E3E2B]' : 'bg-[#1F2722] text-[#A6C4B2]'
                          }`} dir="ltr">
                            {c.code}
                          </span>
                          <span className={`text-xs font-bold ${isDayMode ? 'text-[#0E2116]' : 'text-[#F1EDE5]'}`}>
                            {c.name}
                          </span>
                        </div>
                        {c.description && (
                          <p className={`text-[10px] mt-0.5 max-w-[250px] truncate ${
                            isDayMode ? 'text-[#486353]' : 'text-[#8C928E]'
                          }`}>
                            {c.description}
                          </p>
                        )}
                      </div>
                    </div>

                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                      isDayMode ? 'bg-[#E8F0EA] text-[#29543C]' : 'bg-[#1A231E] text-[#8C9C92]'
                    }`}>
                      {c.totalSlides || 30} سكرول
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: MAJOR SELECTION */}
        {activeTab === 'majors' && (
          <div className="flex-1 min-h-0 flex flex-col p-4 pt-3 overflow-hidden">
            <p className={`text-xs mb-3 ${isDayMode ? 'text-[#3E604F]' : 'text-[#9AA29D]'}`}>
              تحديد تخصصك الأكاديمي يعيد ترتيب المقترحات الذكية في خلاصتك اليومية:
            </p>

            <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar space-y-2 pr-0.5 pb-1">
              {MAJORS.map((m) => {
                const isSelected = currentMajor === m.id;
                return (
                  <div
                    key={m.id}
                    onClick={() => setCurrentMajor(m.id)}
                    className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all active:scale-[0.99] ${
                      isSelected
                        ? isDayMode
                          ? 'bg-white border-[#183626] shadow-xs ring-1 ring-[#183626]'
                          : 'bg-[#1A2520] border-[#3E5548] text-white ring-1 ring-[#3E5548]'
                        : isDayMode
                        ? 'bg-white/80 border-[#D4E0D8] hover:bg-white'
                        : 'bg-[#141816] border-[#222724] hover:border-[#2C342F]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${
                        isDayMode ? 'bg-[#F2F6F3] border-[#CFDCD4]' : 'bg-[#161B18] border-[#252B27]'
                      }`}>
                        {getMajorIcon(m.id)}
                      </div>
                      <span className={`text-xs font-bold ${isDayMode ? 'text-[#0E2116]' : 'text-[#F1EDE5]'}`}>
                        {m.name}
                      </span>
                    </div>

                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      isSelected
                        ? isDayMode
                          ? 'border-[#183626] bg-[#183626] text-white'
                          : 'border-[#FAF6EF] bg-[#FAF6EF] text-[#0E100F]'
                        : isDayMode
                        ? 'border-[#B6C9BD]'
                        : 'border-[#36403A]'
                    }`}>
                      {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-current" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 3: TOPICS OF INTEREST */}
        {activeTab === 'topics' && (
          <div className="flex-1 min-h-0 flex flex-col p-4 pt-3 overflow-hidden">
            <div className="flex items-center gap-1.5 mb-2.5">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <p className={`text-xs ${isDayMode ? 'text-[#3E604F]' : 'text-[#9AA29D]'}`}>
                اختر الموضوعات الفرعية التي تركز عليها للمراجعة والاختبارات:
              </p>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar space-y-2 pr-0.5 pb-1">
              {POPULAR_TOPICS.map((topic) => {
                const isSelected = selectedTopics.includes(topic.name);
                return (
                  <div
                    key={topic.id}
                    onClick={() => toggleTopic(topic.name)}
                    className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all active:scale-[0.99] ${
                      isSelected
                        ? isDayMode
                          ? 'bg-white border-[#183626] shadow-xs'
                          : 'bg-[#1A2520] border-[#3E5548] text-white'
                        : isDayMode
                        ? 'bg-white/80 border-[#D4E0D8] hover:bg-white'
                        : 'bg-[#141816] border-[#222724]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-4 h-4 rounded-md flex items-center justify-center border ${
                        isSelected
                          ? isDayMode
                            ? 'bg-[#183626] border-[#183626] text-white'
                            : 'bg-[#FAF6EF] border-[#FAF6EF] text-[#0E100F]'
                          : isDayMode
                          ? 'border-[#B6C9BD]'
                          : 'border-[#36403A]'
                      }`}>
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className={`text-xs font-semibold ${isDayMode ? 'text-[#0E2116]' : 'text-[#F1EDE5]'}`}>
                        {topic.name}
                      </span>
                    </div>

                    <span className={`text-[10px] font-mono ${isDayMode ? 'text-[#4A6755]' : 'text-[#8C928E]'}`}>
                      {topic.count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer with Apply button */}
        <div className={`p-4 border-t shrink-0 flex items-center gap-2.5 ${
          isDayMode ? 'border-[#D8E4DC] bg-white/70' : 'border-[#222825] bg-[#121614]'
        }`}>
          <button
            onClick={handleApply}
            className={`flex-1 h-11 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-transform active:scale-[0.98] cursor-pointer shadow-md ${
              isDayMode
                ? 'bg-[#183626] text-white hover:bg-[#122A1E]'
                : 'bg-[#FAF6EF] text-[#0E100F] hover:bg-white'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>حفظ وتحديث خلاصة الـ Feed</span>
          </button>

          <button
            onClick={onClose}
            className={`h-11 px-4 rounded-xl font-medium text-xs border transition-colors cursor-pointer ${
              isDayMode
                ? 'border-[#D4E0D8] text-[#3E604F] hover:bg-[#E8F0EA]'
                : 'border-[#2B352F] text-[#B6BBB7] hover:bg-[#1A211D]'
            }`}
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
};
