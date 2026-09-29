import React, { useState } from 'react';
import { Concept, UserProfile } from '../types';
import { COURSES } from '../data/courses';
import { Bookmark, FileText, Settings, Sliders, RefreshCw, BookOpen, Sun, Moon, LogIn, LogOut, CheckCircle } from 'lucide-react';

interface ProfileProps {
  savedConcepts: Concept[];
  selectedCourseIds: string[];
  uploadedFiles: { name: string; courseCode: string; date: string }[];
  currentUser?: UserProfile | null;
  isDayMode?: boolean;
  onToggleDayMode?: () => void;
  onResetDemo: () => void;
  onSelectSavedConcept?: (conceptId: string) => void;
  onOpenOnboarding?: () => void;
  onOpenLogin?: () => void;
  onLogout?: () => void;
  onOpenCustomizeInterests?: () => void;
}

export const Profile: React.FC<ProfileProps> = ({
  savedConcepts,
  selectedCourseIds,
  uploadedFiles,
  currentUser,
  isDayMode = false,
  onToggleDayMode,
  onResetDemo,
  onSelectSavedConcept,
  onOpenOnboarding,
  onOpenLogin,
  onLogout,
  onOpenCustomizeInterests,
}) => {
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const courses = COURSES.filter((c) => selectedCourseIds.includes(c.id));

  return (
    <div className={`min-h-[100dvh] pt-12 pb-28 px-5 max-w-[420px] mx-auto select-none transition-colors duration-500 ${
      isDayMode ? 'bg-[#F2F6F3] text-[#102318]' : 'bg-[#0E100F] text-[#F1EDE5]'
    }`}>
      {/* Title */}
      <h1 className={`text-2xl sm:text-3xl font-bold tracking-tight mb-2 leading-snug ${
        isDayMode ? 'text-[#0E2116]' : 'text-[#F1EDE5]'
      }`}>
        أنا
      </h1>
      <p className={`text-sm leading-relaxed mb-6 ${
        isDayMode ? 'text-[#486353]' : 'text-[#8C928E]'
      }`}>
        تخصيص الخلاصة وموادك الجامعية.
      </p>

      {/* User Quick Info Card */}
      <div className={`p-4 rounded-2xl border flex items-center justify-between gap-3.5 mb-6 shadow-xs ${
        isDayMode 
          ? 'bg-white border-[#D4E0D8]' 
          : 'bg-[#151917] border-[#262D29]'
      }`}>
        <div className="flex items-center gap-3.5">
          <div className={`w-12 h-12 rounded-full border flex items-center justify-center font-bold text-base ${
            isDayMode 
              ? 'bg-[#1D4A33] border-[#2A6546] text-white' 
              : 'bg-[#203029] border-[#58675F] text-[#F1EDE5]'
          }`}>
            {currentUser?.avatarLetter || 'ط'}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className={`text-sm font-bold ${isDayMode ? 'text-[#0E2116]' : 'text-[#F1EDE5]'}`}>
                {currentUser?.name || 'طالب جامعي'}
              </span>
              {currentUser?.isLoggedIn && (
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500 inline" />
              )}
            </div>
            <div className={`text-xs font-mono ${isDayMode ? 'text-[#4A6E58]' : 'text-[#8C928E]'}`}>
              {currentUser?.university || 'جامعة الملك سعود'} · {currentUser?.collegeOrMajor || 'علوم الحاسب'}
            </div>
            {currentUser?.emailOrPhone && (
              <div className={`text-[11px] font-mono mt-0.5 truncate max-w-[200px] ${isDayMode ? 'text-[#628470]' : 'text-[#727975]'}`} dir="ltr">
                {currentUser.emailOrPhone}
              </div>
            )}
          </div>
        </div>

        {/* Login / Switch Account Action Button */}
        {onOpenLogin && (
          <button
            onClick={onOpenLogin}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 border transition-all cursor-pointer ${
              isDayMode
                ? 'bg-[#EBF2EC] text-[#183626] border-[#CCDCD1] hover:bg-[#DFECE3]'
                : 'bg-[#1E2522] text-[#E0E6E2] border-[#39423D] hover:bg-[#28322D]'
            }`}
          >
            <LogIn className="w-3 h-3" />
            <span>{currentUser?.isLoggedIn ? 'تبديل' : 'دخول'}</span>
          </button>
        )}
      </div>

      {/* Personal Sections List */}
      <div className="space-y-3 mb-8">
        {/* موادي */}
        <div className={`p-4 rounded-xl border shadow-xs ${
          isDayMode ? 'bg-white border-[#D4E0D8]' : 'bg-[#151917] border-[#262D29]'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2.5">
              <BookOpen className={`w-4 h-4 ${isDayMode ? 'text-[#29543C]' : 'text-[#58675F]'}`} />
              <span className={`text-sm font-semibold ${isDayMode ? 'text-[#0E2116]' : 'text-[#F1EDE5]'}`}>موادي</span>
            </div>
            <span className={`text-xs font-mono ${isDayMode ? 'text-[#4A6E58]' : 'text-[#8C928E]'}`}>{courses.length} مسجلة</span>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {courses.map((c) => (
              <span key={c.id} className={`text-xs font-mono px-2.5 py-1 rounded border ${
                isDayMode 
                  ? 'bg-[#EBF2EC] text-[#1A422D] border-[#CCDCD1]' 
                  : 'bg-[#1B201D] text-[#B6BBB7] border-[#262D29]'
              }`}>
                {c.code} · {c.name}
              </span>
            ))}
          </div>
        </div>

        {/* المحفوظات */}
        <div className={`p-4 rounded-xl border shadow-xs ${
          isDayMode ? 'bg-white border-[#D4E0D8]' : 'bg-[#151917] border-[#262D29]'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2.5">
              <Bookmark className={`w-4 h-4 ${isDayMode ? 'text-[#29543C]' : 'text-[#58675F]'}`} />
              <span className={`text-sm font-semibold ${isDayMode ? 'text-[#0E2116]' : 'text-[#F1EDE5]'}`}>المحفوظات</span>
            </div>
            <span className={`text-xs font-mono ${isDayMode ? 'text-[#4A6E58]' : 'text-[#8C928E]'}`}>{savedConcepts.length} مفاهيم</span>
          </div>
          {savedConcepts.length === 0 ? (
            <div className={`text-xs mt-2 ${isDayMode ? 'text-[#648070]' : 'text-[#8C928E]'}`}>
              اضغط زر حفظ في أي سكرول لتثبيته هنا
            </div>
          ) : (
            <div className="space-y-2 mt-3">
              {savedConcepts.map((sc) => (
                <div
                  key={sc.id}
                  onClick={() => onSelectSavedConcept?.(sc.id)}
                  className={`p-2.5 rounded-lg border flex items-center justify-between cursor-pointer transition-colors ${
                    isDayMode 
                      ? 'bg-[#F4F8F5] border-[#D4E0D8] hover:border-[#28543A] text-[#102418]' 
                      : 'bg-[#1B201D] border-[#262D29] hover:border-[#39423D] text-[#F1EDE5]'
                  }`}
                >
                  <span className="text-xs font-medium truncate max-w-[240px]">
                    {sc.title}
                  </span>
                  <span className={`text-[10px] font-mono ${isDayMode ? 'text-[#3E674F]' : 'text-[#58675F]'}`} dir="ltr">
                    {sc.sourceSlide}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* الملفات المرفوعة */}
        <div className={`p-4 rounded-xl border shadow-xs ${
          isDayMode ? 'bg-white border-[#D4E0D8]' : 'bg-[#151917] border-[#262D29]'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2.5">
              <FileText className={`w-4 h-4 ${isDayMode ? 'text-[#29543C]' : 'text-[#58675F]'}`} />
              <span className={`text-sm font-semibold ${isDayMode ? 'text-[#0E2116]' : 'text-[#F1EDE5]'}`}>الملفات المرفوعة</span>
            </div>
            <span className={`text-xs font-mono ${isDayMode ? 'text-[#4A6E58]' : 'text-[#8C928E]'}`}>{uploadedFiles.length} ملفات</span>
          </div>
          <div className="space-y-2 mt-2">
            {uploadedFiles.map((file, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs py-1">
                <span className={`font-mono ${isDayMode ? 'text-[#163825]' : 'text-[#B6BBB7]'}`} dir="ltr">{file.name}</span>
                <span className={`text-[11px] font-mono ${isDayMode ? 'text-[#4A6E58]' : 'text-[#8C928E]'}`}>{file.courseCode}</span>
              </div>
            ))}
          </div>
        </div>

        {/* مظهر التطبيق (نهاري / ليلي) */}
        {onToggleDayMode && (
          <div className={`p-4 rounded-xl border flex items-center justify-between shadow-xs ${
            isDayMode ? 'bg-white border-[#D4E0D8]' : 'bg-[#151917] border-[#262D29]'
          }`}>
            <div className="flex items-center gap-2.5">
              {isDayMode ? (
                <Sun className="w-4 h-4 text-[#29543C]" />
              ) : (
                <Moon className="w-4 h-4 text-[#F1EDE5]" />
              )}
              <span className={`text-sm font-semibold ${isDayMode ? 'text-[#0E2116]' : 'text-[#F1EDE5]'}`}>
                مظهر التطبيق
              </span>
            </div>

            <button
              onClick={onToggleDayMode}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer border ${
                isDayMode
                  ? 'bg-[#EBF2EC] text-[#183626] border-[#CCDCD1] hover:bg-[#DFECE3]'
                  : 'bg-[#1B201D] text-[#F1EDE5] border-[#39423D] hover:bg-[#252B27]'
              }`}
            >
              {isDayMode ? (
                <>
                  <span>☀️ وضع نهاري</span>
                </>
              ) : (
                <>
                  <span>🌙 وضع ليلي</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* تفضيلات التعلم */}
        <div
          onClick={onOpenCustomizeInterests}
          className={`p-4 rounded-xl border flex items-center justify-between shadow-xs transition-colors ${
            onOpenCustomizeInterests ? 'cursor-pointer hover:border-[#29543C]' : ''
          } ${
            isDayMode ? 'bg-white border-[#D4E0D8]' : 'bg-[#151917] border-[#262D29]'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <Sliders className={`w-4 h-4 ${isDayMode ? 'text-[#29543C]' : 'text-[#58675F]'}`} />
            <span className={`text-sm font-semibold ${isDayMode ? 'text-[#0E2116]' : 'text-[#F1EDE5]'}`}>تفضيلات التعلم والمواد</span>
          </div>
          <span className={`text-xs ${isDayMode ? 'text-[#4A6E58]' : 'text-[#8C928E]'}`}>
            {onOpenCustomizeInterests ? 'تخصيص ←' : 'سريع ومختصر'}
          </span>
        </div>

        {/* الإعدادات */}
        <div className={`p-4 rounded-xl border flex items-center justify-between shadow-xs ${
          isDayMode ? 'bg-white border-[#D4E0D8]' : 'bg-[#151917] border-[#262D29]'
        }`}>
          <div className="flex items-center gap-2.5">
            <Settings className={`w-4 h-4 ${isDayMode ? 'text-[#29543C]' : 'text-[#58675F]'}`} />
            <span className={`text-sm font-semibold ${isDayMode ? 'text-[#0E2116]' : 'text-[#F1EDE5]'}`}>الإعدادات</span>
          </div>
          <span className={`text-xs ${isDayMode ? 'text-[#4A6E58]' : 'text-[#8C928E]'}`}>العربية (RTL)</span>
        </div>

        {/* رحلة تسجيل الدخول (Login Journey) */}
        {onOpenLogin && (
          <button
            onClick={onOpenLogin}
            className={`w-full p-4 rounded-xl border flex items-center justify-between transition-colors text-right cursor-pointer shadow-xs ${
              isDayMode 
                ? 'bg-white border-[#D4E0D8] hover:border-[#28543A]' 
                : 'bg-[#151917] border-[#262D29] hover:border-[#39423D]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <LogIn className={`w-4 h-4 ${isDayMode ? 'text-[#29543C]' : 'text-[#58675F]'}`} />
              <span className={`text-sm font-semibold ${isDayMode ? 'text-[#0E2116]' : 'text-[#F1EDE5]'}`}>رحلة تسجيل الدخول والحساب (Login Journey)</span>
            </div>
            <span className={`text-xs font-semibold ${isDayMode ? 'text-[#26533A]' : 'text-[#A0A7A2]'}`}>دخول &gt;</span>
          </button>
        )}

        {/* عرض شاشات التسجيل (Onboarding) */}
        {onOpenOnboarding && (
          <button
            onClick={onOpenOnboarding}
            className={`w-full p-4 rounded-xl border flex items-center justify-between transition-colors text-right cursor-pointer shadow-xs ${
              isDayMode 
                ? 'bg-white border-[#D4E0D8] hover:border-[#28543A]' 
                : 'bg-[#151917] border-[#262D29] hover:border-[#39423D]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <BookOpen className={`w-4 h-4 ${isDayMode ? 'text-[#29543C]' : 'text-[#58675F]'}`} />
              <span className={`text-sm font-semibold ${isDayMode ? 'text-[#0E2116]' : 'text-[#F1EDE5]'}`}>صفحات التسجيل والترحيب (Onboarding)</span>
            </div>
            <span className={`text-xs ${isDayMode ? 'text-[#4A6E58]' : 'text-[#8C928E]'}`}>فتح &gt;</span>
          </button>
        )}
      </div>

      {/* Reset Demo Section */}
      <div className="pt-2">
        {!showResetConfirm ? (
          <button
            onClick={() => setShowResetConfirm(true)}
            className={`w-full py-3.5 px-4 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer ${
              isDayMode 
                ? 'bg-white border-[#D4E0D8] text-[#557564] hover:text-[#122A1C] hover:bg-[#EBF2EC]' 
                : 'bg-[#1B201D] border-[#39423D] text-[#8C928E] hover:text-[#F1EDE5]'
            }`}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>إعادة ضبط العرض التجريبي</span>
          </button>
        ) : (
          <div className={`p-4 rounded-xl border space-y-3 animate-in fade-in ${
            isDayMode 
              ? 'border-[#E5BEB9] bg-[#FFF8F7]' 
              : 'border-[#B88E88]/40 bg-[#201817]'
          }`}>
            <div className={`text-xs text-center ${isDayMode ? 'text-[#61241F]' : 'text-[#F1EDE5]'}`}>
              هل أنت متأكد من إعادة ضبط البيانات وبدء السيناريو من البداية؟
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  onResetDemo();
                  setShowResetConfirm(false);
                }}
                className={`py-2.5 px-3 rounded-lg font-bold text-xs cursor-pointer ${
                  isDayMode ? 'bg-[#9E3F37] text-white' : 'bg-[#B88E88] text-[#0E100F]'
                }`}
              >
                نعم، أعد الضبط
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className={`py-2.5 px-3 rounded-lg border text-xs cursor-pointer ${
                  isDayMode ? 'bg-white border-[#D4E0D8] text-[#3E5C4B]' : 'bg-[#151917] border-[#262D29] text-[#B6BBB7]'
                }`}
              >
                إلغاء
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
