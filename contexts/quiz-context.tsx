import { FormData, QuizResult } from '@/types/quiz'
import React, { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react'

interface QuizContextType {
  currentQuestionIndex: number
  setCurrentQuestionIndex: (index: number) => void
  results: QuizResult[]
  addResult: (result: QuizResult) => void
  formData: FormData | null
  setFormData: (data: FormData) => void
  elapsedTime: number
  setElapsedTime: (time: number) => void
  addElapsedTime: (time: number) => void
  wordSearchCompleted: boolean
  setWordSearchCompleted: (completed: boolean) => void
  foundWords: string[]
  setFoundWords: (words: string[]) => void
  resetQuiz: () => void
  score: number
  totalScore: number
  startTimer: () => void
  stopTimer: () => void
}

const QuizContext = createContext<QuizContextType | undefined>(undefined)

export const QuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [results, setResults] = useState<QuizResult[]>([])
  const [formData, setFormData] = useState<FormData | null>(null)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [wordSearchCompleted, setWordSearchCompleted] = useState(false)
  const [foundWords, setFoundWords] = useState<string[]>([])

  const timerInterval = useRef<number | null>(null)

  const startTimer = () => {
    if (timerInterval.current) return // Already running

    timerInterval.current = setInterval(() => {
      setElapsedTime((prev) => prev + 1)
    }, 1000)
  }

  const stopTimer = () => {
    if (timerInterval.current) {
      clearInterval(timerInterval.current)
      timerInterval.current = null
    }
  }

  const addResult = (result: QuizResult) => {
    setResults((prev) => [...prev, result])
  }

  const addElapsedTime = (time: number) => {
    setElapsedTime((prev) => prev + time)
  }

  const resetQuiz = () => {
    stopTimer()
    setCurrentQuestionIndex(0)
    setResults([])
    setFormData(null)
    setElapsedTime(0)
    setWordSearchCompleted(false)
    setFoundWords([])
  }

  const score = results.filter((r) => r.isCorrect).length
  const totalScore = score + (wordSearchCompleted ? 1 : 0)

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopTimer()
    }
  }, [])

  return (
    <QuizContext.Provider
      value={{
        currentQuestionIndex,
        setCurrentQuestionIndex,
        results,
        addResult,
        formData,
        setFormData,
        elapsedTime,
        setElapsedTime,
        addElapsedTime,
        wordSearchCompleted,
        setWordSearchCompleted,
        foundWords,
        setFoundWords,
        resetQuiz,
        score,
        totalScore,
        startTimer,
        stopTimer,
      }}
    >
      {children}
    </QuizContext.Provider>
  )
}

export const useQuiz = () => {
  const context = useContext(QuizContext)
  if (!context) {
    throw new Error('useQuiz must be used within QuizProvider')
  }
  return context
}
