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
    question: '2. What is the recommended sample type for NGS testing?',
    answers: [
      { id: 'A', text: 'Blood sample only', isCorrect: false },
      { id: 'B', text: 'Tissue biopsy only', isCorrect: false },
      { id: 'C', text: 'Either tissue or liquid biopsy', isCorrect: true },
      { id: 'D', text: 'Saliva sample', isCorrect: false },
    ],
  },
  {
    id: 3,
    question: '3. How many genes should be included in a comprehensive NGS panel?',
    answers: [
      { id: 'A', text: 'Less than 50', isCorrect: false },
      { id: 'B', text: 'Between 50-100', isCorrect: false },
      { id: 'C', text: 'More than 100', isCorrect: true },
      { id: 'D', text: 'Only 10-20 key genes', isCorrect: false },
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
    question: '5. What is the typical turnaround time for NGS test results?',
    answers: [
      { id: 'A', text: '1-3 days', isCorrect: false },
      { id: 'B', text: '7-14 days', isCorrect: true },
      { id: 'C', text: '30-60 days', isCorrect: false },
      { id: 'D', text: 'Same day', isCorrect: false },
    ],
  },
  {
    id: 6,
    question: '6. Which statement about NGS in precision oncology is most accurate?',
    answers: [
      {
        id: 'A',
        text: 'NGS should only be used for advanced stage cancers',
        isCorrect: false,
      },
      {
        id: 'B',
        text: 'NGS can identify actionable mutations to guide treatment decisions',
        isCorrect: true,
      },
      { id: 'C', text: 'NGS is only useful for research purposes', isCorrect: false },
      {
        id: 'D',
        text: 'NGS cannot detect resistance mutations',
        isCorrect: false,
      },
    ],
  },
]
