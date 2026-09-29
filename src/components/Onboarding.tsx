import React, { useState } from 'react';
import { Logo } from './Logo';
import { StatusBar } from './StatusBar';
import { MAJORS, COURSES } from '../data/courses';
import {
  Search,
  Check,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Laptop,
  BarChart2,
  Briefcase,
  Stethoscope,
  Settings,
  BookOpen,
  Sparkles,
} from 'lucide-react';

interface OnboardingProps {
  onComplete: (selectedMajor: string, selectedCourses: string[]) => void;
  isDayMode?: boolean;
  onOpenLogin?: () => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete, isDayMode = false, onOpenLogin }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedMajor, setSelectedMajor] = useState<string>('cs');
  const [majorSearch, setMajorSearch] = useState<string>('');
  const [courseSearch, setCourseSearch] = useState<string>('');
  const [selectedCourses, setSelectedCourses] = useState<string[]>(['is-321', 'is-324']);

  const filteredMajors = MAJORS.filter((m) =>
    m.name.toLowerCase().includes(majorSearch.toLowerCase().trim())
  );

  const filteredCourses = COURSES.filter(
    (c) =>
      c.name.toLowerCase().includes(courseSearch.toLowerCase().trim()) ||
      c.code.toLowerCase().includes(courseSearch.toLowerCase().trim())
  );

  const toggleCourse = (courseId: string) => {
    if (selectedCourses.includes(courseId)) {
      if (selectedCourses.length > 1) {
        setSelectedCourses(selectedCourses.filter((id) => id !== courseId));
      }
    } else {
      setSelectedCourses([...selectedCourses, courseId]);
    }
  };

  const getMajorIcon = (id: string) => {
    const iconColor = isDayMode ? 'text-[#3E604F]' : 'text-[#B6BBB7]';
    switch (id) {
      case 'cs':
        return <Laptop className={`w-5 h-5 ${iconColor}`} />;
      case 'is':
        return <BarChart2 className={`w-5 h-5 ${iconColor}`} />;
      case 'ba':
        return <Briefcase className={`w-5 h-5 ${iconColor}`} />;
      case 'med':
        return <Stethoscope className={`w-5 h-5 ${iconColor}`} />;
      case 'eng':
        return <Settings className={`w-5 h-5 ${iconColor}`} />;
      case 'gen':
      default:
        return <BookOpen className={`w-5 h-5 ${iconColor}`} />;
    }
  };

  // Quick skip handler directly to Feed with default selections
  const handleQuickSkip = () => {
    onComplete(selectedMajor, selectedCourses);
  };

  return (
    <div className={`relative w-full h-full flex flex-col justify-between overflow-hidden select-none transition-colors duration-500 ${
      isDayMode ? 'bg-[#F2F6F3] text-[#112318]' : 'bg-[#0E100F] text-[#F1EDE5]'
    }`}>
      {/* Top iOS Status Bar */}
      <StatusBar isDayMode={isDayMode} />

      {/* ========================================================================= */}
      {/* SCREEN 1: WELCOME SCREEN (Fully Responsive & Guaranteed Mobile-Visible CTA) */}
      {/* ========================================================================= */}
      {step === 1 && (
        <div className="relative flex-1 min-h-0 flex flex-col justify-between p-5 pb-6 z-10 animate-in fade-in duration-300 overflow-y-auto no-scrollbar">
          {/* Subtle Ambient Background */}
          <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
            <div 
              className={`absolute top-[4%] left-1/2 -translate-x-1/2 w-[320px] h-[320px] rounded-full blur-[80px] pointer-events-none ${
                isDayMode ? 'bg-[#5A876E]/20' : 'bg-[#203029]/45'
              }`}
            />
            
            <svg
              className="absolute inset-0 w-full h-full object-cover opacity-60"
              viewBox="0 0 393 852"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M -30 420 C 60 395 140 445 240 555 C 310 635 360 665 430 645 L 430 852 L -30 852 Z"
                fill={isDayMode ? '#DFEAE2' : '#17231E'}
                opacity={isDayMode ? '0.7' : '0.65'}
              />
              <path
                d="M -40 475 C 45 440 120 480 200 580 C 270 670 330 710 430 680 L 430 852 L -40 852 Z"
                fill={isDayMode ? '#CDDDD2' : '#203029'}
                opacity={isDayMode ? '0.9' : '0.95'}
              />
            </svg>
          </div>

          {/* Top Quick Skip Button for instant mobile access */}
          <div className="w-full flex justify-end z-20 shrink-0">
            <button
              onClick={handleQuickSkip}
              className={`px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-md border transition-all cursor-pointer ${
                isDayMode 
                  ? 'bg-white/70 border-[#D1DDD5] text-[#294B37] hover:bg-white' 
                  : 'bg-white/10 border-white/15 text-white/80 hover:bg-white/20'
              }`}
            >
              تخطي للـ Feed مباشرة ←
            </button>
          </div>

          {/* Logo & Brand Name Section */}
          <div className="w-full flex flex-col items-center text-center my-auto py-2 select-none z-10 shrink-0">
            <div className="relative scale-90 sm:scale-100 transition-transform">
              <Logo size={96} showText={false} />
            </div>

            <div className="flex flex-col items-center mt-2.5">
              <span className={`text-[28px] sm:text-[32px] font-bold tracking-tight leading-none ${
                isDayMode ? 'text-[#0E2116]' : 'text-[#F1EDE5]'
              }`}>
                سكرول إت
              </span>
              <span className={`text-[17px] sm:text-[19px] font-medium tracking-wide mt-1 ${
                isDayMode ? 'text-[#3E604F]' : 'text-[#B6BBB7]'
              }`} dir="ltr">
                Scroll It
              </span>
            </div>
          </div>

          {/* Lower Content Section - Always Pinned & In View on Mobile */}
          <div className="w-full flex flex-col z-10 shrink-0 pt-2 pb-1">
            {/* Main Headline & Supporting Copy */}
            <div className="w-full text-right mb-4 select-none" dir="rtl">
              <h1 className={`text-[26px] sm:text-[32px] font-bold leading-[1.25] tracking-tight ${
                isDayMode ? 'text-[#0D1F14]' : 'text-[#F1EDE5]'
              }`}>
                خل وقت السكرول
                <br />
                يشتغل لصالحك
              </h1>
              <p className={`text-[13px] sm:text-[14px] font-normal leading-relaxed mt-1.5 ${
                isDayMode ? 'text-[#3B5746]' : 'text-[#B6BBB7]'
              }`}>
                من موادك… إلى <span dir="ltr" className="inline-block font-semibold">Feed</span> تعليمي يتكيّف معك
              </p>
            </div>

            {/* Primary & Secondary CTAs - Guaranteed 100% visible on any phone */}
            <div className="w-full flex flex-col items-center gap-2.5 shrink-0">
              <button
                onClick={() => setStep(2)}
                className={`w-full h-[54px] sm:h-[58px] rounded-full font-bold text-[16px] sm:text-[17px] flex items-center justify-center relative active:scale-[0.98] transition-all cursor-pointer shadow-lg ${
                  isDayMode 
                    ? 'bg-[#183626] text-white shadow-[0_8px_20px_rgba(24,54,38,0.25)] hover:bg-[#122A1E]' 
                    : 'bg-[#F1EDE5] text-[#0E100F] shadow-[0_8px_20px_rgba(0,0,0,0.45)] hover:bg-white'
                }`}
              >
                <ChevronLeft className="w-5 h-5 absolute left-5 stroke-[2.5]" />
                <span>ابدأ الآن</span>
              </button>

              <button
                onClick={onOpenLogin || handleQuickSkip}
                className={`text-[12px] sm:text-[13px] font-medium transition-colors cursor-pointer py-1 ${
                  isDayMode ? 'text-[#4A6755] hover:text-[#12241A]' : 'text-[#A7ACA8] hover:text-[#F1EDE5]'
                }`}
              >
                عندي حساب بالفعل (تسجيل الدخول)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SCREEN 2: CHOOSE MAJOR (With Scrollable List & Guaranteed Visible CTA)     */}
      {/* ========================================================================= */}
      {step === 2 && (
        <div className="relative flex-1 min-h-0 flex flex-col justify-between px-5 pt-2 pb-5 z-10 animate-in fade-in duration-300 overflow-hidden">
          {/* Top Navigation & Segmented Progress Indicator */}
          <div className="flex items-center justify-between mb-3 pt-1 shrink-0" dir="ltr">
            {/* Left Circular Back Button */}
            <button
              onClick={() => setStep(1)}
              className={`w-9 h-9 rounded-full border flex items-center justify-center active:scale-95 transition-all cursor-pointer ${
                isDayMode 
                  ? 'bg-white border-[#D2DED6] text-[#1E3E2B]' 
                  : 'bg-[#141816] border-[#222724] text-[#B6BBB7] hover:text-[#F1EDE5]'
              }`}
              aria-label="الرجوع"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2]" />
            </button>

            {/* Progress Indicator */}
            <div className="flex items-center gap-1.5">
              <div className={`w-7 h-1 rounded-full ${isDayMode ? 'bg-[#183626]' : 'bg-[#FAF6EF]'}`} />
              <div className={`w-1.5 h-1.5 rounded-full ${isDayMode ? 'bg-[#C2D4C8]' : 'bg-[#39423D]'}`} />
              <div className={`w-1.5 h-1.5 rounded-full ${isDayMode ? 'bg-[#C2D4C8]' : 'bg-[#39423D]'}`} />
            </div>

            {/* Skip / Next Button in Header for Instant Mobile Access */}
            <button
              onClick={() => setStep(3)}
              className={`text-xs px-2.5 py-1 rounded-md font-sans transition-colors cursor-pointer ${
                isDayMode ? 'text-[#2D523B] hover:text-[#112318] bg-white/70' : 'text-[#A7ACA8] hover:text-[#FAF6EF]'
              }`}
            >
              تخطي
            </button>
          </div>

          {/* Title & Subtitle */}
          <div className="text-center mb-3 shrink-0">
            <h2 className={`text-[21px] sm:text-[24px] font-bold mb-0.5 ${
              isDayMode ? 'text-[#0E2116]' : 'text-[#F1EDE5]'
            }`}>
              وش تدرس؟
            </h2>
            <p className={`text-[12px] sm:text-[13px] ${
              isDayMode ? 'text-[#4A6755]' : 'text-[#8C928E]'
            }`}>
              علشان نجهز لك تجربة أقرب لك
            </p>
          </div>

          {/* Search Input Bar */}
          <div className={`relative mb-3 flex items-center rounded-2xl border px-3.5 py-2 text-right shrink-0 ${
            isDayMode 
              ? 'bg-white border-[#CFDCD4] shadow-xs' 
              : 'bg-[#141816] border-[#222724]'
          }`}>
            <Search className={`w-4 h-4 shrink-0 ml-1 ${isDayMode ? 'text-[#567563]' : 'text-[#747B77]'}`} />
            <input
              type="text"
              placeholder="ابحث عن تخصصك"
              value={majorSearch}
              onChange={(e) => setMajorSearch(e.target.value)}
              className={`w-full bg-transparent text-[13px] placeholder-opacity-70 focus:outline-none text-right pr-2 ${
                isDayMode ? 'text-[#0E2116] placeholder-[#567563]' : 'text-[#F1EDE5] placeholder-[#747B77]'
              }`}
            />
          </div>

          {/* Majors Scrollable List */}
          <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar space-y-2 pr-0.5 pb-2">
            {filteredMajors.map((major) => {
              const isSelected = selectedMajor === major.id;
              return (
                <button
                  key={major.id}
                  onClick={() => setSelectedMajor(major.id)}
                  className={`w-full h-[52px] sm:h-[56px] px-4 rounded-2xl flex items-center justify-between border transition-all cursor-pointer active:scale-[0.99] ${
                    isSelected
                      ? isDayMode 
                        ? 'bg-white border-[#183626] text-[#0E2116] shadow-sm' 
                        : 'bg-[#18231E] border-[#3A4B42] text-[#F1EDE5]'
                      : isDayMode
                        ? 'bg-white/80 border-[#D8E4DC] text-[#334F3F] hover:bg-white'
                        : 'bg-[#141816] border-[#222724] text-[#B6BBB7] hover:border-[#2C342F]'
                  }`}
                >
                  {/* Left: Chevron & Major Icon */}
                  <div className="flex items-center gap-3">
                    <ChevronLeft className={`w-4 h-4 ${isDayMode ? 'text-[#5A7968]' : 'text-[#747B77]'}`} />
                    <div className="flex items-center justify-center">
                      {getMajorIcon(major.id)}
                    </div>
                  </div>

                  {/* Center / Right: Major Name */}
                  <span className="font-medium text-[14px] sm:text-[15px] mr-auto pr-3 text-right">
                    {major.name}
                  </span>

                  {/* Far Right: Checkmark circle if selected */}
                  <div className="shrink-0 flex items-center justify-center">
                    {isSelected ? (
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shadow-xs ${
                        isDayMode ? 'bg-[#183626] text-white' : 'bg-[#FAF6EF] text-[#0E100F]'
                      }`}>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    ) : (
                      <div className={`w-5 h-5 rounded-full border ${isDayMode ? 'border-[#C2D4C8]' : 'border-[#39423D]'}`} />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Guaranteed Visible Sticky Bottom CTA: التالي > */}
          <div className={`pt-3 pb-1 shrink-0 border-t ${
            isDayMode ? 'border-[#D4E0D8] bg-[#F2F6F3]/95' : 'border-[#1C221F] bg-[#0E100F]/95'
          } backdrop-blur-md`}>
            <button
              onClick={() => setStep(3)}
              className={`w-full h-[50px] sm:h-[54px] rounded-full font-bold text-[16px] flex items-center justify-center relative active:scale-[0.98] transition-transform shadow-md cursor-pointer ${
                isDayMode 
                  ? 'bg-[#183626] text-white hover:bg-[#122A1E]' 
                  : 'bg-[#FAF6EF] text-[#0E100F] hover:bg-white'
              }`}
            >
              <span>التالي</span>
              <ChevronRight className="w-5 h-5 absolute right-6 stroke-[2.5]" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SCREEN 3: CHOOSE COURSES (With Scrollable List & Guaranteed Visible CTA)   */}
      {/* ========================================================================= */}
      {step === 3 && (
        <div className="relative flex-1 min-h-0 flex flex-col justify-between px-5 pt-2 pb-5 z-10 animate-in fade-in duration-300 overflow-hidden">
          {/* Top Navigation & Segmented Progress Indicator */}
          <div className="flex items-center justify-between mb-3 pt-1 shrink-0" dir="ltr">
            <button
              onClick={() => setStep(2)}
              className={`w-9 h-9 rounded-full border flex items-center justify-center active:scale-95 transition-all cursor-pointer ${
                isDayMode 
                  ? 'bg-white border-[#D2DED6] text-[#1E3E2B]' 
                  : 'bg-[#141816] border-[#222724] text-[#B6BBB7] hover:text-[#F1EDE5]'
              }`}
              aria-label="الرجوع"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2]" />
            </button>

            {/* Progress Indicator */}
            <div className="flex items-center gap-1.5">
              <div className={`w-1.5 h-1.5 rounded-full ${isDayMode ? 'bg-[#C2D4C8]' : 'bg-[#39423D]'}`} />
              <div className={`w-7 h-1 rounded-full ${isDayMode ? 'bg-[#183626]' : 'bg-[#FAF6EF]'}`} />
              <div className={`w-1.5 h-1.5 rounded-full ${isDayMode ? 'bg-[#C2D4C8]' : 'bg-[#39423D]'}`} />
            </div>

            <button
              onClick={() => onComplete(selectedMajor, selectedCourses)}
              className={`text-xs px-2.5 py-1 rounded-md font-sans transition-colors cursor-pointer ${
                isDayMode ? 'text-[#2D523B] hover:text-[#112318] bg-white/70' : 'text-[#A7ACA8] hover:text-[#FAF6EF]'
              }`}
            >
              تخطي
            </button>
          </div>

          {/* Title & Subtitle */}
          <div className="text-center mb-3 shrink-0">
            <h2 className={`text-[21px] sm:text-[24px] font-bold mb-0.5 ${
              isDayMode ? 'text-[#0E2116]' : 'text-[#F1EDE5]'
            }`}>
              وش موادك هالترم؟
            </h2>
            <p className={`text-[12px] sm:text-[13px] ${
              isDayMode ? 'text-[#4A6755]' : 'text-[#8C928E]'
            }`}>
              اختر موادك الحالية عشان نرتب لك Feed مناسب
            </p>
          </div>

          {/* Search Input Bar */}
          <div className={`relative mb-3 flex items-center rounded-2xl border px-3.5 py-2 text-right shrink-0 ${
            isDayMode 
              ? 'bg-white border-[#CFDCD4] shadow-xs' 
              : 'bg-[#141816] border-[#222724]'
          }`}>
            <Search className={`w-4 h-4 shrink-0 ml-1 ${isDayMode ? 'text-[#567563]' : 'text-[#747B77]'}`} />
            <input
              type="text"
              placeholder="ابحث عن مادة"
              value={courseSearch}
              onChange={(e) => setCourseSearch(e.target.value)}
              className={`w-full bg-transparent text-[13px] placeholder-opacity-70 focus:outline-none text-right pr-2 ${
                isDayMode ? 'text-[#0E2116] placeholder-[#567563]' : 'text-[#F1EDE5] placeholder-[#747B77]'
              }`}
            />
          </div>

          {/* Courses Scrollable List */}
          <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar space-y-2 pr-0.5 pb-2">
            {filteredCourses.map((course) => {
              const isSelected = selectedCourses.includes(course.id);
              return (
                <button
                  key={course.id}
                  onClick={() => toggleCourse(course.id)}
                  className={`w-full h-[56px] sm:h-[60px] px-4 rounded-2xl flex items-center justify-between border transition-all cursor-pointer active:scale-[0.99] ${
                    isSelected
                      ? isDayMode 
                        ? 'bg-white border-[#183626] text-[#0E2116] shadow-sm' 
                        : 'bg-[#18231E] border-[#3A4B42] text-[#F1EDE5]'
                      : isDayMode
                        ? 'bg-white/80 border-[#D8E4DC] text-[#334F3F] hover:bg-white'
                        : 'bg-[#141816] border-[#222724] text-[#B6BBB7] hover:border-[#2C342F]'
                  }`}
                >
                  <div className="flex items-center">
                    <ChevronLeft className={`w-4 h-4 ${isDayMode ? 'text-[#5A7968]' : 'text-[#747B77]'}`} />
                  </div>

                  <div className="flex flex-col items-center justify-center flex-1 text-center">
                    <span className={`font-mono text-[13px] font-bold leading-tight ${
                      isDayMode ? 'text-[#0E2116]' : 'text-[#F1EDE5]'
                    }`} dir="ltr">
                      {course.code}
                    </span>
                    <span className={`text-[12px] mt-0.5 font-normal ${
                      isDayMode ? 'text-[#4A6755]' : 'text-[#8C928E]'
                    }`}>
                      {course.name}
                    </span>
                  </div>

                  <div className="shrink-0 flex items-center justify-center">
                    {isSelected ? (
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shadow-xs ${
                        isDayMode ? 'bg-[#183626] text-white' : 'bg-[#FAF6EF] text-[#0E100F]'
                      }`}>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    ) : (
                      <div className={`w-5 h-5 rounded-full border ${isDayMode ? 'border-[#C2D4C8]' : 'border-[#39423D]'}`} />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Guaranteed Visible Sticky Bottom CTA: كمّل > */}
          <div className={`pt-2 pb-1 shrink-0 border-t ${
            isDayMode ? 'border-[#D4E0D8] bg-[#F2F6F3]/95' : 'border-[#1C221F] bg-[#0E100F]/95'
          } backdrop-blur-md flex flex-col items-center text-center`}>
            <span className={`text-[11px] mb-1.5 ${isDayMode ? 'text-[#4A6755]' : 'text-[#8C928E]'}`}>
              تقدر تغيرها بعدين
            </span>

            <button
              onClick={() => onComplete(selectedMajor, selectedCourses)}
              className={`w-full h-[50px] sm:h-[54px] rounded-full font-bold text-[16px] flex items-center justify-center relative active:scale-[0.98] transition-transform shadow-md cursor-pointer ${
                isDayMode 
                  ? 'bg-[#183626] text-white hover:bg-[#122A1E]' 
                  : 'bg-[#FAF6EF] text-[#0E100F] hover:bg-white'
              }`}
            >
              <span>كمّل للـ Feed</span>
              <ChevronRight className="w-5 h-5 absolute right-6 stroke-[2.5]" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
