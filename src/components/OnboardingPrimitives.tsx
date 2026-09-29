import type { ReactNode } from 'react';
import { Check, ChevronLeft, Search, ArrowLeft } from 'lucide-react';

export function PrimaryButton({ children, onClick, disabled = false }: { children: ReactNode; onClick: () => void; disabled?: boolean }) {
  return <button type="button" className="si-primary-button" onClick={onClick} disabled={disabled}>
    <span>{children}</span><ChevronLeft size={23} strokeWidth={2.2} aria-hidden="true" />
  </button>;
}

export function SecondaryButton({ children, onClick }: { children: ReactNode; onClick: () => void }) {
  return <button type="button" className="si-secondary-button" onClick={onClick}>{children}</button>;
}

export function BackButton({ onClick }: { onClick: () => void }) {
  return <button type="button" className="si-back-button" onClick={onClick} aria-label="رجوع"><ArrowLeft size={20} strokeWidth={1.8} aria-hidden="true" /></button>;
}

export function ProgressDots({ step }: { step: 2 | 3 }) {
  return <div className="si-progress" aria-label={`الخطوة ${step - 1} من 2`}>
    {[1, 2, 3].map((n) => <span key={n} className={`si-progress-dot${n === step - 1 ? ' is-current' : ''}`} />)}
  </div>;
}

export function SearchField({ value, onChange, placeholder }: { value: string; onChange: (value: string) => void; placeholder: string }) {
  return <label className="si-search-field">
    <Search size={22} strokeWidth={1.8} aria-hidden="true" />
    <span className="si-sr-only">{placeholder}</span>
    <input type="search" value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} />
  </label>;
}

function SelectionIndicator({ selected }: { selected: boolean }) {
  return <span className="si-selection-indicator" aria-hidden="true">{selected && <Check size={16} strokeWidth={2.6} />}</span>;
}

export function SelectionRow({ label, icon, selected, onClick }: { label: string; icon: ReactNode; selected: boolean; onClick: () => void }) {
  return <button type="button" className={`si-selection-row${selected ? ' is-selected' : ''}`} aria-pressed={selected} onClick={onClick}>
    <ChevronLeft size={18} strokeWidth={1.6} className="si-row-chevron" aria-hidden="true" />
    <span className="si-row-icon" aria-hidden="true">{icon}</span>
    <span className="si-row-label">{label}</span>
    <SelectionIndicator selected={selected} />
  </button>;
}

export function CourseSelectionRow({ code, name, selected, onClick }: { code: string; name: string; selected: boolean; onClick: () => void }) {
  return <button type="button" className={`si-course-row${selected ? ' is-selected' : ''}`} aria-pressed={selected} onClick={onClick}>
    <ChevronLeft size={18} strokeWidth={1.6} className="si-row-chevron" aria-hidden="true" />
    <span className="si-course-copy"><span dir="ltr" className="si-course-code">{code}</span><span className="si-course-name">{name}</span></span>
    <SelectionIndicator selected={selected} />
  </button>;
}
