export type ThemeMode = 'light' | 'dark'

export type UserRole = 'admin' | 'member' | 'viewer'

export interface User {
  _id: string
  name: string
  email: string
  avatar?: string
  role: UserRole
  createdAt: string
  updatedAt: string
}

export type ProjectStatus = 'active' | 'archived' | 'on_hold'

export interface Project {
  _id: string
  name: string
  key: string
  description?: string
  status: ProjectStatus
  owner: User | string
  members: User[] | string[]
  color?: string
  createdAt: string
  updatedAt: string
}

export interface BoardColumn {
  id: string
  title: string
  order: number
}

export interface Board {
  _id: string
  name: string
  project: Project | string
  columns: BoardColumn[]
  createdAt: string
  updatedAt: string
}

export type TaskPriority = 'lowest' | 'low' | 'medium' | 'high' | 'highest'
export type TaskStatus = 'todo' | 'in_progress' | 'in_review' | 'done'

export interface Task {
  _id: string
  title: string
  description?: string
  status: TaskStatus
  priority: TaskPriority
  board: Board | string
  project: Project | string
  columnId: string
  order: number
  assignee?: User | string
  reporter: User | string
  labels: string[]
  dueDate?: string
  createdAt: string
  updatedAt: string
}

export interface Comment {
  _id: string
  content: string
  task: Task | string
  author: User | string
  createdAt: string
  updatedAt: string
}

export type NotificationType =
  | 'task_assigned'
  | 'task_updated'
  | 'comment_added'
  | 'project_invite'

export interface Notification {
  _id: string
  type: NotificationType
  message: string
  read: boolean
  recipient: User | string
  metadata?: Record<string, unknown>
  createdAt: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

export interface AuthTokens {
  accessToken: string
  refreshToken?: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  name: string
  email: string
  password: string
}
