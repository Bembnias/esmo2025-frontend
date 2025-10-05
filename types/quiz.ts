export interface QuizQuestion {
  id: number
  question: string
  answers: QuizAnswer[]
}

export interface QuizAnswer {
  id: string
  text: string
  isCorrect: boolean
}

export interface QuizResult {
  questionId: number
  selectedAnswerId: string
  isCorrect: boolean
}

export interface FormData {
  name: string
  surname: string
  email: string
  city: string
  country: string
  affiliation: string
  areaOfInterest?: string
  speciality?: string
  liquidBiopsyAccess?: string
  privacyConsent: boolean
  marketingConsent: boolean
}
