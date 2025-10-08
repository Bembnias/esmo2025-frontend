export const CROSSWORD_GRID = [
  ['R', 'A', 'Q', 'B', 'R', 'O', 'G', 'G'],
  ['I', 'L', '2', 'R', 'O', 'S', '1', 'A'],
  ['C', 'K', 'R', 'A', 'S', 'G', '12', 'C'],
  ['N', 'L', 'E', 'F', 'Q', 'M', 'Y', 'F'],
  ['R', 'E', 'T', 'V', 'T', 'E', 'E', 'G'],
  ['G', 'G', 'P', '600', 'N', 'T', 'R', 'K'],
  ['1', 'F', 'X', 'E', 'R', 'B', 'B', '2'],
  ['X', 'R', 'A', 'S', 'X', 'A', 'S', 'C'],
]

export interface Word {
  text: string
  positions: { row: number; col: number }[]
}

export const WORDS_TO_FIND: Word[] = [
  // Horizontal words
  {
    text: 'ROS1',
    positions: [
      { row: 1, col: 3 },
      { row: 1, col: 4 },
      { row: 1, col: 5 },
      { row: 1, col: 6 },
    ],
  },
  {
    text: 'KRASG12C',
    positions: [
      { row: 2, col: 1 },
      { row: 2, col: 2 },
      { row: 2, col: 3 },
      { row: 2, col: 4 },
      { row: 2, col: 5 },
      { row: 2, col: 6 },
      { row: 2, col: 7 },
    ],
  },
  {
    text: 'NTRK',
    positions: [
      { row: 5, col: 4 },
      { row: 5, col: 5 },
      { row: 5, col: 6 },
      { row: 5, col: 7 },
    ],
  },
  {
    text: 'ERBB2',
    positions: [
      { row: 6, col: 3 },
      { row: 6, col: 4 },
      { row: 6, col: 5 },
      { row: 6, col: 6 },
      { row: 6, col: 7 },
    ],
  },
  // Vertical words
  {
    text: 'NRG1',
    positions: [
      { row: 3, col: 0 },
      { row: 4, col: 0 },
      { row: 5, col: 0 },
      { row: 6, col: 0 },
    ],
  },
  {
    text: 'ALK',
    positions: [
      { row: 0, col: 1 },
      { row: 1, col: 1 },
      { row: 2, col: 1 },
    ],
  },
  {
    text: 'EGFR',
    positions: [
      { row: 4, col: 1 },
      { row: 5, col: 1 },
      { row: 6, col: 1 },
      { row: 7, col: 1 },
    ],
  },
  {
    text: 'RET',
    positions: [
      { row: 2, col: 2 },
      { row: 3, col: 2 },
      { row: 4, col: 2 },
    ],
  },
  {
    text: 'BRAFV600E',
    positions: [
      { row: 0, col: 3 },
      { row: 1, col: 3 },
      { row: 2, col: 3 },
      { row: 3, col: 3 },
      { row: 4, col: 3 },
      { row: 5, col: 3 },
      { row: 6, col: 3 },
    ],
  },
  {
    text: 'MET',
    positions: [
      { row: 3, col: 5 },
      { row: 4, col: 5 },
      { row: 5, col: 5 },
    ],
  },
]
