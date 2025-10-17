import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Crypto from 'expo-crypto'
import { QuizSubmissionData } from './api'

const PENDING_SUBMISSIONS_KEY = '@esmo_quiz_pending_submissions'

export interface PendingSubmission {
  id: string
  data: QuizSubmissionData
  timestamp: number
  retries: number
}

/**
 * Save quiz data to local storage for later submission
 */
export const savePendingSubmission = async (data: QuizSubmissionData): Promise<void> => {
  try {
    // Get existing pending submissions
    const existing = await getPendingSubmissions()

    // Generate a unique UUID
    const id = Crypto.randomUUID()

    const submission: PendingSubmission = {
      id,
      data,
      timestamp: Date.now(),
      retries: 0,
    }

    // Add new submission
    const updated = [...existing, submission]

    // Save to AsyncStorage
    await AsyncStorage.setItem(PENDING_SUBMISSIONS_KEY, JSON.stringify(updated))

    console.log('Saved pending submission:', id)
  } catch (error) {
    console.error('Error saving pending submission:', error)
    throw error
  }
}

/**
 * Get all pending submissions from local storage
 */
export const getPendingSubmissions = async (): Promise<PendingSubmission[]> => {
  try {
    const data = await AsyncStorage.getItem(PENDING_SUBMISSIONS_KEY)
    if (!data) {
      return []
    }
    return JSON.parse(data)
  } catch (error) {
    console.error('Error getting pending submissions:', error)
    return []
  }
}

/**
 * Remove a specific pending submission by ID
 */
export const removePendingSubmission = async (id: string): Promise<void> => {
  try {
    const existing = await getPendingSubmissions()
    const filtered = existing.filter((sub) => sub.id !== id)
    await AsyncStorage.setItem(PENDING_SUBMISSIONS_KEY, JSON.stringify(filtered))
    console.log('Removed pending submission:', id)
  } catch (error) {
    console.error('Error removing pending submission:', error)
    throw error
  }
}

/**
 * Update a specific pending submission
 */
export const updatePendingSubmission = async (submission: PendingSubmission): Promise<void> => {
  try {
    const existing = await getPendingSubmissions()
    const updated = existing.map((sub) => (sub.id === submission.id ? submission : sub))
    await AsyncStorage.setItem(PENDING_SUBMISSIONS_KEY, JSON.stringify(updated))
  } catch (error) {
    console.error('Error updating pending submission:', error)
    throw error
  }
}

/**
 * Clear all pending submissions
 */
export const clearPendingSubmissions = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(PENDING_SUBMISSIONS_KEY)
    console.log('Cleared all pending submissions')
  } catch (error) {
    console.error('Error clearing pending submissions:', error)
    throw error
  }
}
