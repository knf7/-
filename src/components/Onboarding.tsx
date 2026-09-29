import { useEffect, useState } from 'react';
import { BarChart3, BookOpen, BriefcaseBusiness, Laptop, Settings2, Stethoscope } from 'lucide-react';
import { Logo } from './Logo';
import { StatusBar } from './StatusBar';
import { MAJORS, COURSES } from '../data/courses';
import { BackButton, CourseSelectionRow, PrimaryButton, ProgressDots, SearchField, SecondaryButton, SelectionRow } from './OnboardingPrimitives';

interface OnboardingProps {
  onComplete: (selectedMajor: string, selectedCourses: string[]) => void;
  isDayMode?: boolean;
}

const MAJOR_ICONS = {
  cs: Laptop,
  is: BarChart3,
  ba: BriefcaseBusiness,
  med: Stethoscope,
  eng: Settings2,
  gen: BookOpen,
};

function savedSelection<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) as T : fallback;
  } catch {
    return fallback;
  }
}

function WelcomeAtmosphere() {
  return <svg className="si-welcome-atmosphere" viewBox="0 0 393 852" preserveAspectRatio="xMidYMid slice" fill="none" aria-hidden="true">
    <defs>
      <radialGradient id="si-ambient"><stop stopColor="#263A2E" stopOpacity=".52" /><stop offset="1" stopColor="#0E100F" stopOpacity="0" /></radialGradient>
      <linearGradient id="si-wave" x1="0" y1="489" x2="347" y2="832" gradientUnits="userSpaceOnUse">
        <stop stopColor="#26392D" /><stop offset=".48" stopColor="#18251D" /><stop offset="1" stopColor="#0E1510" />
      </linearGradient>
      <linearGradient id="si-wave-edge" x1="28" y1="486" x2="311" y2="725" gradientUnits="userSpaceOnUse">
        <stop stopColor="#8FA38F" stopOpacity=".17" /><stop offset=".6" stopColor="#607561" stopOpacity=".07" /><stop offset="1" stopColor="#0E100F" stopOpacity="0" />
      </linearGradient>
    </defs>
    <ellipse cx="287" cy="174" rx="290" ry="250" fill="url(#si-ambient)" />
    <path d="M-76 434C67 461 225 539 314 634c62 67 93 125 145 169v96H-76V434Z" fill="url(#si-wave)" />
    <path d="M-76 434C67 461 225 539 314 634c62 67 93 125 145 169" stroke="url(#si-wave-edge)" strokeWidth="3" />
    <path d="M-75 563C92 539 211 651 318 748c47 43 96 78 143 104" stroke="#789080" strokeOpacity=".05" strokeWidth="95" />
  </svg>;
}

export const Onboarding = ({ onComplete }: OnboardingProps) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedMajor, setSelectedMajor] = useState<string>(() => savedSelection('scroll_it_phase1_major', ''));
  const [selectedCourses, setSelectedCourses] = useState<string[]>(() => savedSelection('scroll_it_phase1_courses', []));
  const [majorSearch, setMajorSearch] = useState('');
  const [courseSearch, setCourseSearch] = useState('');
  const [complete, setComplete] = useState(false);

  useEffect(() => { localStorage.setItem('scroll_it_phase1_major', JSON.stringify(selectedMajor)); }, [selectedMajor]);
  useEffect(() => { localStorage.setItem('scroll_it_phase1_courses', JSON.stringify(selectedCourses)); }, [selectedCourses]);

  const filteredMajors = MAJORS.filter(({ name }) => name.includes(majorSearch.trim()));
  const query = courseSearch.trim().toLowerCase();
  const filteredCourses = COURSES.filter(({ name, code }) => `${name} ${code}`.toLowerCase().includes(query));

  function toggleCourse(id: string) {
    setComplete(false);
    setSelectedCourses((current) => current.includes(id) ? current.filter((course) => course !== id) : [...current, id]);
  }

  function finish() {
    if (!selectedMajor || selectedCourses.length === 0) return;
    onComplete(selectedMajor, selectedCourses);
    setComplete(true);
  }

  return <div className="si-onboarding" dir="rtl">
    <StatusBar isDayMode={false} />

    {step === 1 && <section className="si-welcome" aria-labelledby="si-welcome-title">
      <WelcomeAtmosphere />
      <div className="si-welcome-brand"><Logo size={140} showText /></div>
      <div className="si-welcome-bottom">
        <div className="si-welcome-copy">
          <h1 id="si-welcome-title">خل وقت السكرول<br />يشتغل لصالحك</h1>
          <p>من موادك… إلى <span dir="ltr">Feed</span> تعليمي يتكيّف معك</p>
        </div>
        <div className="si-welcome-actions">
          <PrimaryButton onClick={() => setStep(2)}>ابدأ</PrimaryButton>
        </div>
      </div>
    </section>}

    {step > 1 && <section className="si-form-screen" aria-labelledby="si-screen-title" key={step}>
      <header className="si-form-header">
        <BackButton onClick={() => setStep(step === 3 ? 2 : 1)} />
        <ProgressDots step={step === 2 ? 2 : 3} />
        <span className="si-header-spacer" />
      </header>

      <div className="si-form-intro">
        <h1 id="si-screen-title">{step === 2 ? 'وش تدرس؟' : 'وش موادك هالترم؟'}</h1>
        <p>{step === 2 ? 'علشان نجهز لك تجربة أقرب لك' : 'اختر موادك الحالية عشان نرتب لك Feed مناسب'}</p>
      </div>

      <SearchField value={step === 2 ? majorSearch : courseSearch} onChange={step === 2 ? setMajorSearch : setCourseSearch} placeholder={step === 2 ? 'ابحث عن تخصصك' : 'ابحث عن مادة'} />

      <div className="si-option-list" role="group" aria-label={step === 2 ? 'التخصصات' : 'مواد هذا الترم'}>
        {step === 2 ? filteredMajors.map(({ id, name }) => {
          const Icon = MAJOR_ICONS[id as keyof typeof MAJOR_ICONS] ?? BookOpen;
          return <SelectionRow key={id} label={name} icon={<Icon size={22} strokeWidth={1.7} />} selected={selectedMajor === id} onClick={() => setSelectedMajor(id)} />;
        }) : filteredCourses.map(({ id, code, name }) => <CourseSelectionRow key={id} code={code} name={name} selected={selectedCourses.includes(id)} onClick={() => toggleCourse(id)} />)}
        {(step === 2 ? filteredMajors.length : filteredCourses.length) === 0 && <p className="si-empty-results">ما لقينا نتيجة بهذا الاسم</p>}
      </div>

      <footer className="si-form-footer">
        {step === 3 && <p className="si-footer-helper">{complete ? 'اختياراتك محفوظة، جاهزين للخطوة الجاية' : 'تقدر تغيّرها بعدين'}</p>}
        <PrimaryButton disabled={step === 2 ? !selectedMajor : selectedCourses.length === 0} onClick={step === 2 ? () => setStep(3) : finish}>{step === 2 ? 'التالي' : 'كمّل'}</PrimaryButton>
      </footer>
    </section>}
  </div>;
};
