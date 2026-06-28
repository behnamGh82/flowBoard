export type ThemeMode = 'light' | 'dark'
export type AppLanguage = 'en' | 'fa'
export type TextDirection = 'ltr' | 'rtl'

export type UserRole = 'admin' | 'project_manager' | 'developer'

export interface User {
  _id: string
  name: string
  email: string
  avatar?: string
  role: UserRole
  createdAt: string
  updatedAt: string
}

export type ProjectStatus = 'planning' | 'active' | 'on_hold' | 'completed' | 'archived'
export type ProjectVisibility = 'private' | 'team' | 'public'
export type ProjectPriority = 'low' | 'medium' | 'high'

export interface Project {
  _id: string
  name: string
  key: string
  description?: string
  status: ProjectStatus
  priority: ProjectPriority
  visibility: ProjectVisibility
  icon?: string
  startDate?: string
  deadline?: string
  coverImage?: string
  owner: User | string
  members: User[] | string[]
  color?: string
  totalTasks?: number
  completedTasks?: number
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
export type TaskStatus = 'backlog' | 'todo' | 'in_progress' | 'in_review' | 'done'

export interface TaskAttachment {
  _id: string
  filename: string
  url: string
  size: number
  uploadedBy: User | string
  createdAt: string
}

export interface TaskChecklistItem {
  id: string
  text: string
  done: boolean
  order: number
}

export interface TaskActivityLogEntry {
  _id: string
  action: string
  actor: User | string
  message: string
  createdAt: string
}

export interface Task {
  _id: string
  title: string
  description?: string
  status: TaskStatus
  priority: TaskPriority
  storyPoints?: number
  board: Board | string
  project: Project | string
  columnId: string
  order: number
  assignee?: User | string
  reporter: User | string
  labels: string[]
  dueDate?: string
  attachments: TaskAttachment[]
  checklist: TaskChecklistItem[]
  comments?: Comment[]
  activityLog?: TaskActivityLogEntry[]
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

export type CalendarEventType = 'task_due' | 'project_milestone' | 'meeting'

export interface CalendarEvent {
  _id: string
  title: string
  description?: string
  start: string
  end?: string
  type: CalendarEventType
  project?: Project | string
  task?: Task | string
  createdAt: string
  updatedAt: string
}

export type ActivityAction =
  | 'project_created'
  | 'task_created'
  | 'task_updated'
  | 'task_moved'
  | 'comment_added'
  | 'user_joined'

export interface ActivityTimelineItem {
  _id: string
  action: ActivityAction
  actor: User | string
  project?: Project | string
  task?: Task | string
  comment?: Comment | string
  message: string
  metadata?: Record<string, unknown>
  createdAt: string
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

export interface ApiError {
  message: string
  status?: number
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
  role?: UserRole
}

export interface ForgotPasswordPayload {
  email: string
}

export interface ResetPasswordPayload {
  token: string
  password: string
}
