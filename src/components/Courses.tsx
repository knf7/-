import React from 'react';
import { Course, Concept } from '../types';
import { COURSES } from '../data/courses';
import { Plus, ArrowLeft } from 'lucide-react';

interface CoursesProps {
  selectedCourseIds: string[];
  seenConceptIds: string[];
  allConcepts: Concept[];
  isDayMode?: boolean;
  onOpenFeedForCourse: (courseId: string) => void;
  onOpenAddFiles: (courseId: string) => void;
}

export const Courses: React.FC<CoursesProps> = ({
  selectedCourseIds,
  seenConceptIds,
  allConcepts,
  isDayMode = false,
  onOpenFeedForCourse,
  onOpenAddFiles,
}) => {
  const activeCourses = COURSES.filter((c) => selectedCourseIds.includes(c.id));
  const primaryCourse = activeCourses[0] || COURSES[0];
  const otherCourses = activeCourses.slice(1);

  // Calculate dynamic metadata for primary course
  const primaryCourseConcepts = allConcepts.filter((c) => c.courseId === primaryCourse.id);
  const seenInPrimary = primaryCourseConcepts.filter((c) => seenConceptIds.includes(c.id)).length;
  const readyForReview = seenInPrimary; // seen concepts are review-ready

  return (
    <div className={`min-h-[100dvh] pt-12 pb-28 px-5 max-w-[420px] mx-auto select-none transition-colors duration-500 ${
      isDayMode ? 'bg-[#F2F6F3] text-[#102318]' : 'bg-[#0E100F] text-[#F1EDE5]'
    }`}>
      {/* Title */}
      <h1 className={`text-2xl sm:text-3xl font-bold tracking-tight mb-2 leading-snug ${
        isDayMode ? 'text-[#0E2116]' : 'text-[#F1EDE5]'
      }`}>
        موادي
      </h1>
      <p className={`text-sm leading-relaxed mb-8 ${
        isDayMode ? 'text-[#486353]' : 'text-[#8C928E]'
      }`}>
        محتوى المحاضرات والسلايدات محول إلى وحدات سريعة.
      </p>

      {/* Primary Course Section */}
      <div className={`pb-8 border-b ${isDayMode ? 'border-[#D4E0D8]' : 'border-[#262D29]'}`}>
        <div className="flex items-center gap-2 mb-2">
          <span className={`w-2 h-2 rounded-full ${isDayMode ? 'bg-[#29543C]' : 'bg-[#58675F]'}`} />
          <span className={`text-xs font-mono ${isDayMode ? 'text-[#1E452E]' : 'text-[#A9B9AF]'}`} dir="ltr">
            {primaryCourse.code}
          </span>
        </div>

        <h2 className={`text-xl font-bold mb-2 ${isDayMode ? 'text-[#0E2116]' : 'text-[#F1EDE5]'}`}>
          {primaryCourse.name}
        </h2>

        {primaryCourse.description && (
          <p className={`text-xs leading-relaxed mb-5 ${isDayMode ? 'text-[#486353]' : 'text-[#8C928E]'}`}>
            {primaryCourse.description}
          </p>
        )}

        {/* Dynamic metadata */}
        <div className={`flex items-center gap-4 py-3 px-4 rounded-xl border mb-5 text-xs ${
          isDayMode 
            ? 'bg-white border-[#D4E0D8] text-[#334E3E] shadow-xs' 
            : 'bg-[#151917] border-[#262D29] text-[#B6BBB7]'
        }`}>
          <div className="flex items-center gap-1.5">
            <span className={`font-mono font-semibold ${isDayMode ? 'text-[#102418]' : 'text-[#F1EDE5]'}`}>
              {seenInPrimary}
            </span>
            <span>مفاهيم شفتها</span>
          </div>
          <span className={isDayMode ? 'text-[#B2C5B9]' : 'text-[#39423D]'}>•</span>
          <div className="flex items-center gap-1.5">
            <span className={`font-mono font-semibold ${isDayMode ? 'text-[#102418]' : 'text-[#F1EDE5]'}`}>
              {readyForReview}
            </span>
            <span>جاهزة للمراجعة</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={() => onOpenFeedForCourse(primaryCourse.id)}
            className={`py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all cursor-pointer ${
              isDayMode 
                ? 'bg-[#183626] text-white shadow-xs hover:bg-[#122A1E]' 
                : 'bg-[#F1EDE5] text-[#0E100F]'
            }`}
          >
            <span>افتح Feed المادة</span>
          </button>

          <button
            onClick={() => onOpenAddFiles(primaryCourse.id)}
            className={`py-3 px-4 rounded-xl border font-semibold text-xs flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all cursor-pointer ${
              isDayMode 
                ? 'bg-white border-[#D4E0D8] text-[#14281E] hover:bg-[#EBF2EC]' 
                : 'bg-[#151917] border-[#39423D] text-[#F1EDE5] hover:bg-[#1B201D]'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>أضف ملفات</span>
          </button>
        </div>
      </div>

      {/* Other Selected Courses Quietly Below */}
      {otherCourses.length > 0 && (
        <div className="pt-6">
          <h3 className={`text-xs font-mono uppercase tracking-wider mb-4 ${
            isDayMode ? 'text-[#486353]' : 'text-[#8C928E]'
          }`}>
            بقية المواد المسجلة
          </h3>
          <div className="space-y-3">
            {otherCourses.map((c) => (
              <div
                key={c.id}
                onClick={() => onOpenFeedForCourse(c.id)}
                className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                  isDayMode 
                    ? 'bg-white border-[#D4E0D8] hover:border-[#28543A] text-[#102418] shadow-xs' 
                    : 'bg-[#151917] border-[#262D29] hover:border-[#39423D] text-[#F1EDE5]'
                }`}
              >
                <div>
                  <div className={`text-xs font-mono mb-0.5 ${isDayMode ? 'text-[#3E674F]' : 'text-[#58675F]'}`} dir="ltr">
                    {c.code}
                  </div>
                  <div className="text-sm font-semibold">
                    {c.name}
                  </div>
                </div>
                <ArrowLeft className={`w-4 h-4 ${isDayMode ? 'text-[#3E674F]' : 'text-[#58675F]'}`} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
