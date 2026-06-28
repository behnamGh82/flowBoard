import { Request } from 'express'
import { Document, Types } from 'mongoose'

export interface AuthRequest extends Request {
  user?: {
    id: string
    email: string
    role: string
  }
}

export type UserRole = 'admin' | 'project_manager' | 'developer'
export type ProjectStatus = 'planning' | 'active' | 'on_hold' | 'completed' | 'archived'
export type ProjectVisibility = 'private' | 'team' | 'public'
export type ProjectPriority = 'low' | 'medium' | 'high'
export type TaskPriority = 'lowest' | 'low' | 'medium' | 'high' | 'highest'
export type TaskStatus = 'backlog' | 'todo' | 'in_progress' | 'in_review' | 'done'

export interface ITaskAttachment {
  _id: Types.ObjectId
  filename: string
  url: string
  size: number
  uploadedBy: Types.ObjectId
  createdAt: Date
}

export interface ITaskChecklistItem {
  id: string
  text: string
  done: boolean
  order: number
}
export type CalendarEventType = 'task_due' | 'project_milestone' | 'meeting'
export type ActivityAction =
  | 'project_created'
  | 'task_created'
  | 'task_updated'
  | 'task_moved'
  | 'comment_added'
  | 'user_joined'
export type NotificationType =
  | 'task_assigned'
  | 'task_updated'
  | 'comment_added'
  | 'project_invite'

export interface IUser extends Document {
  _id: Types.ObjectId
  name: string
  email: string
  password: string
  avatar?: string
  role: UserRole
  passwordResetToken?: string
  passwordResetExpires?: Date
  comparePassword(candidate: string): Promise<boolean>
  createdAt: Date
  updatedAt: Date
}

export interface IProject extends Document {
  _id: Types.ObjectId
  name: string
  key: string
  description?: string
  status: ProjectStatus
  priority: ProjectPriority
  visibility: ProjectVisibility
  icon?: string
  startDate?: Date
  deadline?: Date
  coverImage?: string
  owner: Types.ObjectId
  members: Types.ObjectId[]
  color?: string
  createdAt: Date
  updatedAt: Date
}

export interface IBoardColumn {
  id: string
  title: string
  order: number
}

export interface IBoard extends Document {
  _id: Types.ObjectId
  name: string
  project: Types.ObjectId
  columns: IBoardColumn[]
  createdAt: Date
  updatedAt: Date
}

export interface ITask extends Document {
  _id: Types.ObjectId
  title: string
  description?: string
  status: TaskStatus
  priority: TaskPriority
  storyPoints?: number
  board: Types.ObjectId
  project: Types.ObjectId
  columnId: string
  order: number
  assignee?: Types.ObjectId
  reporter: Types.ObjectId
  labels: string[]
  dueDate?: Date
  attachments: ITaskAttachment[]
  checklist: ITaskChecklistItem[]
  createdAt: Date
  updatedAt: Date
}

export interface IComment extends Document {
  _id: Types.ObjectId
  content: string
  task: Types.ObjectId
  author: Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

export interface INotification extends Document {
  _id: Types.ObjectId
  type: NotificationType
  message: string
  read: boolean
  recipient: Types.ObjectId
  metadata?: Record<string, unknown>
  createdAt: Date
}

export interface IActivity extends Document {
  _id: Types.ObjectId
  action: ActivityAction
  actor: Types.ObjectId
  project?: Types.ObjectId
  task?: Types.ObjectId
  comment?: Types.ObjectId
  message: string
  metadata?: Record<string, unknown>
  createdAt: Date
}
