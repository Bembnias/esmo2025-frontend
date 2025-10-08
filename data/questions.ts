import { QuizQuestion } from '@/types/quiz'

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: '1. ESMO Guidelines recommend NGS testing for:',
    answers: [
      { id: 'A', text: 'NSCLC', isCorrect: false },
      {
        id: 'B',
        text: 'NSCLC, CRC, Prostate Cancer, Ovarian Cancer, Cholangiocarcinoma, Breast Cancer, Rare Tumors',
        isCorrect: true,
      },
      {
        id: 'C',
        text: 'NSCLC, CRC, Prostate Cancer, Ovarian Cancer, Cholangiocarcinoma',
        isCorrect: false,
      },
      { id: 'D', text: 'Never', isCorrect: false },
    ],
  },
  {
    id: 2,
    question: '2. Which of the following statements are true?',
    answers: [
      {
        id: 'A',
        text: 'NGS testing (tissue and liquid) has not demonstrated clinical outcomes',
        isCorrect: false,
      },
      {
        id: 'B',
        text: 'NGS testing (tissue and liquid) demonstrated clinical benefits and large panels (CGP) equal outcomes of small panels (<50 genes) in NSCLC',
        isCorrect: false,
      },
      {
        id: 'C',
        text: 'NGS testing (tissue and liquid) demonstrated clinical benefits and large panels (CGP) improved patients outcomes over small panels (<50 genes) in NSCLC',
        isCorrect: true,
      },
      { id: 'D', text: 'All of the above', isCorrect: false },
    ],
  },
  {
    id: 3,
    question: '3. Liquid biopsy CGP tests such as Guardant360® CDx:',
    answers: [
      {
        id: 'A',
        text: 'Have a fast turnaround time and patient convenience',
        isCorrect: false,
      },
      {
        id: 'B',
        text: 'Liquid biopsy can identify alterations that have developed over time in resistance to therapy or that are across different sites of disease',
        isCorrect: false,
      },
      {
        id: 'C',
        text: 'Have a concordance with tissue above 80% in NSCLC',
        isCorrect: false,
      },
      { id: 'D', text: 'All of the above', isCorrect: true },
    ],
  },
  {
    id: 4,
    question:
      '4. High sensitivity testing is fundamental, as several mutations are below 0.4% of Limit of Detection (LoD). Which percentage of EGFR mutations are below 0.4% LoD in NSCLC?',
    answers: [
      { id: 'A', text: 'Less than 5%', isCorrect: false },
      { id: 'B', text: 'Between 5% and 10%', isCorrect: false },
      { id: 'C', text: 'Between 20% and 30%', isCorrect: true },
      { id: 'D', text: 'Above 50%', isCorrect: false },
    ],
  },
  {
    id: 5,
    question: '5. For your patients, what would be a meaningful difference in turnaround time for a CGP test?',
    answers: [
      { id: 'A', text: 'Less than 5 working days', isCorrect: true },
      { id: 'B', text: 'Between 5 and 10 working days', isCorrect: false },
      { id: 'C', text: 'Around 15 working days', isCorrect: false },
      { id: 'D', text: 'Around 25 working days', isCorrect: false },
    ],
  },
]
