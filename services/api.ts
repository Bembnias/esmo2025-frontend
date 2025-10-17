import { config } from '@/config'
import { QuizResult } from '@/types/quiz'

export interface QuizSubmissionData {
  name: string
  surname: string
  email: string
  city: string
  country: string
  affiliation: string
  areaOfInterest: string
  speciality: string
  liquidBiopsyAccess: string
  privacyConsent: boolean
  marketingConsent: boolean
  score: number
  time: number
  q1: string
  q2: string
  q3: string
  q4: string
  q5: string
  wordSearch: string[]
}

const API_URL = `${config.apiUrl}/quiz-results`
const TIMEOUT_MS = 15000 // 15 seconds timeout

export const submitQuizResults = async (data: QuizSubmissionData): Promise<boolean> => {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS)

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : null,
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (response.status === 429) {
      // Rate limited - submission was already received
      console.log('Submission already received by server (rate limited)')
      return true // Consider it successful since it was already submitted
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return true
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      console.log('Request timed out after', TIMEOUT_MS, 'ms')
    }
    return false
  }
}

export const prepareQuizData = (
  formData: {
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
  },
  results: QuizResult[],
  totalScore: number,
  elapsedTime: number,
  foundWords: string[]
): QuizSubmissionData => {
  const answers = results.map((result) => (result.isCorrect ? 'correct' : 'incorrect'))

  return {
    name: formData.name,
    surname: formData.surname,
    email: formData.email,
    city: formData.city,
    country: formData.country,
    affiliation: formData.affiliation,
    areaOfInterest: formData.areaOfInterest || '',
    speciality: formData.speciality || '',
    liquidBiopsyAccess: formData.liquidBiopsyAccess || '',
    privacyConsent: formData.privacyConsent,
    marketingConsent: formData.marketingConsent,
    score: totalScore,
    time: elapsedTime,
    q1: answers[0] || '',
    q2: answers[1] || '',
    q3: answers[2] || '',
    q4: answers[3] || '',
    q5: answers[4] || '',
    wordSearch: foundWords,
  }
}
