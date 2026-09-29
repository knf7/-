import React, { useState } from 'react';
import { Logo } from './Logo';
import { StatusBar } from './StatusBar';
import { UserProfile } from '../types';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  GraduationCap,
  Building,
  Phone,
  ArrowRight,
  ChevronLeft,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Sun,
  Moon,
  Smartphone,
  KeyRound,
  ArrowLeft,
} from 'lucide-react';

interface AuthProps {
  onLoginSuccess: (user: UserProfile) => void;
  onSkip: () => void;
  isDayMode?: boolean;
  onToggleDayMode?: () => void;
}

type AuthMode = 'signin' | 'signup' | 'otp' | 'forgot';

export const Auth: React.FC<AuthProps> = ({
  onLoginSuccess,
  onSkip,
  isDayMode = false,
  onToggleDayMode,
}) => {
  const [mode, setMode] = useState<AuthMode>('signin');

  // Sign in fields
  const [identifier, setIdentifier] = useState('442019876@student.ksu.edu.sa');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Sign up fields
  const [fullName, setFullName] = useState('');
  const [university, setUniversity] = useState('جامعة الملك سعود (KSU)');
  const [majorName, setMajorName] = useState('علوم الحاسب (CS)');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  // OTP fields
  const [phoneNumber, setPhoneNumber] = useState('0551234567');
  const [otpSent, setOtpSent] = useState(false);
  const [otpDigits, setOtpDigits] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(45);

  // Forgot password
  const [forgotInput, setForgotInput] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  // State loading & feedback
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  // Handle standard Sign In
  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) {
      setFeedbackMsg('فضلاً أدخل البريد الإلكتروني أو الرقم الجامعي');
      return;
    }
    setIsLoading(true);
    setFeedbackMsg(null);

    setTimeout(() => {
      setIsLoading(false);
      const user: UserProfile = {
        id: 'user_' + Date.now(),
        name: identifier.includes('ksu') ? 'عبدالرحمن الشهري' : 'طالب جامعي',
        emailOrPhone: identifier,
        university: 'جامعة الملك سعود',
        collegeOrMajor: 'علوم الحاسب والذكاء الاصطناعي',
        avatarLetter: 'ع',
        isLoggedIn: true,
      };
      onLoginSuccess(user);
    }, 600);
  };

  // Fast Demo 1-Click Login
  const handleDemoLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const user: UserProfile = {
        id: 'demo_student',
        name: 'سلطان القحطاني',
        emailOrPhone: 'sultan.q@student.ksu.edu.sa',
        university: 'جامعة الملك سعود',
        collegeOrMajor: 'علوم الحاسب - نظم المعلومات',
        avatarLetter: 'س',
        isLoggedIn: true,
      };
      onLoginSuccess(user);
    }, 400);
  };

  // Fast SSO Login (Nafath / University Portal)
  const handleSsoLogin = (provider: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const user: UserProfile = {
        id: 'sso_' + Date.now(),
        name: 'سارة العتيبي',
        emailOrPhone: 'sarah.o@ksu.edu.sa',
        university: provider.includes('جامعة') ? 'جامعة الإمام محمد بن سعود' : 'جامعة الملك سعود',
        collegeOrMajor: 'هندسة البرمجيات',
        avatarLetter: 'س',
        isLoggedIn: true,
      };
      onLoginSuccess(user);
    }, 500);
  };

  // Handle Sign Up
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setFeedbackMsg('فضلاً أدخل اسمك الكامل');
      return;
    }
    setIsLoading(true);
    setFeedbackMsg(null);

    setTimeout(() => {
      setIsLoading(false);
      const user: UserProfile = {
        id: 'user_' + Date.now(),
        name: fullName,
        emailOrPhone: signupEmail || 'student@university.edu.sa',
        university: university,
        collegeOrMajor: majorName,
        avatarLetter: fullName.charAt(0) || 'ط',
        isLoggedIn: true,
      };
      onLoginSuccess(user);
    }, 650);
  };

  // Handle OTP digit changes
  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) val = val.slice(-1);
    const newDigits = [...otpDigits];
    newDigits[index] = val;
    setOtpDigits(newDigits);

    // If filled all 4 digits, automatically verify
    if (val && index < 3) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerifyOtp = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const user: UserProfile = {
        id: 'user_phone_' + Date.now(),
        name: 'مشاري الدوسري',
        emailOrPhone: phoneNumber,
        university: 'جامعة الملك فهد للبترول والمعادن',
        collegeOrMajor: 'علوم وهندسة الحاسب',
        avatarLetter: 'م',
        isLoggedIn: true,
      };
      onLoginSuccess(user);
    }, 500);
  };

  return (
    <div
      className={`relative w-full h-full flex flex-col justify-between overflow-hidden select-none transition-colors duration-500 ${
        isDayMode ? 'bg-[#F2F6F3] text-[#112318]' : 'bg-[#0E100F] text-[#F1EDE5]'
      }`}
      dir="rtl"
    >
      {/* iOS Status Bar */}
      <StatusBar isDayMode={isDayMode} />

      {/* Top Ambient Light Glow */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div
          className={`absolute top-[2%] left-1/2 -translate-x-1/2 w-[340px] h-[280px] rounded-full blur-[85px] pointer-events-none transition-opacity ${
            isDayMode ? 'bg-[#5A876E]/20' : 'bg-[#203029]/50'
          }`}
        />
      </div>

      {/* Top Header Bar: Day/Night mode & Skip button */}
      <div className="w-full flex items-center justify-between px-5 pt-1 pb-1 shrink-0 z-20" dir="ltr">
        {/* Skip Button */}
        <button
          onClick={onSkip}
          className={`px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-md border transition-all cursor-pointer ${
            isDayMode
              ? 'bg-white/80 border-[#D1DDD5] text-[#294B37] hover:bg-white'
              : 'bg-white/10 border-white/15 text-white/80 hover:bg-white/20'
          }`}
        >
          تخطي كزائر ←
        </button>

        {/* Day/Night toggle button */}
        {onToggleDayMode && (
          <button
            onClick={onToggleDayMode}
            className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
              isDayMode
                ? 'bg-white border-[#D4E0D8] text-[#1E3E2B]'
                : 'bg-[#181D1A] border-[#2A312D] text-[#D8DFDB]'
            }`}
            title="تبديل الوضع"
          >
            {isDayMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-300" />}
          </button>
        )}
      </div>

      {/* Main Content Area: Scrollable */}
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar px-5 pb-5 z-10 flex flex-col justify-start">
        {/* Brand & Title Section */}
        <div className="w-full flex flex-col items-center text-center pt-1 pb-3 shrink-0">
          <div className="relative scale-90 mb-1">
            <Logo size={74} showText={false} />
          </div>

          <h1
            className={`text-[23px] sm:text-[25px] font-bold tracking-tight leading-tight ${
              isDayMode ? 'text-[#0E2116]' : 'text-[#F1EDE5]'
            }`}
          >
            {mode === 'signin' && 'تسجيل الدخول إلى سكرول إت'}
            {mode === 'signup' && 'إنشاء حساب طالب جديد'}
            {mode === 'otp' && 'تسجيل الدخول السريع (OTP)'}
            {mode === 'forgot' && 'استعادة كلمة المرور'}
          </h1>

          <p
            className={`text-[12px] sm:text-[13px] mt-1 font-normal max-w-[280px] ${
              isDayMode ? 'text-[#3E604F]' : 'text-[#A0A7A2]'
            }`}
          >
            {mode === 'signin' && 'تابع مفاهيم مقرراتك وسكرول بذكاء يخدم دراستك'}
            {mode === 'signup' && 'سجل بجامعتك وتخصصك لتخصيص خلاصة موادك'}
            {mode === 'otp' && 'أدخل رقم جوالك لتصلك رسالة تحقق فورية'}
            {mode === 'forgot' && 'أدخل بريدك الجامعي لإرسال رابط إعادة التعيين'}
          </p>
        </div>

        {/* Journey Tabs: تسجيل الدخول / حساب جديد / رمز OTP */}
        {(mode === 'signin' || mode === 'signup' || mode === 'otp') && (
          <div
            className={`w-full p-1 rounded-2xl flex items-center mb-4 border shrink-0 transition-colors ${
              isDayMode ? 'bg-[#E3EBE5] border-[#CFDCD4]' : 'bg-[#151917] border-[#252B27]'
            }`}
          >
            <button
              onClick={() => {
                setMode('signin');
                setFeedbackMsg(null);
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                mode === 'signin'
                  ? isDayMode
                    ? 'bg-white text-[#0E2116] shadow-xs'
                    : 'bg-[#222B26] text-[#F1EDE5] shadow-xs'
                  : isDayMode
                  ? 'text-[#486353] hover:text-[#0E2116]'
                  : 'text-[#848B86] hover:text-[#F1EDE5]'
              }`}
            >
              تسجيل الدخول
            </button>

            <button
              onClick={() => {
                setMode('signup');
                setFeedbackMsg(null);
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                mode === 'signup'
                  ? isDayMode
                    ? 'bg-white text-[#0E2116] shadow-xs'
                    : 'bg-[#222B26] text-[#F1EDE5] shadow-xs'
                  : isDayMode
                  ? 'text-[#486353] hover:text-[#0E2116]'
                  : 'text-[#848B86] hover:text-[#F1EDE5]'
              }`}
            >
              حساب جديد
            </button>

            <button
              onClick={() => {
                setMode('otp');
                setFeedbackMsg(null);
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                mode === 'otp'
                  ? isDayMode
                    ? 'bg-white text-[#0E2116] shadow-xs'
                    : 'bg-[#222B26] text-[#F1EDE5] shadow-xs'
                  : isDayMode
                  ? 'text-[#486353] hover:text-[#0E2116]'
                  : 'text-[#848B86] hover:text-[#F1EDE5]'
              }`}
            >
              رمز الجوال
            </button>
          </div>
        )}

        {/* Feedback / Error Banner */}
        {feedbackMsg && (
          <div className="w-full mb-3 p-2.5 rounded-xl text-xs bg-red-500/10 border border-red-500/30 text-red-400 text-center animate-in fade-in">
            {feedbackMsg}
          </div>
        )}

        {/* ========================================================================= */}
        {/* SUB-JOURNEY 1: SIGN IN                                                    */}
        {/* ========================================================================= */}
        {mode === 'signin' && (
          <form onSubmit={handleSignIn} className="space-y-3.5 animate-in fade-in duration-200">
            {/* 1-Tap Fast Demo Student Button (Super handy for user & reviews) */}
            <button
              type="button"
              onClick={handleDemoLogin}
              className={`w-full py-2.5 px-3.5 rounded-xl border flex items-center justify-between text-xs font-semibold cursor-pointer transition-all active:scale-[0.99] ${
                isDayMode
                  ? 'bg-emerald-50/70 border-emerald-300 text-emerald-900 hover:bg-emerald-100/70'
                  : 'bg-emerald-950/30 border-emerald-800/60 text-emerald-300 hover:bg-emerald-950/50'
              }`}
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-500" />
                <span>دخول سريع تجريبي (طالب جامعي)</span>
              </div>
              <span className="text-[11px] underline opacity-90">دخول فوري ⚡</span>
            </button>

            {/* University Email / ID Input */}
            <div className="space-y-1">
              <label
                className={`text-[12px] font-semibold block text-right ${
                  isDayMode ? 'text-[#2D4537]' : 'text-[#B6BBB7]'
                }`}
              >
                البريد الجامعي أو الرقم الأكاديمي
              </label>
              <div
                className={`flex items-center rounded-2xl border px-3.5 py-2.5 transition-all ${
                  isDayMode
                    ? 'bg-white border-[#CFDCD4] focus-within:border-[#183626] shadow-xs'
                    : 'bg-[#141816] border-[#262D29] focus-within:border-[#4B5E52]'
                }`}
              >
                <Mail
                  className={`w-4 h-4 shrink-0 ml-2.5 ${
                    isDayMode ? 'text-[#567563]' : 'text-[#747B77]'
                  }`}
                />
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="442019876@student.ksu.edu.sa"
                  dir="ltr"
                  className={`w-full bg-transparent text-[13px] focus:outline-none text-left font-mono ${
                    isDayMode ? 'text-[#0E2116]' : 'text-[#F1EDE5]'
                  }`}
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setMode('forgot')}
                  className={`text-[11px] font-medium transition-colors cursor-pointer ${
                    isDayMode ? 'text-[#3E604F] hover:underline' : 'text-[#A0A7A2] hover:text-[#F1EDE5]'
                  }`}
                >
                  نسيت كلمة المرور؟
                </button>
                <label
                  className={`text-[12px] font-semibold ${
                    isDayMode ? 'text-[#2D4537]' : 'text-[#B6BBB7]'
                  }`}
                >
                  كلمة المرور
                </label>
              </div>

              <div
                className={`flex items-center rounded-2xl border px-3.5 py-2.5 transition-all ${
                  isDayMode
                    ? 'bg-white border-[#CFDCD4] focus-within:border-[#183626] shadow-xs'
                    : 'bg-[#141816] border-[#262D29] focus-within:border-[#4B5E52]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`shrink-0 ml-2 cursor-pointer ${
                    isDayMode ? 'text-[#567563]' : 'text-[#747B77]'
                  }`}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>

                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  dir="ltr"
                  className={`w-full bg-transparent text-[13px] focus:outline-none text-left font-mono ${
                    isDayMode ? 'text-[#0E2116]' : 'text-[#F1EDE5]'
                  }`}
                  required
                />

                <Lock
                  className={`w-4 h-4 shrink-0 mr-2 ${
                    isDayMode ? 'text-[#567563]' : 'text-[#747B77]'
                  }`}
                />
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-[#183626] focus:ring-0 cursor-pointer w-3.5 h-3.5"
                />
                <span className={isDayMode ? 'text-[#3E604F]' : 'text-[#A0A7A2]'}>
                  تذكر بياناتي على هذا الجهاز
                </span>
              </label>
            </div>

            {/* Primary Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full h-[50px] sm:h-[52px] rounded-full font-bold text-[15px] sm:text-[16px] flex items-center justify-center gap-2 relative active:scale-[0.98] transition-all cursor-pointer shadow-md ${
                isDayMode
                  ? 'bg-[#183626] text-white hover:bg-[#122A1E]'
                  : 'bg-[#F1EDE5] text-[#0E100F] hover:bg-white'
              }`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>تسجيل الدخول</span>
                  <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
                </>
              )}
            </button>

            {/* Divider */}
            <div className="relative flex py-1 items-center">
              <div
                className={`flex-grow border-t ${
                  isDayMode ? 'border-[#D4E0D8]' : 'border-[#222724]'
                }`}
              />
              <span
                className={`shrink mx-3 text-[11px] font-sans ${
                  isDayMode ? 'text-[#5A7968]' : 'text-[#747B77]'
                }`}
              >
                أو الدخول عبر
              </span>
              <div
                className={`flex-grow border-t ${
                  isDayMode ? 'border-[#D4E0D8]' : 'border-[#222724]'
                }`}
              />
            </div>

            {/* University SSO & Social Buttons */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => handleSsoLogin('بوابة الجامعة')}
                className={`w-full py-2.5 px-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-semibold transition-all cursor-pointer active:scale-[0.99] ${
                  isDayMode
                    ? 'bg-white border-[#CFDCD4] text-[#163825] hover:bg-[#EBF2EC]'
                    : 'bg-[#151917] border-[#272E29] text-[#E0E5E2] hover:bg-[#1E2521]'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>الدخول عبر النفاذ الوطني الموحد / SSO الجامعي</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleSsoLogin('Google')}
                  className={`py-2 px-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-medium cursor-pointer transition-all ${
                    isDayMode
                      ? 'bg-white border-[#CFDCD4] text-[#294B37] hover:bg-gray-50'
                      : 'bg-[#151917] border-[#272E29] text-[#B6BBB7] hover:bg-[#1E2521]'
                  }`}
                >
                  <span className="font-bold text-red-500">G</span>
                  <span>حساب Google</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSsoLogin('Apple')}
                  className={`py-2 px-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-medium cursor-pointer transition-all ${
                    isDayMode
                      ? 'bg-white border-[#CFDCD4] text-[#294B37] hover:bg-gray-50'
                      : 'bg-[#151917] border-[#272E29] text-[#B6BBB7] hover:bg-[#1E2521]'
                  }`}
                >
                  <span className="font-bold"></span>
                  <span>حساب Apple</span>
                </button>
              </div>
            </div>
          </form>
        )}

        {/* ========================================================================= */}
        {/* SUB-JOURNEY 2: SIGN UP (CREATE ACCOUNT)                                   */}
        {/* ========================================================================= */}
        {mode === 'signup' && (
          <form onSubmit={handleSignUp} className="space-y-3 animate-in fade-in duration-200">
            {/* Full Name */}
            <div className="space-y-1">
              <label
                className={`text-[12px] font-semibold block text-right ${
                  isDayMode ? 'text-[#2D4537]' : 'text-[#B6BBB7]'
                }`}
              >
                الاسم الكامل
              </label>
              <div
                className={`flex items-center rounded-2xl border px-3.5 py-2.5 ${
                  isDayMode ? 'bg-white border-[#CFDCD4]' : 'bg-[#141816] border-[#262D29]'
                }`}
              >
                <User
                  className={`w-4 h-4 shrink-0 ml-2.5 ${
                    isDayMode ? 'text-[#567563]' : 'text-[#747B77]'
                  }`}
                />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="محمد بن فهد"
                  className={`w-full bg-transparent text-[13px] focus:outline-none text-right ${
                    isDayMode ? 'text-[#0E2116]' : 'text-[#F1EDE5]'
                  }`}
                  required
                />
              </div>
            </div>

            {/* University Selection */}
            <div className="space-y-1">
              <label
                className={`text-[12px] font-semibold block text-right ${
                  isDayMode ? 'text-[#2D4537]' : 'text-[#B6BBB7]'
                }`}
              >
                الجامعة
              </label>
              <div
                className={`flex items-center rounded-2xl border px-3 py-2 ${
                  isDayMode ? 'bg-white border-[#CFDCD4]' : 'bg-[#141816] border-[#262D29]'
                }`}
              >
                <Building
                  className={`w-4 h-4 shrink-0 ml-2.5 ${
                    isDayMode ? 'text-[#567563]' : 'text-[#747B77]'
                  }`}
                />
                <select
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  className={`w-full bg-transparent text-[12.5px] focus:outline-none text-right cursor-pointer ${
                    isDayMode ? 'text-[#0E2116]' : 'text-[#F1EDE5]'
                  }`}
                >
                  <option value="جامعة الملك سعود (KSU)" className={isDayMode ? 'text-black' : 'bg-[#141816] text-white'}>
                    جامعة الملك سعود (KSU)
                  </option>
                  <option value="جامعة الإمام محمد بن سعود" className={isDayMode ? 'text-black' : 'bg-[#141816] text-white'}>
                    جامعة الإمام محمد بن سعود
                  </option>
                  <option value="جامعة الملك عبدالعزيز (KAU)" className={isDayMode ? 'text-black' : 'bg-[#141816] text-white'}>
                    جامعة الملك عبدالعزيز (KAU)
                  </option>
                  <option value="جامعة الملك فهد للبترول والمعادن (KFUPM)" className={isDayMode ? 'text-black' : 'bg-[#141816] text-white'}>
                    جامعة الملك فهد للبترول والمعادن (KFUPM)
                  </option>
                  <option value="جامعة الأميرة نورة (PNU)" className={isDayMode ? 'text-black' : 'bg-[#141816] text-white'}>
                    جامعة الأميرة نورة (PNU)
                  </option>
                  <option value="جامعة الملك فيصل" className={isDayMode ? 'text-black' : 'bg-[#141816] text-white'}>
                    جامعة الملك فيصل
                  </option>
                  <option value="جامعة أخرى" className={isDayMode ? 'text-black' : 'bg-[#141816] text-white'}>
                    جامعة أخرى
                  </option>
                </select>
              </div>
            </div>

            {/* Major / College */}
            <div className="space-y-1">
              <label
                className={`text-[12px] font-semibold block text-right ${
                  isDayMode ? 'text-[#2D4537]' : 'text-[#B6BBB7]'
                }`}
              >
                الكلية والتخصص
              </label>
              <div
                className={`flex items-center rounded-2xl border px-3 py-2 ${
                  isDayMode ? 'bg-white border-[#CFDCD4]' : 'bg-[#141816] border-[#262D29]'
                }`}
              >
                <GraduationCap
                  className={`w-4 h-4 shrink-0 ml-2.5 ${
                    isDayMode ? 'text-[#567563]' : 'text-[#747B77]'
                  }`}
                />
                <select
                  value={majorName}
                  onChange={(e) => setMajorName(e.target.value)}
                  className={`w-full bg-transparent text-[12.5px] focus:outline-none text-right cursor-pointer ${
                    isDayMode ? 'text-[#0E2116]' : 'text-[#F1EDE5]'
                  }`}
                >
                  <option value="علوم الحاسب (CS)" className={isDayMode ? 'text-black' : 'bg-[#141816] text-white'}>
                    علوم الحاسب (CS)
                  </option>
                  <option value="نظم المعلومات (IS)" className={isDayMode ? 'text-black' : 'bg-[#141816] text-white'}>
                    نظم المعلومات (IS)
                  </option>
                  <option value="تقنية المعلومات والشبكات" className={isDayMode ? 'text-black' : 'bg-[#141816] text-white'}>
                    تقنية المعلومات والشبكات
                  </option>
                  <option value="إدارة الأعمال والتسويق" className={isDayMode ? 'text-black' : 'bg-[#141816] text-white'}>
                    إدارة الأعمال والتسويق
                  </option>
                  <option value="الهندسة" className={isDayMode ? 'text-black' : 'bg-[#141816] text-white'}>
                    الهندسة
                  </option>
                  <option value="العلوم الصحية والطبية" className={isDayMode ? 'text-black' : 'bg-[#141816] text-white'}>
                    العلوم الصحية والطبية
                  </option>
                </select>
              </div>
            </div>

            {/* Email or Phone */}
            <div className="space-y-1">
              <label
                className={`text-[12px] font-semibold block text-right ${
                  isDayMode ? 'text-[#2D4537]' : 'text-[#B6BBB7]'
                }`}
              >
                البريد الجامعي أو الجوال
              </label>
              <div
                className={`flex items-center rounded-2xl border px-3.5 py-2.5 ${
                  isDayMode ? 'bg-white border-[#CFDCD4]' : 'bg-[#141816] border-[#262D29]'
                }`}
              >
                <Mail
                  className={`w-4 h-4 shrink-0 ml-2.5 ${
                    isDayMode ? 'text-[#567563]' : 'text-[#747B77]'
                  }`}
                />
                <input
                  type="text"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  placeholder="student@university.edu.sa"
                  dir="ltr"
                  className={`w-full bg-transparent text-[13px] focus:outline-none text-left font-mono ${
                    isDayMode ? 'text-[#0E2116]' : 'text-[#F1EDE5]'
                  }`}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label
                className={`text-[12px] font-semibold block text-right ${
                  isDayMode ? 'text-[#2D4537]' : 'text-[#B6BBB7]'
                }`}
              >
                كلمة المرور
              </label>
              <div
                className={`flex items-center rounded-2xl border px-3.5 py-2.5 ${
                  isDayMode ? 'bg-white border-[#CFDCD4]' : 'bg-[#141816] border-[#262D29]'
                }`}
              >
                <Lock
                  className={`w-4 h-4 shrink-0 ml-2.5 ${
                    isDayMode ? 'text-[#567563]' : 'text-[#747B77]'
                  }`}
                />
                <input
                  type="password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  placeholder="كلمة مرور قوية"
                  dir="ltr"
                  className={`w-full bg-transparent text-[13px] focus:outline-none text-left font-mono ${
                    isDayMode ? 'text-[#0E2116]' : 'text-[#F1EDE5]'
                  }`}
                />
              </div>
            </div>

            {/* Submit Sign Up Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full h-[50px] sm:h-[52px] rounded-full font-bold text-[15px] sm:text-[16px] flex items-center justify-center gap-2 relative active:scale-[0.98] transition-all cursor-pointer shadow-md mt-2 ${
                isDayMode
                  ? 'bg-[#183626] text-white hover:bg-[#122A1E]'
                  : 'bg-[#F1EDE5] text-[#0E100F] hover:bg-white'
              }`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>إنشاء الحساب وبدء التجربة</span>
                  <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
                </>
              )}
            </button>
          </form>
        )}

        {/* ========================================================================= */}
        {/* SUB-JOURNEY 3: FAST OTP PHONE LOGIN                                       */}
        {/* ========================================================================= */}
        {mode === 'otp' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {!otpSent ? (
              <div className="space-y-3">
                <div className="space-y-1">
                  <label
                    className={`text-[12px] font-semibold block text-right ${
                      isDayMode ? 'text-[#2D4537]' : 'text-[#B6BBB7]'
                    }`}
                  >
                    رقم الجوال
                  </label>
                  <div
                    className={`flex items-center rounded-2xl border px-3.5 py-2.5 ${
                      isDayMode ? 'bg-white border-[#CFDCD4]' : 'bg-[#141816] border-[#262D29]'
                    }`}
                  >
                    <span
                      className={`text-xs font-mono font-bold ml-2 pl-2 border-l ${
                        isDayMode ? 'border-gray-200 text-gray-500' : 'border-gray-700 text-gray-400'
                      }`}
                      dir="ltr"
                    >
                      +966
                    </span>
                    <Smartphone
                      className={`w-4 h-4 shrink-0 ml-2.5 ${
                        isDayMode ? 'text-[#567563]' : 'text-[#747B77]'
                      }`}
                    />
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="05XXXXXXXX"
                      dir="ltr"
                      className={`w-full bg-transparent text-[14px] focus:outline-none text-left font-mono ${
                        isDayMode ? 'text-[#0E2116]' : 'text-[#F1EDE5]'
                      }`}
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setOtpSent(true)}
                  className={`w-full h-[50px] rounded-full font-bold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                    isDayMode ? 'bg-[#183626] text-white' : 'bg-[#F1EDE5] text-[#0E100F]'
                  }`}
                >
                  <span>إرسال رمز التحقق</span>
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-center">
                  <span className={`text-xs ${isDayMode ? 'text-[#3E604F]' : 'text-[#A0A7A2]'}`}>
                    تم إرسال رمز التحقق إلى <span dir="ltr" className="font-mono font-bold">{phoneNumber}</span>
                  </span>
                  <button
                    onClick={() => setOtpSent(false)}
                    className="text-[11px] block mx-auto mt-1 text-emerald-600 underline cursor-pointer"
                  >
                    تغيير الرقم
                  </button>
                </div>

                {/* 4 Pin Boxes */}
                <div className="flex items-center justify-center gap-3 py-2" dir="ltr">
                  {[0, 1, 2, 3].map((idx) => (
                    <input
                      key={idx}
                      id={`otp-input-${idx}`}
                      type="text"
                      maxLength={1}
                      value={otpDigits[idx]}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      className={`w-12 h-14 rounded-2xl border text-center font-mono text-xl font-bold focus:outline-none transition-all ${
                        isDayMode
                          ? 'bg-white border-[#CFDCD4] focus:border-[#183626] text-[#0E2116] shadow-xs'
                          : 'bg-[#141816] border-[#2A312D] focus:border-[#526D5E] text-white'
                      }`}
                    />
                  ))}
                </div>

                {/* Timer & Resend */}
                <div className="text-center text-xs">
                  <span className={isDayMode ? 'text-[#567563]' : 'text-[#747B77]'}>
                    إعادة إرسال الرمز خلال{' '}
                    <span className="font-mono font-bold text-emerald-600">00:{timer < 10 ? `0${timer}` : timer}</span>
                  </span>
                </div>

                {/* Confirm OTP Button */}
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  disabled={isLoading}
                  className={`w-full h-[50px] rounded-full font-bold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                    isDayMode ? 'bg-[#183626] text-white' : 'bg-[#F1EDE5] text-[#0E100F]'
                  }`}
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>تأكيد وتسجيل الدخول</span>
                      <CheckCircle2 className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* SUB-JOURNEY 4: FORGOT PASSWORD                                            */}
        {/* ========================================================================= */}
        {mode === 'forgot' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <button
              onClick={() => setMode('signin')}
              className={`flex items-center gap-1.5 text-xs font-semibold cursor-pointer mb-2 ${
                isDayMode ? 'text-[#3E604F]' : 'text-[#A0A7A2]'
              }`}
            >
              <ArrowRight className="w-4 h-4" />
              <span>العودة لتسجيل الدخول</span>
            </button>

            {!forgotSent ? (
              <div className="space-y-3">
                <div className="space-y-1">
                  <label
                    className={`text-[12px] font-semibold block text-right ${
                      isDayMode ? 'text-[#2D4537]' : 'text-[#B6BBB7]'
                    }`}
                  >
                    البريد الإلكتروني الجامعي أو الجوال
                  </label>
                  <div
                    className={`flex items-center rounded-2xl border px-3.5 py-2.5 ${
                      isDayMode ? 'bg-white border-[#CFDCD4]' : 'bg-[#141816] border-[#262D29]'
                    }`}
                  >
                    <Mail
                      className={`w-4 h-4 shrink-0 ml-2.5 ${
                        isDayMode ? 'text-[#567563]' : 'text-[#747B77]'
                      }`}
                    />
                    <input
                      type="text"
                      value={forgotInput}
                      onChange={(e) => setForgotInput(e.target.value)}
                      placeholder="student@ksu.edu.sa"
                      dir="ltr"
                      className={`w-full bg-transparent text-[13px] focus:outline-none text-left font-mono ${
                        isDayMode ? 'text-[#0E2116]' : 'text-[#F1EDE5]'
                      }`}
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setForgotSent(true)}
                  className={`w-full h-[50px] rounded-full font-bold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                    isDayMode ? 'bg-[#183626] text-white' : 'bg-[#F1EDE5] text-[#0E100F]'
                  }`}
                >
                  <span>إرسال رابط استعادة المرور</span>
                  <KeyRound className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div
                className={`p-4 rounded-2xl border text-center space-y-2 ${
                  isDayMode ? 'bg-emerald-50/80 border-emerald-200' : 'bg-emerald-950/20 border-emerald-800'
                }`}
              >
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
                <h3 className="text-sm font-bold text-emerald-600">تم إرسال الرابط بنجاح!</h3>
                <p className="text-xs text-emerald-800/80 dark:text-emerald-300/80">
                  تفقد صندوق الوارد أو رسائل SMS لإكمال تعيين كلمة المرور الجديدة.
                </p>
                <button
                  onClick={() => setMode('signin')}
                  className="mt-2 text-xs font-bold underline cursor-pointer text-emerald-700 dark:text-emerald-300"
                >
                  الرجوع لتسجيل الدخول
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer Notice: Privacy & Security */}
      <div
        className={`w-full py-2 px-5 text-center shrink-0 border-t ${
          isDayMode ? 'border-[#D4E0D8] bg-[#F2F6F3]/80' : 'border-[#1C221F] bg-[#0E100F]/80'
        } backdrop-blur-md`}
      >
        <span className={`text-[10px] leading-tight block ${isDayMode ? 'text-[#567563]' : 'text-[#747B77]'}`}>
          بتسجيلك أنت توافق على شروط الاستخدام وسياسة الخصوصية الأكاديمية لسكرول إت 🔒
        </span>
      </div>
    </div>
  );
};
