import { Injectable, signal } from '@angular/core';
import { Quiz } from '../models/quiz.model';

const SEED_QUIZZES: Quiz[] = [
  {
    id: 'quiz-001',
    image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80',
    titleKa: 'კოსმოსის საიდუმლოებები',
    titleEn: 'Mysteries of the Cosmos',
    descriptionKa: 'შეამოწმე შენი ცოდნა სამყაროს, პლანეტების და კოსმოსური კვლევის შესახებ!',
    descriptionEn: 'Test your knowledge about the universe, planets, and space exploration!',
    questions: [
      {
        id: 'q1', textKa: 'რომელი პლანეტა არის ყველაზე დიდი მზის სისტემაში?', textEn: 'Which planet is the largest in our solar system?',
        answers: [
          { id: 'a1', textKa: 'სატურნი', textEn: 'Saturn' },
          { id: 'a2', textKa: 'იუპიტერი', textEn: 'Jupiter' },
          { id: 'a3', textKa: 'ნეპტუნი', textEn: 'Neptune' },
          { id: 'a4', textKa: 'ურანი', textEn: 'Uranus' }
        ],
        correctAnswerId: 'a2'
      },
      {
        id: 'q2', textKa: 'რამდენ სინათლის წელს შორდება ჩვენი ყველაზე ახლო ვარსკვლავი?', textEn: 'How many light-years away is our nearest star (besides the Sun)?',
        answers: [
          { id: 'a1', textKa: '4.2 სინათლის წელი', textEn: '4.2 light-years' },
          { id: 'a2', textKa: '10 სინათლის წელი', textEn: '10 light-years' },
          { id: 'a3', textKa: '100 სინათლის წელი', textEn: '100 light-years' },
          { id: 'a4', textKa: '1 სინათლის წელი', textEn: '1 light-year' }
        ],
        correctAnswerId: 'a1'
      },
      {
        id: 'q3', textKa: 'რომელი ქვეყანა პირველი გაიგზავნა კოსმოსში?', textEn: 'Which country first sent a human to space?',
        answers: [
          { id: 'a1', textKa: 'აშშ', textEn: 'USA' },
          { id: 'a2', textKa: 'სსრკ', textEn: 'USSR' },
          { id: 'a3', textKa: 'ჩინეთი', textEn: 'China' },
          { id: 'a4', textKa: 'გერმანია', textEn: 'Germany' }
        ],
        correctAnswerId: 'a2'
      },
      {
        id: 'q4', textKa: 'რამდენი ვარსკვლავია ირმის ნახტომში?', textEn: 'How many stars are in the Milky Way galaxy?',
        answers: [
          { id: 'a1', textKa: '1 მილიარდი', textEn: '1 billion' },
          { id: 'a2', textKa: '100 მილიარდი', textEn: '100 billion' },
          { id: 'a3', textKa: '1 ტრილიონი', textEn: '1 trillion' },
          { id: 'a4', textKa: '10 მილიარდი', textEn: '10 billion' }
        ],
        correctAnswerId: 'a2'
      },
      {
        id: 'q5', textKa: 'რა არის შავი ხვრელი?', textEn: 'What is a black hole?',
        answers: [
          { id: 'a1', textKa: 'ცარიელი სივრცე', textEn: 'Empty space' },
          { id: 'a2', textKa: 'ვარსკვლავის ნარჩენი', textEn: 'Remnant of a star with intense gravity' },
          { id: 'a3', textKa: 'პლანეტა', textEn: 'A planet' },
          { id: 'a4', textKa: 'ნისლეული', textEn: 'A nebula' }
        ],
        correctAnswerId: 'a2'
      }
    ],
    results: [
      { minScore: 0, maxScore: 1, messageKa: 'კოსმოსი ჯერ კიდევ საიდუმლოა შენთვის! 🌌', messageEn: 'Space is still a mystery to you! Keep exploring! 🌌' },
      { minScore: 2, maxScore: 3, messageKa: 'კარგი დასაწყისი! განაგრძე სწავლა! 🚀', messageEn: 'Good start! Keep learning about the cosmos! 🚀' },
      { minScore: 4, maxScore: 5, messageKa: 'ბრავო! შენ ნამდვილი ასტრონომი ხარ! ⭐', messageEn: 'Excellent! You are a true astronomy expert! ⭐' }
    ],
    authorId: 'admin-001', authorName: 'Nika Alaverdashvili',
    createdAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: 'quiz-002',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&q=80',
    titleKa: 'ტექნოლოგიების სამყარო',
    titleEn: 'World of Technology',
    descriptionKa: 'გამოცადე შენი ტექნოლოგიური ცოდნა ამ საინტერესო ვიქტორინაში!',
    descriptionEn: 'Test your technological knowledge in this exciting quiz!',
    questions: [
      {
        id: 'q1', textKa: 'ვინ შექმნა ინტერნეტი?', textEn: 'Who invented the World Wide Web?',
        answers: [
          { id: 'a1', textKa: 'სტივ ჯობსი', textEn: 'Steve Jobs' },
          { id: 'a2', textKa: 'ბილ გეიტსი', textEn: 'Bill Gates' },
          { id: 'a3', textKa: 'ტიმ ბერნერს-ლი', textEn: 'Tim Berners-Lee' },
          { id: 'a4', textKa: 'ელონ მასკი', textEn: 'Elon Musk' }
        ],
        correctAnswerId: 'a3'
      },
      {
        id: 'q2', textKa: 'რომელ წელს დაარსდა Apple?', textEn: 'In what year was Apple founded?',
        answers: [
          { id: 'a1', textKa: '1974', textEn: '1974' },
          { id: 'a2', textKa: '1976', textEn: '1976' },
          { id: 'a3', textKa: '1980', textEn: '1980' },
          { id: 'a4', textKa: '1985', textEn: '1985' }
        ],
        correctAnswerId: 'a2'
      },
      {
        id: 'q3', textKa: 'რა არის CPU?', textEn: 'What does CPU stand for?',
        answers: [
          { id: 'a1', textKa: 'Central Processing Unit', textEn: 'Central Processing Unit' },
          { id: 'a2', textKa: 'Computer Power Unit', textEn: 'Computer Power Unit' },
          { id: 'a3', textKa: 'Core Processing Universe', textEn: 'Core Processing Universe' },
          { id: 'a4', textKa: 'Central Program Utility', textEn: 'Central Program Utility' }
        ],
        correctAnswerId: 'a1'
      }
    ],
    results: [
      { minScore: 0, maxScore: 1, messageKa: 'ტექნოლოგიების შესწავლა ახლა დაიწყე! 💻', messageEn: 'Start exploring technology now! 💻' },
      { minScore: 2, maxScore: 2, messageKa: 'კარგი! კიდევ ცოტა სწავლა და ექსპერტი გახდები! 🔧', messageEn: 'Good! A little more studying and you\'ll be an expert! 🔧' },
      { minScore: 3, maxScore: 3, messageKa: 'ბრავო! ტექნოლოგიების ექსპერტი ხარ! 🏆', messageEn: 'Excellent! You are a technology expert! 🏆' }
    ],
    authorId: 'admin-001', authorName: 'Nika Alaverdashvili',
    createdAt: new Date(Date.now() - 172800000).toISOString()
  }
];

@Injectable({ providedIn: 'root' })
export class QuizService {
  private _quizzes = signal<Quiz[]>([]);
  quizzes = this._quizzes.asReadonly();

  constructor() { this.loadOrSeed(); }

  private loadOrSeed() {
    const stored = localStorage.getItem('sp_quizzes');
    if (stored) {
      try { this._quizzes.set(JSON.parse(stored)); } catch { this.seed(); }
    } else { this.seed(); }
  }

  private seed() {
    this._quizzes.set(SEED_QUIZZES);
    localStorage.setItem('sp_quizzes', JSON.stringify(SEED_QUIZZES));
  }

  private save() { localStorage.setItem('sp_quizzes', JSON.stringify(this._quizzes())); }

  getQuiz(id: string): Quiz | undefined { return this._quizzes().find(q => q.id === id); }

  createQuiz(quiz: Omit<Quiz, 'id' | 'createdAt'>): Quiz {
    const newQuiz: Quiz = { ...quiz, id: 'quiz-' + Date.now(), createdAt: new Date().toISOString() };
    this._quizzes.set([newQuiz, ...this._quizzes()]);
    this.save();
    return newQuiz;
  }

  deleteQuiz(id: string) {
    this._quizzes.set(this._quizzes().filter(q => q.id !== id));
    this.save();
  }
}
