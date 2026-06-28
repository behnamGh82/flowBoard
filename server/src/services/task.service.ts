import { Task } from '../models'
import { AppError } from '../middleware/error.middleware'
import { paginate, paginatedResponse } from '../utils/helpers'
import { COLUMN_TO_STATUS } from '../constants/board'
import { activityService } from './activity.service'

export const taskService = {
  getAll: async (params: { board?: string; project?: string; page?: number; limit?: number }) => {
    const { skip, page, limit } = paginate(params.page, params.limit)
    const filter: Record<string, unknown> = {}
    if (params.board) filter.board = params.board
    if (params.project) filter.project = params.project

    const [data, total] = await Promise.all([
      Task.find(filter)
        .populate('assignee reporter', 'name email avatar')
        .skip(skip)
        .limit(limit)
        .sort({ order: 1 }),
      Task.countDocuments(filter),
    ])

    return paginatedResponse(data, total, page, limit)
  },

  getByBoard: async (boardId: string) => {
    return Task.find({ board: boardId })
      .populate('assignee reporter', 'name email avatar')
      .sort({ columnId: 1, order: 1 })
  },

  getById: async (id: string) => {
    const task = await Task.findById(id).populate('assignee reporter', 'name email avatar')
    if (!task) throw new AppError('Task not found', 404)
    return task
  },

  create: async (userId: string, payload: Record<string, unknown>) => {
    const task = await Task.create({ ...payload, reporter: userId })

    await activityService.record({
      action: 'task_created',
      actor: userId,
      project: task.project.toString(),
      task: task._id.toString(),
      message: `Task "${task.title}" was created`,
    })

    return task
  },

  update: async (id: string, payload: Record<string, unknown>, actorId?: string) => {
    const task = await Task.findByIdAndUpdate(id, payload, { new: true, runValidators: true })
    if (!task) throw new AppError('Task not found', 404)

    if (actorId) {
      await activityService.record({
        action: 'task_updated',
        actor: actorId,
        project: task.project.toString(),
        task: task._id.toString(),
        message: `Task "${task.title}" was updated`,
      })
    }

    return task
  },

  move: async (id: string, columnId: string, order: number, actorId?: string) => {
    const status = COLUMN_TO_STATUS[columnId] ?? 'todo'
    const task = await Task.findByIdAndUpdate(
      id,
      { columnId, order, status },
      { new: true },
    )
    if (!task) throw new AppError('Task not found', 404)

    if (actorId) {
      await activityService.record({
        action: 'task_moved',
        actor: actorId,
        project: task.project.toString(),
        task: task._id.toString(),
        message: `Task "${task.title}" was moved to ${columnId}`,
        metadata: { columnId, order },
      })
    }

    return task
  },

  delete: async (id: string) => {
    const task = await Task.findByIdAndDelete(id)
    if (!task) throw new AppError('Task not found', 404)
  },
}
