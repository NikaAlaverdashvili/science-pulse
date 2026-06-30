export interface QuizAnswer {
  id: string;
  textKa: string;
  textEn: string;
}

export interface QuizQuestion {
  id: string;
  textKa: string;
  textEn: string;
  answers: QuizAnswer[];
  correctAnswerId: string;
}

export interface QuizResult {
  minScore: number;
  maxScore: number;
  messageKa: string;
  messageEn: string;
}

export interface Quiz {
  id: string;
  image?: string;
  titleKa: string;
  titleEn: string;
  descriptionKa: string;
  descriptionEn: string;
  questions: QuizQuestion[];
  results: QuizResult[];
  authorId: string;
  authorName: string;
  createdAt: string;
}
