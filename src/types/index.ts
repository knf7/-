export type Major = {
  id: string;
  name: string;
};

export type Course = {
  id: string;
  code: string;
  name: string;
  majorId: string;
  description?: string;
  totalSlides?: number;
  filesCount?: number;
};

export type Concept = {
  id: string;
  courseId: string;
  title: string;
  shortExplanation: string;
  example?: string;
  sourceLabel: string;
  sourceSlide: string;
  sourceFile: string;
  mediaFile: string;
  mediaPoster?: string;
  contentType?: 'concept' | 'reinforcement' | 'example';
  seen: boolean;
  saved: boolean;
  reviewEligible: boolean;
  reviewed: boolean;
  needsReinforcement: boolean;
  mastered: boolean;
  isReinforcementOf?: string;
  reinforcementConceptId?: string;
  qaList?: { question: string; answer: string }[];
};

export type Flashcard = {
  id: string;
  conceptId: string;
  front: string;
  back: string;
  sourceSlide: string;
};

export type QuizQuestion = {
  id: string;
  conceptId: string;
  context?: string;
  question: string;
  options: {
    id: number;
    text: string;
  }[];
  correctAnswerId: number;
  correctExplanation: string;
  wrongExplanation: string;
};

export type TabType = 'feed' | 'courses' | 'create' | 'review' | 'profile';

export type UserProfile = {
  id: string;
  name: string;
  emailOrPhone: string;
  university: string;
  collegeOrMajor: string;
  avatarLetter: string;
  isLoggedIn: boolean;
};

export type AppState = {
  onboardingCompleted: boolean;
  selectedMajor: string;
  selectedCourses: string[];
  activeTab: TabType;
  feedConcepts: Concept[];
  activeReelIndex: number;
  seenConceptIds: string[];
  reviewEligibleConceptIds: string[];
  savedConceptIds: string[];
  quizAnswers: Record<string, number>; // questionId -> chosen answer
  needsReinforcementIds: string[];
  masteredConceptIds: string[];
  flashcardRatings: Record<string, 'reviewed' | 'needsReinforcement'>;
  uploadedMockFiles: { name: string; courseCode: string; date: string }[];
};
