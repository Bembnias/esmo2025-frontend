import { QuizSubmissionData, submitQuizResults } from '@/services/api'
import {
  getPendingSubmissions,
  removePendingSubmission,
  savePendingSubmission,
  updatePendingSubmission,
} from '@/services/offline-storage'
import NetInfo from '@react-native-community/netinfo'
import { useCallback, useEffect, useRef, useState } from 'react'

const MAX_RETRIES = 3

export const useDataSync = () => {
  const [isOnline, setIsOnline] = useState(true)
  const [isSyncing, setIsSyncing] = useState(false)
  const previousOnlineStatus = useRef(true)
  const submissionInProgress = useRef(false)

  /**
   * Sync all pending submissions to the server
   */
  const syncPendingSubmissions = useCallback(async (): Promise<void> => {
    if (isSyncing) {
      console.log('Sync already in progress, skipping...')
      return
    }

    if (!isOnline) {
      console.log('Device is offline, cannot sync')
      return
    }

    setIsSyncing(true)

    try {
      const pending = await getPendingSubmissions()

      if (pending.length === 0) {
        console.log('No pending submissions to sync')
        setIsSyncing(false)
        return
      }

      console.log(`Syncing ${pending.length} pending submissions...`)

      for (const submission of pending) {
        if (submission.retries >= MAX_RETRIES) {
          console.log(`Submission ${submission.id} has reached max retries, skipping.`)
          continue
        }

        try {
          const success = await submitQuizResults(submission.data)

          if (success) {
            // Remove from pending list if successful
            await removePendingSubmission(submission.id)
            console.log(`Successfully synced submission ${submission.id}`)
          } else {
            // Increment retry count
            submission.retries += 1
            await updatePendingSubmission(submission)
            console.log(`Failed to sync submission ${submission.id}, retry #${submission.retries} of ${MAX_RETRIES}`)
          }
        } catch (error) {
          console.error(`Error syncing submission ${submission.id}:`, error)
          // Increment retry count on error
          submission.retries += 1
          await updatePendingSubmission(submission)
        }
      }

      console.log('Sync completed')
    } catch (error) {
      console.error('Error in syncPendingSubmissions:', error)
    } finally {
      setIsSyncing(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOnline])

  // Monitor network connectivity
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOnline(state.isConnected ?? false)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  // Sync pending submissions when coming online
  useEffect(() => {
    // If we just came back online (transition from offline to online)
    if (isOnline && !previousOnlineStatus.current) {
      console.log('Device came back online, triggering sync...')
      syncPendingSubmissions()
    }

    // Update the previous status
    previousOnlineStatus.current = isOnline
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOnline])

  /**
   * Submit quiz data - tries to send immediately if online, saves locally if offline
   * IMPORTANT: Always syncs pending submissions first before submitting new data
   */
  const submitData = async (data: QuizSubmissionData): Promise<boolean> => {
    // Prevent concurrent submissions
    if (submissionInProgress.current) {
      console.log('Submission already in progress, skipping...')
      return false
    }

    submissionInProgress.current = true

    try {
      if (isOnline) {
        // First, try to sync any pending submissions before submitting new data
        console.log('Checking for pending submissions before submitting new data...')
        await syncPendingSubmissions()

        // Then try to submit the new data directly
        const success = await submitQuizResults(data)

        if (success) {
          console.log('Quiz results submitted successfully')
          return true
        } else {
          // If submission failed, save for later
          console.log('Submission failed, saving locally')
          await savePendingSubmission(data)
          return false
        }
      } else {
        // No internet connection, save locally
        console.log('No internet connection, saving locally')
        await savePendingSubmission(data)
        return false
      }
    } catch (error) {
      console.error('Error in submitData:', error)
      // Save locally as fallback
      await savePendingSubmission(data)
      return false
    } finally {
      submissionInProgress.current = false
    }
  }

  return {
    isOnline,
    isSyncing,
    submitData,
    syncPendingSubmissions,
  }
}
