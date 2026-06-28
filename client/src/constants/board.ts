import type { BoardColumn } from '@/types'

export const DEFAULT_BOARD_COLUMNS: BoardColumn[] = [
  { id: 'backlog', title: 'Backlog', order: 0 },
  { id: 'todo', title: 'Todo', order: 1 },
  { id: 'in_progress', title: 'In Progress', order: 2 },
  { id: 'in_review', title: 'Review', order: 3 },
  { id: 'done', title: 'Done', order: 4 },
]

export const COLUMN_IDS = DEFAULT_BOARD_COLUMNS.map((c) => c.id)
