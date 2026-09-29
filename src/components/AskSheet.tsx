import React, { useState } from 'react';
import { Concept } from '../types';
import { X, Send } from 'lucide-react';

interface AskSheetProps {
  concept: Concept | null;
  isOpen: boolean;
  isDayMode?: boolean;
  onClose: () => void;
}

export const AskSheet: React.FC<AskSheetProps> = ({ 
  concept, 
  isOpen, 
  isDayMode = false, 
  onClose 
}) => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'system'; text: string }>>([]);

  if (!isOpen || !concept) return null;

  const quickPrompts = [
    'ليش؟',
    'عطني مثال',
    'وش الفرق بينها وبين 3NF؟',
  ];

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg = { sender: 'user' as const, text };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setQuery('');

    // Predefined smart contextual responses
    setTimeout(() => {
      let reply = 'هذا المفهوم يركز على سلامة تصميم الجداول وضمان أن كل معلومة تعتمد على المفتاح كاملاً بدون تجزئة.';
      
      const lower = text.toLowerCase();
      if (lower.includes('ليش') || text.includes('لماذا')) {
        reply = 'السبب الرئيسي هو منع تكرار البيانات وحماية قاعدة البيانات من مشاكل التعديل أو الحذف الخاطئ.';
      } else if (lower.includes('مثال')) {
        reply = 'لو عندك (رقم الطالب، رقم المقرر) ومخزن معهم اسم الطالب، اسم الطالب يعتمد فقط على رقم الطالب، وهذا غلط في 2NF.';
      } else if (lower.includes('3nf') || text.includes('ثالث')) {
        reply = '2NF تعالج الاعتماد الجزئي على المفتاح، بينما 3NF تعالج الاعتماد الانتقالي (حقل عادي يعتمد على حقل عادي ثاني).';
      } else if (concept.qaList && concept.qaList.length > 0) {
        reply = concept.qaList[0].answer;
      }

      setMessages([...updated, { sender: 'system' as const, text: reply }]);
    }, 450);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm select-none animate-in fade-in duration-200">
      <div 
        className={`w-full max-w-[420px] max-h-[85vh] rounded-t-3xl p-6 shadow-2xl flex flex-col animate-in slide-in-from-bottom duration-300 border-t ${
          isDayMode 
            ? 'bg-[#F4F7F5] border-[#D4E0D8] text-[#102418]' 
            : 'bg-[#151917] border-[#39423D] text-[#F1EDE5]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`flex items-center justify-between pb-3 border-b ${
          isDayMode ? 'border-[#D4E0D8]' : 'border-[#262D29]'
        }`}>
          <div className={`w-8 h-1 rounded-full mx-auto absolute top-3 left-1/2 -translate-x-1/2 ${
            isDayMode ? 'bg-[#CDDDD2]' : 'bg-[#39423D]'
          }`} />
          <div>
            <h3 className="text-base font-bold mt-1">
              اسأل عن الفكرة
            </h3>
            <div className={`flex items-center gap-2 text-xs font-mono mt-0.5 ${
              isDayMode ? 'text-[#3E674F]' : 'text-[#8C928E]'
            }`} dir="ltr">
              <span>{concept.title.replace('وش يعني ', '').replace('ليش ', '').replace(' أصلًا؟', '')}</span>
              <span>·</span>
              <span>{concept.sourceLabel}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer ${
              isDayMode ? 'text-[#486E56] hover:bg-black/5' : 'text-[#8C928E] hover:text-[#F1EDE5]'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Prompts */}
        <div className="flex items-center gap-2 py-3 overflow-x-auto no-scrollbar">
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className={`px-3 py-1.5 rounded-full border text-xs whitespace-nowrap active:scale-95 transition-all cursor-pointer ${
                isDayMode 
                  ? 'bg-white border-[#D4E0D8] text-[#1B422D] hover:bg-[#EBF2EC]' 
                  : 'bg-[#1B201D] border-[#262D29] text-[#B6BBB7] hover:text-[#F1EDE5]'
              }`}
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto py-3 space-y-3 min-h-[160px] max-h-[280px]">
          {messages.length === 0 ? (
            <div className={`text-center py-8 text-xs ${isDayMode ? 'text-[#5A7A68]' : 'text-[#8C928E]'}`}>
              اسأل عن أي نقطة ما وضحت لك في هذا المفهوم
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl text-xs sm:text-sm leading-relaxed max-w-[85%] ${
                  msg.sender === 'user'
                    ? (isDayMode ? 'bg-[#183626] text-white mr-auto shadow-xs' : 'bg-[#203029] border border-[#58675F]/60 text-[#F1EDE5] mr-auto')
                    : (isDayMode ? 'bg-white border border-[#D4E0D8] text-[#12241A] ml-auto shadow-xs' : 'bg-[#1B201D] border border-[#262D29] text-[#B6BBB7] ml-auto')
                }`}
              >
                {msg.text}
              </div>
            ))
          )}
        </div>

        {/* Input area */}
        <div className={`pt-3 border-t flex items-center gap-2 ${
          isDayMode ? 'border-[#D4E0D8]' : 'border-[#262D29]'
        }`}>
          <input
            type="text"
            placeholder="اسأل عن الفكرة…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend(query)}
            className={`flex-1 py-3 px-4 rounded-xl border text-xs sm:text-sm focus:outline-none transition-colors ${
              isDayMode 
                ? 'bg-white border-[#D4E0D8] text-[#102418] placeholder-[#7F998C] focus:border-[#1E4D34]' 
                : 'bg-[#1B201D] border-[#262D29] text-[#F1EDE5] placeholder-[#606762] focus:border-[#58675F]'
            }`}
          />
          <button
            onClick={() => handleSend(query)}
            disabled={!query.trim()}
            className={`w-11 h-11 rounded-xl disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center shrink-0 active:scale-95 transition-all cursor-pointer ${
              isDayMode 
                ? 'bg-[#183626] text-white shadow-xs' 
                : 'bg-[#F1EDE5] text-[#0E100F]'
            }`}
          >
            <Send className="w-4 h-4 -scale-x-100" />
          </button>
        </div>
      </div>
    </div>
  );
};
