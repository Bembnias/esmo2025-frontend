import { FormData, QuizResult } from '@/types/quiz'
import React, { createContext, ReactNode, useContext, useState } from 'react'

interface QuizContextType {
  currentQuestionIndex: number
  setCurrentQuestionIndex: (index: number) => void
  results: QuizResult[]
  addResult: (result: QuizResult) => void
  formData: FormData | null
  setFormData: (data: FormData) => void
  elapsedTime: number
  setElapsedTime: (time: number) => void
  resetQuiz: () => void
  score: number
}

const QuizContext = createContext<QuizContextType | undefined>(undefined)

export const QuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [results, setResults] = useState<QuizResult[]>([])
  const [formData, setFormData] = useState<FormData | null>(null)
  const [elapsedTime, setElapsedTime] = useState(0)

  const addResult = (result: QuizResult) => {
    setResults((prev) => [...prev, result])
  }

  const resetQuiz = () => {
    setCurrentQuestionIndex(0)
    setResults([])
    setFormData(null)
    setElapsedTime(0)
  }

  const score = results.filter((r) => r.isCorrect).length

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
        resetQuiz,
        score,
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
