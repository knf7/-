import React from 'react';
import { Home, BookOpen, Plus, Repeat, User } from 'lucide-react';
import { TabType } from '../types';

interface BottomNavProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  reviewCount: number;
  isDayMode?: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
  reviewCount,
  isDayMode = false,
}) => {
  const activeColor = isDayMode ? 'text-[#0E2416]' : 'text-[#F1EDE5]';
  const inactiveColor = isDayMode ? 'text-[#627E6E] hover:text-[#193623]' : 'text-[#747B77] hover:text-[#B6BBB7]';

  return (
    <nav 
      aria-label="التنقل الرئيسي"
      className={`absolute bottom-0 inset-x-0 z-40 px-3 pt-1.5 pb-2 transition-all select-none backdrop-blur-2xl ${
        isDayMode 
          ? 'bg-white/80 border-t border-[#DDE7E1] shadow-[0_-4px_24px_rgba(20,40,30,0.06)]' 
          : 'bg-[#0E100F]/90 border-t border-[#262D29]/70'
      }`}
    >
      <div className="max-w-[420px] mx-auto flex items-center justify-around h-14">
        {/* 1. Feed / لك */}
        <button
          onClick={() => onSelectTab('feed')}
          className={`flex flex-col items-center justify-center w-14 h-full gap-0.5 transition-colors cursor-pointer ${
            activeTab === 'feed' ? activeColor : inactiveColor
          }`}
          aria-label="خلاصة لك"
        >
          <Home className="w-5 h-5 stroke-[2]" />
          <span className="text-[10px] font-medium">لك</span>
        </button>

        {/* 2. Courses / موادي */}
        <button
          onClick={() => onSelectTab('courses')}
          className={`flex flex-col items-center justify-center w-14 h-full gap-0.5 transition-colors cursor-pointer ${
            activeTab === 'courses' ? activeColor : inactiveColor
          }`}
          aria-label="موادي الدراسية"
        >
          <BookOpen className="w-5 h-5 stroke-[2]" />
          <span className="text-[10px] font-medium">موادي</span>
        </button>

        {/* 3. Center + Action */}
        <button
          onClick={() => onSelectTab('create')}
          className={`flex items-center justify-center w-11 h-11 rounded-full shadow-lg active:scale-95 transition-transform cursor-pointer ${
            isDayMode 
              ? 'bg-[#163323] text-[#FAF7F2] shadow-[0_4px_16px_rgba(22,51,35,0.35)]' 
              : 'bg-[#F1EDE5] text-[#0E100F] shadow-black/50'
          }`}
          aria-label="إضافة ملف أو محتوى"
        >
          <Plus className="w-6 h-6 stroke-[2.5]" />
        </button>

        {/* 4. Review / راجع (with quiet count badge) */}
        <button
          onClick={() => onSelectTab('review')}
          className={`relative flex flex-col items-center justify-center w-14 h-full gap-0.5 transition-colors cursor-pointer ${
            activeTab === 'review' ? activeColor : inactiveColor
          }`}
          aria-label="مراجعة المفاهيم"
        >
          <div className="relative">
            <Repeat className="w-5 h-5 stroke-[2]" />
            {reviewCount > 0 && (
              <span className={`absolute -top-1 -right-2 px-1.5 min-w-4 h-4 rounded-full text-[9px] font-mono font-bold flex items-center justify-center leading-none ${
                isDayMode ? 'bg-[#29543C] text-white' : 'bg-[#58675F] text-[#F1EDE5]'
              }`}>
                {reviewCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium">راجع</span>
        </button>

        {/* 5. Profile / أنا */}
        <button
          onClick={() => onSelectTab('profile')}
          className={`flex flex-col items-center justify-center w-14 h-full gap-0.5 transition-colors cursor-pointer ${
            activeTab === 'profile' ? activeColor : inactiveColor
          }`}
          aria-label="الملف الشخصي والإعدادات"
        >
          <User className="w-5 h-5 stroke-[2]" />
          <span className="text-[10px] font-medium">أنا</span>
        </button>
      </div>
    </nav>
  );
};
