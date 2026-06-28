import { Project, Board } from '../models'
import { AppError } from '../middleware/error.middleware'
import { paginate, paginatedResponse } from '../utils/helpers'
import { activityService } from './activity.service'
import type { AuthRequest } from '../types'

export const projectService = {
  getAll: async (req: AuthRequest, search?: string, page = 1, limit = 20) => {
    const { skip, page: p, limit: l } = paginate(page, limit)
    const filter: Record<string, unknown> = {
      $or: [
        { owner: req.user!.id },
        { members: req.user!.id },
      ],
    }
    if (search) {
      filter.name = { $regex: search, $options: 'i' }
    }

    const [data, total] = await Promise.all([
      Project.find(filter).populate('owner', 'name email avatar').skip(skip).limit(l).sort({ updatedAt: -1 }),
      Project.countDocuments(filter),
    ])

    return paginatedResponse(data, total, p, l)
  },

  getById: async (id: string, userId: string) => {
    const project = await Project.findOne({
      _id: id,
      $or: [{ owner: userId }, { members: userId }],
    }).populate('owner members', 'name email avatar role')

    if (!project) throw new AppError('Project not found', 404)
    return project
  },

  create: async (
    userId: string,
    payload: { name: string; key: string; description?: string; color?: string },
  ) => {
    const existing = await Project.findOne({ key: payload.key })
    if (existing) throw new AppError('Project key already exists', 409)

    const project = await Project.create({
      ...payload,
      owner: userId,
      members: [userId],
    })

    await Board.create({
      name: 'Main Board',
      project: project._id,
    })

    await activityService.record({
      action: 'project_created',
      actor: userId,
      project: project._id.toString(),
      message: `Project "${project.name}" was created`,
    })

    return project
  },

  update: async (id: string, userId: string, payload: Partial<{ name: string; description: string; status: string; color: string }>) => {
    const project = await Project.findOneAndUpdate(
      { _id: id, owner: userId },
      payload,
      { new: true, runValidators: true },
    )
    if (!project) throw new AppError('Project not found or unauthorized', 404)
    return project
  },

  delete: async (id: string, userId: string) => {
    const project = await Project.findOneAndDelete({ _id: id, owner: userId })
    if (!project) throw new AppError('Project not found or unauthorized', 404)
  },
}
