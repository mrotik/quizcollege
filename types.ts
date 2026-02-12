
export enum Category {
  HTML = 'HTML',
  CSS = 'CSS',
  SECURITY = 'SECURITY',
  JAVASCRIPT = 'JAVASCRIPT'
}

export interface Question {
  id: number;
  category: Category;
  question: string;
  correctAnswer: string;
  options: string[];
}

export interface QuizState {
  currentCategory: Category | null;
  currentQuestionIndex: number;
  score: number;
  userAnswers: { questionId: number; answer: string; isCorrect: boolean }[];
  status: 'idle' | 'playing' | 'finished';
}
