import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Concept, TabType, QuizQuestion, Flashcard, UserProfile } from './types';
import { INITIAL_CONCEPTS, REINFORCEMENT_CONCEPTS, QUIZ_QUESTIONS, FLASHCARDS } from './data/concepts';
import { Onboarding } from './components/Onboarding';
import { Feed } from './components/Feed';
import { BottomNav } from './components/BottomNav';
import { ReviewHome } from './components/ReviewHome';
import { Quiz } from './components/Quiz';
import { Flashcards } from './components/Flashcards';
import { Courses } from './components/Courses';
import { Profile } from './components/Profile';
import { CreateSheet } from './components/CreateSheet';
import { AskSheet } from './components/AskSheet';
import { SourceSheet } from './components/SourceSheet';
import { MoreSheet } from './components/MoreSheet';
import { CustomizeInterestsModal } from './components/CustomizeInterestsModal';

const STORAGE_KEY = 'scroll_it_state_v2';

export function App() {
  // Persistent or default state
  const [onboardingCompleted, setOnboardingCompleted] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved).onboardingCompleted ?? false : false;
    } catch {
      return false;
    }
  });

  // Current logged in student profile (Prototype student)
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('scroll_it_user');
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      id: 'student_1',
      name: 'سلطان القحطاني',
      emailOrPhone: 'sultan.q@student.ksu.edu.sa',
      university: 'جامعة الملك سعود (KSU)',
      collegeOrMajor: 'علوم الحاسب والذكاء الاصطناعي',
      avatarLetter: 'س',
      isLoggedIn: true,
    };
  });

  const [isDayMode, setIsDayMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('scroll_it_day_mode');
      if (saved !== null) {
        return JSON.parse(saved);
      }
    } catch {}
    return false;
  });

  const handleToggleDayMode = useCallback(() => {
    setIsDayMode((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('scroll_it_day_mode', JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const [selectedMajor, setSelectedMajor] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.selectedMajor || 'cs';
      }
    } catch {}
    return 'cs';
  });

  const [selectedCourses, setSelectedCourses] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.selectedCourses || ['is-321'];
      }
    } catch {}
    return ['is-321'];
  });

  const [activeTab, setActiveTab] = useState<TabType>('feed');
  const [activeReelIndex, setActiveReelIndex] = useState<number>(0);

  const [seenConceptIds, setSeenConceptIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.seenConceptIds || [];
      }
    } catch {}
    return [];
  });

  const [savedConceptIds, setSavedConceptIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.savedConceptIds || [];
      }
    } catch {}
    return [];
  });

  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.quizAnswers || {};
      }
    } catch {}
    return {};
  });

  const [needsReinforcementIds, setNeedsReinforcementIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.needsReinforcementIds || [];
      }
    } catch {}
    return [];
  });

  const [masteredConceptIds, setMasteredConceptIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.masteredConceptIds || [];
      }
    } catch {}
    return [];
  });

  const [flashcardRatings, setFlashcardRatings] = useState<Record<string, 'reviewed' | 'needsReinforcement'>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.flashcardRatings || {};
      }
    } catch {}
    return {};
  });

  const [uploadedMockFiles, setUploadedMockFiles] = useState<Array<{ name: string; courseCode: string; date: string }>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.uploadedMockFiles || [
          { name: 'Normalization.pdf', courseCode: 'IS-321', date: 'أمس' }
        ];
      }
    } catch {}
    return [
      { name: 'Normalization.pdf', courseCode: 'IS-321', date: 'أمس' }
    ];
  });

  // Dynamic feed concepts (contains initial reels, plus dynamically inserted reinforcement reels)
  const [feedConcepts, setFeedConcepts] = useState<Concept[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.feedConcepts && parsed.feedConcepts.length > 0) {
          return parsed.feedConcepts;
        }
      }
    } catch {}
    return INITIAL_CONCEPTS;
  });

  // Sub-screens & Sheets
  const [isQuizActive, setIsQuizActive] = useState<boolean>(false);
  const [isFlashcardsActive, setIsFlashcardsActive] = useState<boolean>(false);
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
  const [isCustomizeInterestsOpen, setIsCustomizeInterestsOpen] = useState<boolean>(false);
  const [askTargetConcept, setAskTargetConcept] = useState<Concept | null>(null);
  const [sourceTargetConcept, setSourceTargetConcept] = useState<Concept | null>(null);
  const [moreTargetConcept, setMoreTargetConcept] = useState<Concept | null>(null);

  // Synchronize seen status with feed concepts
  const activeFeedConcepts = useMemo(() => {
    return feedConcepts.map((concept) => ({
      ...concept,
      seen: seenConceptIds.includes(concept.id),
      saved: savedConceptIds.includes(concept.id),
      needsReinforcement: needsReinforcementIds.includes(concept.id),
      mastered: masteredConceptIds.includes(concept.id),
    }));
  }, [feedConcepts, seenConceptIds, savedConceptIds, needsReinforcementIds, masteredConceptIds]);

  // Persist state to localStorage
  useEffect(() => {
    try {
      const stateToSave = {
        onboardingCompleted,
        selectedMajor,
        selectedCourses,
        seenConceptIds,
        savedConceptIds,
        quizAnswers,
        needsReinforcementIds,
        masteredConceptIds,
        flashcardRatings,
        uploadedMockFiles,
        feedConcepts,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (e) {
      console.error('Failed to save state to localStorage', e);
    }
  }, [
    onboardingCompleted,
    selectedMajor,
    selectedCourses,
    seenConceptIds,
    savedConceptIds,
    quizAnswers,
    needsReinforcementIds,
    masteredConceptIds,
    flashcardRatings,
    uploadedMockFiles,
    feedConcepts,
  ]);

  // Mark a concept as seen (called after 1.2s active viewing of Reel)
  const handleMarkSeen = useCallback((conceptId: string) => {
    setSeenConceptIds((prev) => {
      if (!prev.includes(conceptId)) {
        return [...prev, conceptId];
      }
      return prev;
    });
  }, []);

  // Toggle bookmark / save
  const handleToggleSave = useCallback((conceptId: string) => {
    setSavedConceptIds((prev) => {
      if (prev.includes(conceptId)) {
        return prev.filter((id) => id !== conceptId);
      } else {
        return [...prev, conceptId];
      }
    });
  }, []);

  // Adaptive Reinforcement Logic:
  // When a concept needs reinforcement (e.g. 2nf wrong answer), inject 2nf-simple naturally
  const insertReinforcementConcept = useCallback((weakConceptId: string) => {
    const parentConcept = INITIAL_CONCEPTS.find((c) => c.id === weakConceptId);
    const reinforcementId = parentConcept?.reinforcementConceptId || `${weakConceptId}-simple`;
    const reinforcementData = REINFORCEMENT_CONCEPTS[reinforcementId];

    if (!reinforcementData) return;

    setFeedConcepts((prev) => {
      // Don't add duplicate if already present
      if (prev.some((c) => c.id === reinforcementData.id)) {
        return prev;
      }
      // Insert naturally into the next slot in the feed
      const insertAt = Math.min(activeReelIndex + 1, prev.length);
      const nextFeed = [...prev];
      nextFeed.splice(insertAt, 0, reinforcementData);
      return nextFeed;
    });
  }, [activeReelIndex]);

  // Handle Quiz completion
  const handleQuizComplete = useCallback(
    (answers: Record<string, number>, wrongConceptIds: string[]) => {
      setQuizAnswers((prev) => ({ ...prev, ...answers }));

      if (wrongConceptIds.length > 0) {
        setNeedsReinforcementIds((prev) => {
          const updated = [...prev];
          wrongConceptIds.forEach((id) => {
            if (!updated.includes(id)) updated.push(id);
          });
          return updated;
        });

        // Insert reinforcement reel for each weak concept (like 2nf)
        wrongConceptIds.forEach((id) => {
          insertReinforcementConcept(id);
        });

        // Focus on the newly inserted reinforcement reel
        setActiveReelIndex((prev) => Math.min(prev + 1, feedConcepts.length));
      }

      setIsQuizActive(false);
      setActiveTab('feed');
    },
    [insertReinforcementConcept]
  );

  // Handle Flashcards rating
  const handleFlashcardComplete = useCallback(
    (ratings: Record<string, 'reviewed' | 'needsReinforcement'>) => {
      setFlashcardRatings((prev) => ({ ...prev, ...ratings }));

      const wrong = Object.keys(ratings).filter((k) => ratings[k] === 'needsReinforcement');
      if (wrong.length > 0) {
        setNeedsReinforcementIds((prev) => {
          const updated = [...prev];
          wrong.forEach((id) => {
            if (!updated.includes(id)) updated.push(id);
          });
          return updated;
        });
        wrong.forEach((id) => insertReinforcementConcept(id));
      }

      setIsFlashcardsActive(false);
      setActiveTab('review');
    },
    [insertReinforcementConcept]
  );

  // Reset Demo action
  const handleResetDemo = () => {
    localStorage.removeItem(STORAGE_KEY);
    setOnboardingCompleted(false);
    setSelectedMajor('cs');
    setSelectedCourses(['is-321']);
    setActiveTab('feed');
    setActiveReelIndex(0);
    setSeenConceptIds([]);
    setSavedConceptIds([]);
    setQuizAnswers({});
    setNeedsReinforcementIds([]);
    setMasteredConceptIds([]);
    setFlashcardRatings({});
    setUploadedMockFiles([
      { name: 'Normalization.pdf', courseCode: 'IS-321', date: 'أمس' }
    ]);
    setFeedConcepts(INITIAL_CONCEPTS);
    setIsQuizActive(false);
    setIsFlashcardsActive(false);
  };

  // Concepts seen so far
  const seenConceptsList = useMemo(() => {
    return activeFeedConcepts.filter((c) => seenConceptIds.includes(c.id));
  }, [activeFeedConcepts, seenConceptIds]);

  // Quiz questions filtered ONLY by concepts that have been seen
  const eligibleQuizQuestions = useMemo(() => {
    return QUIZ_QUESTIONS.filter((q) => seenConceptIds.includes(q.conceptId));
  }, [seenConceptIds]);

  // Flashcards filtered ONLY by concepts that have been seen
  const eligibleFlashcards = useMemo(() => {
    return FLASHCARDS.filter((f) => seenConceptIds.includes(f.conceptId));
  }, [seenConceptIds]);

  // Saved concepts list
  const savedConceptsList = useMemo(() => {
    return activeFeedConcepts.filter((c) => savedConceptIds.includes(c.id));
  }, [activeFeedConcepts, savedConceptIds]);

  // Onboarding completion
  const handleOnboardingComplete = (major: string, courses: string[]) => {
    setSelectedMajor(major);
    setSelectedCourses(courses);
    setOnboardingCompleted(true);
    setActiveTab('feed');
  };

  // Save customized interests
  const handleSaveCustomizedInterests = (major: string, courses: string[]) => {
    setSelectedMajor(major);
    setSelectedCourses(courses);
    setIsCustomizeInterestsOpen(false);
  };

  // Navigation handlers
  const handleTabSelect = (tab: TabType) => {
    if (tab === 'create') {
      setIsCreateOpen(true);
    } else {
      setIsQuizActive(false);
      setIsFlashcardsActive(false);
      setActiveTab(tab);
    }
  };

  const isCurrentScreenDayMode = isDayMode && onboardingCompleted;

  return (
    <div className={`w-full min-h-[100dvh] flex items-center justify-center p-0 md:py-6 overflow-x-hidden font-sans transition-colors duration-500 ${
      isCurrentScreenDayMode ? 'bg-[#E3EBE5]' : 'bg-[#0E100F]'
    }`}>
      {/* Centered Mobile Device Frame (393px × 852px) */}
      <div className={`w-full max-w-[420px] md:w-[393px] md:h-[852px] h-[100dvh] md:rounded-[44px] overflow-hidden relative flex flex-col transition-all duration-500 ${
        isCurrentScreenDayMode 
          ? 'bg-[#F2F6F3] md:border md:border-[#CFDCD4] md:shadow-[0_25px_60px_-15px_rgba(25,48,35,0.2)]' 
          : 'bg-[#0E100F] md:border md:border-[#262D29] md:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]'
      }`}>
        
        {!onboardingCompleted ? (
          /* 1. Onboarding Flow if not completed */
          <Onboarding
            onComplete={handleOnboardingComplete}
            isDayMode={isDayMode}
          />
        ) : isQuizActive ? (
          /* 2. Active Quiz Screen */
          <Quiz
            questions={eligibleQuizQuestions.length > 0 ? eligibleQuizQuestions : QUIZ_QUESTIONS.slice(0, 1)}
            isDayMode={isDayMode}
            onComplete={handleQuizComplete}
            onExit={() => setIsQuizActive(false)}
          />
        ) : isFlashcardsActive ? (
          /* 3. Active Flashcards Screen */
          <Flashcards
            cards={eligibleFlashcards}
            isDayMode={isDayMode}
            onComplete={handleFlashcardComplete}
            onExit={() => setIsFlashcardsActive(false)}
          />
        ) : (
          /* 4. Main Tab Content */
          <div className="relative w-full h-full flex flex-col flex-1 min-h-0 overflow-hidden">
            {activeTab === 'feed' && (
              <Feed
                concepts={activeFeedConcepts}
                activeReelIndex={activeReelIndex}
                setActiveReelIndex={setActiveReelIndex}
                savedConceptIds={savedConceptIds}
                isDayMode={isDayMode}
                onToggleDayMode={handleToggleDayMode}
                onMarkSeen={handleMarkSeen}
                onToggleSave={handleToggleSave}
                onOpenAsk={(concept) => setAskTargetConcept(concept)}
                onOpenSource={(concept) => setSourceTargetConcept(concept)}
                onOpenMore={(concept) => setMoreTargetConcept(concept)}
                onOpenCustomizeInterests={() => setIsCustomizeInterestsOpen(true)}
              />
            )}

            {activeTab === 'courses' && (
              <Courses
                selectedCourseIds={selectedCourses}
                seenConceptIds={seenConceptIds}
                allConcepts={activeFeedConcepts}
                isDayMode={isDayMode}
                onOpenFeedForCourse={() => setActiveTab('feed')}
                onOpenAddFiles={() => setIsCreateOpen(true)}
                onOpenCustomizeInterests={() => setIsCustomizeInterestsOpen(true)}
              />
            )}

            {activeTab === 'review' && (
              <ReviewHome
                seenConcepts={seenConceptsList}
                isDayMode={isDayMode}
                onStartQuiz={() => setIsQuizActive(true)}
                onStartFlashcards={() => setIsFlashcardsActive(true)}
                onGoToFeed={() => setActiveTab('feed')}
                onSelectConceptReel={(conceptId) => {
                  const idx = activeFeedConcepts.findIndex((c) => c.id === conceptId);
                  if (idx !== -1) {
                    setActiveReelIndex(idx);
                    setActiveTab('feed');
                  }
                }}
              />
            )}

            {activeTab === 'profile' && (
              <Profile
                savedConcepts={savedConceptsList}
                selectedCourseIds={selectedCourses}
                uploadedFiles={uploadedMockFiles}
                currentUser={currentUser}
                isDayMode={isDayMode}
                onToggleDayMode={handleToggleDayMode}
                onResetDemo={handleResetDemo}
                onOpenOnboarding={() => setOnboardingCompleted(false)}
                onOpenCustomizeInterests={() => setIsCustomizeInterestsOpen(true)}
                onSelectSavedConcept={(conceptId) => {
                  const idx = activeFeedConcepts.findIndex((c) => c.id === conceptId);
                  if (idx !== -1) {
                    setActiveReelIndex(idx);
                    setActiveTab('feed');
                  }
                }}
              />
            )}

            {/* Persistent Bottom Navigation */}
            <BottomNav
              activeTab={activeTab}
              onSelectTab={handleTabSelect}
              reviewCount={seenConceptIds.length}
              isDayMode={isCurrentScreenDayMode}
            />
          </div>
        )}

        {/* Global Bottom Sheets & Modals */}
        <CustomizeInterestsModal
          isOpen={isCustomizeInterestsOpen}
          onClose={() => setIsCustomizeInterestsOpen(false)}
          selectedMajor={selectedMajor}
          selectedCourses={selectedCourses}
          onSave={handleSaveCustomizedInterests}
          isDayMode={isDayMode}
        />

        <CreateSheet
          isOpen={isCreateOpen}
          isDayMode={isDayMode}
          onClose={() => setIsCreateOpen(false)}
          onFileUploaded={(newFile) => {
            setUploadedMockFiles((prev) => [newFile, ...prev]);
          }}
        />

        <AskSheet
          concept={askTargetConcept}
          isOpen={!!askTargetConcept}
          isDayMode={isDayMode}
          onClose={() => setAskTargetConcept(null)}
        />

        <SourceSheet
          concept={sourceTargetConcept}
          isOpen={!!sourceTargetConcept}
          isDayMode={isDayMode}
          onClose={() => setSourceTargetConcept(null)}
        />

        <MoreSheet
          concept={moreTargetConcept}
          isOpen={!!moreTargetConcept}
          isDayMode={isDayMode}
          onClose={() => setMoreTargetConcept(null)}
        />
      </div>
    </div>
  );
}

export default App;
