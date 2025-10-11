import { Button } from '@/components/ui/button'
import { CloseQuizButton } from '@/components/ui/close-quiz-button'
import { ProgressIndicator } from '@/components/ui/progress-indicator'
import { ScreenLayout } from '@/components/ui/screen-layout'
import { BorderRadius, Colors } from '@/constants/theme'
import { useQuiz } from '@/contexts/quiz-context'
import { QUIZ_QUESTIONS } from '@/data/questions'
import { CROSSWORD_GRID, WORDS_TO_FIND, Word } from '@/data/word-search'
import { wordSearchStyles } from '@/styles/word-search.styles'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Modal, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native'

interface CellPosition {
  row: number
  col: number
}

export default function WordSearchScreen() {
  const router = useRouter()
  const { setWordSearchCompleted, setFoundWords, stopTimer } = useQuiz()

  const [selectedCells, setSelectedCells] = useState<CellPosition[]>([])
  const [foundWordsLocal, setFoundWordsLocal] = useState<Word[]>([])
  const [showVictoryModal, setShowVictoryModal] = useState(false)
  const [hasWon, setHasWon] = useState(false)

  const isCellInWord = (row: number, col: number, word: Word): boolean => {
    return word.positions.some((pos) => pos.row === row && pos.col === col)
  }

  const isCellSelected = (row: number, col: number): boolean => {
    return selectedCells.some((cell) => cell.row === row && cell.col === col)
  }

  const isCellFound = (row: number, col: number): boolean => {
    return foundWordsLocal.some((word) => isCellInWord(row, col, word))
  }

  // Get info about available words for this cell
  const getAvailableWordInfo = (row: number, col: number) => {
    if (!hasWon) return []

    const wordInfo: {
      word: Word
      isHorizontal: boolean
      isVertical: boolean
      isFirstCell: boolean
      isLastCell: boolean
    }[] = []

    for (const word of WORDS_TO_FIND) {
      // Include word if it's not found AND this cell is part of it
      // Even if the cell is also part of a found word
      if (isCellInWord(row, col, word) && !foundWordsLocal.some((fw) => fw.text === word.text)) {
        const cellIndex = word.positions.findIndex((pos) => pos.row === row && pos.col === col)
        const isHorizontal = word.positions.length > 1 && word.positions[0].row === word.positions[1].row
        const isVertical = word.positions.length > 1 && word.positions[0].col === word.positions[1].col

        wordInfo.push({
          word,
          isHorizontal,
          isVertical,
          isFirstCell: cellIndex === 0,
          isLastCell: cellIndex === word.positions.length - 1,
        })
      }
    }

    return wordInfo
  }

  const checkIfWordFound = (cells: CellPosition[]): Word | null => {
    if (cells.length < 2) return null

    for (const word of WORDS_TO_FIND) {
      // Check if the number of cells matches the word length
      if (cells.length === word.positions.length) {
        // Check if all word positions are in the selected cells (order doesn't matter)
        const allMatch = word.positions.every((pos) =>
          cells.some((cell) => cell.row === pos.row && cell.col === pos.col)
        )

        // Also check that all cells are part of the word (no extra cells)
        const allCellsValid = cells.every((cell) =>
          word.positions.some((pos) => pos.row === cell.row && pos.col === cell.col)
        )

        if (allMatch && allCellsValid) {
          return word
        }
      }
    }

    return null
  }

  const handleCellPress = (row: number, col: number) => {
    if (hasWon || foundWordsLocal.length >= 3) return

    // Toggle selection - simple tap to select/deselect
    const alreadySelected = isCellSelected(row, col)

    if (alreadySelected) {
      // Remove from selection
      setSelectedCells((prev) => prev.filter((cell) => !(cell.row === row && cell.col === col)))
    } else {
      // Add to selection
      setSelectedCells((prev) => {
        const newSelection = [...prev, { row, col }]

        // Check if we completed a word
        const foundWord = checkIfWordFound(newSelection)

        if (foundWord) {
          // Found a word!
          setFoundWordsLocal((prevWords) => {
            // Double check the word isn't already in the list
            if (prevWords.some((w) => w.text === foundWord.text)) {
              return prevWords
            }
            const newWords = [...prevWords, foundWord]
            return newWords
          })

          // Clear selection immediately instead of setTimeout
          return []
        }

        return newSelection
      })
    }
  }

  const handleSkip = () => {
    stopTimer()
    setWordSearchCompleted(false)
    router.push('/form')
  }

  const handleNext = () => {
    stopTimer()
    router.push('/form')
  }

  const handleModalDismiss = () => {
    setShowVictoryModal(false)
  }

  const getCellStyle = (row: number, col: number) => {
    const styles = [wordSearchStyles.cell]

    if (isCellFound(row, col)) {
      // @ts-ignore
      styles.push(wordSearchStyles.cellFound)

      // Count how many found words contain this cell
      const wordsContainingCell = foundWordsLocal.filter((word) => isCellInWord(row, col, word))

      // Only add rounded corners if cell is part of exactly one word
      // If it's shared by multiple words, keep it square
      if (wordsContainingCell.length === 1) {
        const word = wordsContainingCell[0]
        const cellIndex = word.positions.findIndex((pos) => pos.row === row && pos.col === col)
        const isFirstCell = cellIndex === 0
        const isLastCell = cellIndex === word.positions.length - 1

        // Determine if word is horizontal or vertical
        const isHorizontal = word.positions.length > 1 && word.positions[0].row === word.positions[1].row
        const isVertical = word.positions.length > 1 && word.positions[0].col === word.positions[1].col

        if (isHorizontal) {
          // @ts-ignore
          if (isFirstCell) styles.push(wordSearchStyles.cellRoundedLeft)
          // @ts-ignore
          if (isLastCell) styles.push(wordSearchStyles.cellRoundedRight)
        } else if (isVertical) {
          // @ts-ignore
          if (isFirstCell) styles.push(wordSearchStyles.cellRoundedTop)
          // @ts-ignore
          if (isLastCell) styles.push(wordSearchStyles.cellRoundedBottom)
        }
      }
    } else if (isCellSelected(row, col)) {
      // @ts-ignore
      styles.push(wordSearchStyles.cellSelected)
    }

    return styles
  }

  const getCellTextStyle = (row: number, col: number) => {
    if (isCellFound(row, col) || isCellSelected(row, col)) {
      return [wordSearchStyles.cellText, wordSearchStyles.cellTextSelected]
    }

    return wordSearchStyles.cellText
  }

  // Render border overlays for available words
  const renderBorderOverlays = (row: number, col: number) => {
    const wordInfo = getAvailableWordInfo(row, col)
    if (wordInfo.length === 0) return null

    return wordInfo.map((info, index) => {
      const borderStyle: any = {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderColor: Colors.scienceBlue,
        borderWidth: 0,
        backgroundColor: 'transparent',
      }

      if (info.isHorizontal) {
        // Always add top and bottom borders for horizontal words
        borderStyle.borderTopWidth = 2
        borderStyle.borderBottomWidth = 2

        if (info.isFirstCell) {
          // Check if the cell to the left is part of a found word
          const leftCellFound = isCellFound(row, col - 1)
          if (!leftCellFound) {
            borderStyle.borderLeftWidth = 2
            borderStyle.borderTopLeftRadius = BorderRadius.full
            borderStyle.borderBottomLeftRadius = BorderRadius.full
          }
        }
        if (info.isLastCell) {
          // Check if the cell to the right is part of a found word
          const rightCellFound = isCellFound(row, col + 1)
          if (!rightCellFound) {
            borderStyle.borderRightWidth = 2
            borderStyle.borderTopRightRadius = BorderRadius.full
            borderStyle.borderBottomRightRadius = BorderRadius.full
          }
        }
      } else if (info.isVertical) {
        // Always add left and right borders for vertical words
        borderStyle.borderLeftWidth = 2
        borderStyle.borderRightWidth = 2

        if (info.isFirstCell) {
          // Check if the cell above is part of a found word
          const topCellFound = isCellFound(row - 1, col)
          if (!topCellFound) {
            borderStyle.borderTopWidth = 2
            borderStyle.borderTopLeftRadius = BorderRadius.full
            borderStyle.borderTopRightRadius = BorderRadius.full
          }
        }
        if (info.isLastCell) {
          // Check if the cell below is part of a found word
          const bottomCellFound = isCellFound(row + 1, col)
          if (!bottomCellFound) {
            borderStyle.borderBottomWidth = 2
            borderStyle.borderBottomLeftRadius = BorderRadius.full
            borderStyle.borderBottomRightRadius = BorderRadius.full
          }
        }
      }

      return <View key={`border-${index}`} style={borderStyle} pointerEvents='none' />
    })
  }

  // Check for victory when foundWords changes
  useEffect(() => {
    if (foundWordsLocal.length >= 3 && !hasWon) {
      setHasWon(true)
      setShowVictoryModal(true)
      setWordSearchCompleted(true)
      stopTimer() // Stop timer when user wins
      // Save found words to context
      setFoundWords(foundWordsLocal.map((word) => word.text))
    }
  }, [foundWordsLocal, hasWon, setWordSearchCompleted, setFoundWords, stopTimer])

  return (
    <ScreenLayout>
      <View style={wordSearchStyles.wrapper}>
        <ScrollView style={wordSearchStyles.container} showsVerticalScrollIndicator={false}>
          <View style={wordSearchStyles.header}>
            <CloseQuizButton />
          </View>

          <Text style={wordSearchStyles.title}>Find at least 3 of the NSCLC biomarkers</Text>
          <Text style={wordSearchStyles.subtitle}>as from ESMO guidelines with EMA approved targeted drug</Text>

          <View style={wordSearchStyles.gridContainer}>
            <View style={wordSearchStyles.grid}>
              {CROSSWORD_GRID.map((row, rowIndex) => (
                <View key={rowIndex} style={wordSearchStyles.row}>
                  {row.map((cell, colIndex) => (
                    <TouchableOpacity
                      key={`${rowIndex}-${colIndex}`}
                      style={getCellStyle(rowIndex, colIndex)}
                      onPress={() => handleCellPress(rowIndex, colIndex)}
                      activeOpacity={0.8}
                      disabled={hasWon || foundWordsLocal.length >= 3}
                    >
                      <Text style={getCellTextStyle(rowIndex, colIndex)}>{cell}</Text>
                      {renderBorderOverlays(rowIndex, colIndex)}
                    </TouchableOpacity>
                  ))}
                </View>
              ))}
            </View>
          </View>
        </ScrollView>

        <View style={wordSearchStyles.footer}>
          <View style={wordSearchStyles.footerSpacer} />
          <ProgressIndicator total={QUIZ_QUESTIONS.length + 1} current={QUIZ_QUESTIONS.length} />
          <Button onPress={hasWon ? handleNext : handleSkip} title={hasWon ? 'NEXT' : 'SKIP'} />
        </View>

        {/* Victory Modal */}
        <Modal visible={showVictoryModal} transparent animationType='fade'>
          <Pressable style={wordSearchStyles.modalOverlay} onPress={handleModalDismiss}>
            <Pressable onPress={(e) => e.stopPropagation()}>
              <View style={wordSearchStyles.modalContent}>
                <Text style={wordSearchStyles.modalTitle}>BRAVO!</Text>
                <Text style={wordSearchStyles.modalText}>
                  You identified 3 biomarkers.{'\n'}
                  Did you know that{' '}
                  <Text style={wordSearchStyles.highlighted}>
                    Guardant360® CDx is able to identify more {'\n'} than 70 genes
                  </Text>
                  , including the 8 biomarkers recommended by ESMO {'\n'} for NSCLC for which there is an EMA approved
                  targeted therapy?
                </Text>
              </View>
            </Pressable>
            <View style={wordSearchStyles.modalButtonContainer}>
              <Button
                onPress={() => {
                  handleNext()
                  handleModalDismiss()
                }}
                title='NEXT'
              />
            </View>
          </Pressable>
        </Modal>
      </View>
    </ScreenLayout>
  )
}
