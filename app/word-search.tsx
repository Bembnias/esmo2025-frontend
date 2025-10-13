import { Button } from '@/components/ui/button'
import { CloseQuizButton } from '@/components/ui/close-quiz-button'
import { ProgressIndicator } from '@/components/ui/progress-indicator'
import { ScreenLayout } from '@/components/ui/screen-layout'
import { BorderRadius, Spacing } from '@/constants/theme'
import { useQuiz } from '@/contexts/quiz-context'
import { QUIZ_QUESTIONS } from '@/data/questions'
import { CROSSWORD_GRID, WORDS_TO_FIND, Word } from '@/data/word-search'
import { wordSearchStyles } from '@/styles/word-search.styles'
import { useRouter } from 'expo-router'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Modal, Pressable, Text, View } from 'react-native'

interface CellPosition {
  row: number
  col: number
}

export default function WordSearchScreen() {
  const router = useRouter()
  const { setWordSearchCompleted, setFoundWords, stopTimer } = useQuiz()
  const gridRef = useRef<View>(null)

  const [selectedCells, setSelectedCells] = useState<CellPosition[]>([])
  const [foundWordsLocal, setFoundWordsLocal] = useState<Word[]>([])
  const [showVictoryModal, setShowVictoryModal] = useState(false)
  const [hasWon, setHasWon] = useState(false)
  const [isSelecting, setIsSelecting] = useState(false)
  const [gridLayout, setGridLayout] = useState<{ x: number; y: number } | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const pendingCellRef = useRef<CellPosition | null>(null)

  // Memoize selected cells Set for faster lookups
  const selectedCellsSet = useMemo(() => {
    return new Set(selectedCells.map((cell) => `${cell.row},${cell.col}`))
  }, [selectedCells])

  const isCellInWord = useCallback((row: number, col: number, word: Word): boolean => {
    return word.positions.some((pos) => pos.row === row && pos.col === col)
  }, [])

  const isCellSelected = useCallback(
    (row: number, col: number): boolean => {
      return selectedCellsSet.has(`${row},${col}`)
    },
    [selectedCellsSet]
  )

  const isCellFound = useCallback(
    (row: number, col: number): boolean => {
      return foundWordsLocal.some((word) => isCellInWord(row, col, word))
    },
    [foundWordsLocal, isCellInWord]
  )

  const checkIfWordFound = (cells: CellPosition[]): Word | null => {
    if (cells.length < 2) return null

    for (const word of WORDS_TO_FIND) {
      // Skip words already found
      if (foundWordsLocal.some((fw) => fw.text === word.text)) continue

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

  const handleCellPressIn = (row: number, col: number) => {
    if (hasWon || foundWordsLocal.length >= 3) return

    setIsSelecting(true)
    setSelectedCells([{ row, col }])
  }

  // Helper function to interpolate cells between two points (fill gaps during fast movement)
  const getCellsBetween = useCallback((from: CellPosition, to: CellPosition): CellPosition[] => {
    const cells: CellPosition[] = []

    // Calculate the difference
    const rowDiff = to.row - from.row
    const colDiff = to.col - from.col

    // Determine the number of steps needed
    const steps = Math.max(Math.abs(rowDiff), Math.abs(colDiff))

    // If they're the same cell, return empty
    if (steps === 0) {
      return []
    }

    // If adjacent, just return the target
    if (steps === 1) {
      return [to]
    }

    // Interpolate between the two points using more granular steps for smoother selection
    const granularity = steps * 2 // Double the resolution for smoother interpolation
    const addedCells = new Set<string>()

    for (let i = 1; i <= granularity; i++) {
      const progress = i / granularity
      const row = Math.round(from.row + rowDiff * progress)
      const col = Math.round(from.col + colDiff * progress)

      // Make sure we're within bounds
      if (row >= 0 && row < CROSSWORD_GRID.length && col >= 0 && col < CROSSWORD_GRID[0].length) {
        const key = `${row},${col}`
        if (!addedCells.has(key)) {
          addedCells.add(key)
          cells.push({ row, col })
        }
      }
    }

    return cells
  }, [])

  const handleCellMove = useCallback(
    (row: number, col: number) => {
      if (!isSelecting || hasWon || foundWordsLocal.length >= 3) return

      // Store the pending cell
      pendingCellRef.current = { row, col }

      // Cancel any pending animation frame
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current)
      }

      // Schedule update on next animation frame for smoother performance
      animationFrameRef.current = requestAnimationFrame(() => {
        const cell = pendingCellRef.current
        if (!cell) return

        setSelectedCells((prev) => {
          // Create a Set for faster lookup
          const selectedSet = new Set(prev.map((c) => `${c.row},${c.col}`))

          // Don't add if already selected
          if (selectedSet.has(`${cell.row},${cell.col}`)) return prev

          // If we have previous cells, interpolate between last cell and current cell
          if (prev.length > 0) {
            const lastCell = prev[prev.length - 1]
            const cellsBetween = getCellsBetween(lastCell, cell)

            // Add all cells between (filtering out already selected ones using Set)
            const newCells = cellsBetween.filter((c) => !selectedSet.has(`${c.row},${c.col}`))

            if (newCells.length === 0) return prev
            return [...prev, ...newCells]
          }

          return [...prev, cell]
        })

        animationFrameRef.current = null
      })
    },
    [isSelecting, hasWon, foundWordsLocal.length, getCellsBetween]
  )

  const handleSelectionEnd = () => {
    if (!isSelecting) return

    // Cancel any pending animation frame
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }

    setIsSelecting(false)

    // Check if we completed a word
    const foundWord = checkIfWordFound(selectedCells)

    if (foundWord) {
      // Found a word!
      setFoundWordsLocal((prevWords) => {
        // Double check the word isn't already in the list
        if (prevWords.some((w) => w.text === foundWord.text)) {
          return prevWords
        }
        return [...prevWords, foundWord]
      })
    }

    // Clear selection
    setSelectedCells([])
  }

  const getCellFromTouch = useCallback(
    (pageX: number, pageY: number): CellPosition | null => {
      if (!gridLayout) return null

      const cellSize = 48
      const gridPadding = Spacing.sm

      // Calculate relative position within the grid
      const relativeX = pageX - gridLayout.x - gridPadding
      const relativeY = pageY - gridLayout.y - gridPadding

      const col = Math.floor(relativeX / cellSize)
      const row = Math.floor(relativeY / cellSize)

      // Validate bounds
      if (row >= 0 && row < CROSSWORD_GRID.length && col >= 0 && col < CROSSWORD_GRID[0].length) {
        return { row, col }
      }

      return null
    },
    [gridLayout]
  )

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
    } else if (isCellSelected(row, col) && isSelecting) {
      // Show border only during active selecting (no fill)
      // @ts-ignore
      styles.push(wordSearchStyles.cellSelecting)

      // Add rounded corners and adjust borders for selected cells
      if (selectedCells.length === 1) {
        // Single cell - full rounded corners with full border
        // @ts-ignore
        styles.push({
          borderRadius: BorderRadius.full,
          borderWidth: 2,
        })
      } else {
        // Multiple cells - check direction and position
        const firstCell = selectedCells[0]
        const isHorizontal = selectedCells.every((c) => c.row === firstCell.row)
        const isVertical = selectedCells.every((c) => c.col === firstCell.col)

        if (isHorizontal) {
          // Find the leftmost and rightmost columns
          const minCol = Math.min(...selectedCells.map((c) => c.col))
          const maxCol = Math.max(...selectedCells.map((c) => c.col))

          // All cells have top and bottom borders
          const borderStyle: any = {
            borderTopWidth: 2,
            borderBottomWidth: 2,
          }

          // Round and add left border on leftmost cell
          if (col === minCol) {
            borderStyle.borderLeftWidth = 2
            borderStyle.borderTopLeftRadius = BorderRadius.full
            borderStyle.borderBottomLeftRadius = BorderRadius.full
          } else {
            borderStyle.borderLeftWidth = 0
          }

          // Round and add right border on rightmost cell
          if (col === maxCol) {
            borderStyle.borderRightWidth = 2
            borderStyle.borderTopRightRadius = BorderRadius.full
            borderStyle.borderBottomRightRadius = BorderRadius.full
          } else {
            borderStyle.borderRightWidth = 0
          }

          styles.push(borderStyle)
        } else if (isVertical) {
          // Find the topmost and bottommost rows
          const minRow = Math.min(...selectedCells.map((c) => c.row))
          const maxRow = Math.max(...selectedCells.map((c) => c.row))

          // All cells have left and right borders
          const borderStyle: any = {
            borderLeftWidth: 2,
            borderRightWidth: 2,
          }

          // Round and add top border on topmost cell
          if (row === minRow) {
            borderStyle.borderTopWidth = 2
            borderStyle.borderTopLeftRadius = BorderRadius.full
            borderStyle.borderTopRightRadius = BorderRadius.full
          } else {
            borderStyle.borderTopWidth = 0
          }

          // Round and add bottom border on bottommost cell
          if (row === maxRow) {
            borderStyle.borderBottomWidth = 2
            borderStyle.borderBottomLeftRadius = BorderRadius.full
            borderStyle.borderBottomRightRadius = BorderRadius.full
          } else {
            borderStyle.borderBottomWidth = 0
          }

          styles.push(borderStyle)
        }
      }
    }

    return styles
  }

  const getCellTextStyle = (row: number, col: number) => {
    // White text only for found words (with fill)
    if (isCellFound(row, col)) {
      return [wordSearchStyles.cellText, wordSearchStyles.cellTextSelected]
    }

    // Normal text color for selecting (border only) and default
    return wordSearchStyles.cellText
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

  // Cleanup animation frame on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return (
    <ScreenLayout>
      <View style={wordSearchStyles.wrapper}>
        <View style={wordSearchStyles.container}>
          <View style={wordSearchStyles.header}>
            <CloseQuizButton />
          </View>

          <Text style={wordSearchStyles.title}>Find at least 3 of the NSCLC biomarkers</Text>
          <Text style={wordSearchStyles.subtitle}>as from ESMO guidelines with EMA approved targeted drug</Text>

          <View style={wordSearchStyles.gridContainer}>
            <View
              ref={gridRef}
              style={wordSearchStyles.grid}
              onLayout={() => {
                // Measure grid position after layout
                if (gridRef.current) {
                  gridRef.current.measureInWindow((x, y) => {
                    setGridLayout({ x, y })
                  })
                }
              }}
              onStartShouldSetResponder={() => true}
              onMoveShouldSetResponder={() => true}
              onResponderGrant={(e) => {
                const { pageX, pageY } = e.nativeEvent
                const cell = getCellFromTouch(pageX, pageY)
                if (cell) {
                  handleCellPressIn(cell.row, cell.col)
                }
              }}
              onResponderMove={(e) => {
                const { pageX, pageY } = e.nativeEvent
                const cell = getCellFromTouch(pageX, pageY)
                if (cell) {
                  handleCellMove(cell.row, cell.col)
                }
              }}
              onResponderRelease={handleSelectionEnd}
              onResponderTerminate={handleSelectionEnd}
            >
              {CROSSWORD_GRID.map((row, rowIndex) => (
                <View key={rowIndex} style={wordSearchStyles.row}>
                  {row.map((cell, colIndex) => (
                    <View key={`${rowIndex}-${colIndex}`} style={getCellStyle(rowIndex, colIndex)}>
                      <Text style={getCellTextStyle(rowIndex, colIndex)}>{cell}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          </View>
        </View>

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
