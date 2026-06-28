import { Project, Board, Task } from '../models'
import { AppError } from '../middleware/error.middleware'
import { paginate, paginatedResponse } from '../utils/helpers'
import { activityService } from './activity.service'
import { DEFAULT_BOARD_COLUMNS } from '../constants/board'
import type { AuthRequest, ProjectPriority, ProjectStatus, ProjectVisibility } from '../types'

export interface ProjectListQuery {
  search?: string
  status?: string
  owner?: string
  member?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  page?: number
  limit?: number
}

export interface ProjectPayload {
  name: string
  key?: string
  description?: string
  color?: string
  icon?: string
  startDate?: string
  deadline?: string
  visibility?: ProjectVisibility
  priority?: ProjectPriority
  status?: ProjectStatus
  members?: string[]
  coverImage?: string
}

const deriveProjectKey = (name: string) =>
  name
    .replace(/[^a-zA-Z]/g, '')
    .toUpperCase()
    .slice(0, 6) || 'PRJ'

const generateUniqueKey = async (baseKey: string) => {
  let candidate = baseKey.slice(0, 6)
  let suffix = 1
  while (await Project.exists({ key: candidate })) {
    candidate = `${baseKey.slice(0, 4)}${suffix}`.slice(0, 6)
    suffix += 1
  }
  return candidate
}

const buildAccessFilter = (userId: string) => ({
  $or: [{ owner: userId }, { members: userId }],
})

const buildListFilter = (req: AuthRequest, query: ProjectListQuery) => {
  const conditions: Record<string, unknown>[] = [buildAccessFilter(req.user!.id)]

  if (query.search) {
    conditions.push({ name: { $regex: query.search, $options: 'i' } })
  }
  if (query.status) {
    conditions.push({ status: query.status })
  }
  if (query.owner) {
    conditions.push({ owner: query.owner })
  }
  if (query.member) {
    conditions.push({ members: query.member })
  }

  return conditions.length > 1 ? { $and: conditions } : conditions[0]
}

const buildSort = (sortBy?: string, sortOrder: 'asc' | 'desc' = 'desc') => {
  const direction = sortOrder === 'asc' ? 1 : -1
  const allowed = ['createdAt', 'updatedAt', 'deadline', 'name'] as const
  const field = allowed.includes(sortBy as (typeof allowed)[number]) ? sortBy! : 'updatedAt'
  return { [field]: direction } as Record<string, 1 | -1>
}

const attachTaskStats = async <T extends { _id: unknown }>(projects: T[]) => {
  if (!projects.length) return projects.map((project) => ({ ...project, totalTasks: 0, completedTasks: 0 }))

  const ids = projects.map((project) => project._id)
  const stats = await Task.aggregate<{ _id: typeof ids[number]; totalTasks: number; completedTasks: number }>([
    { $match: { project: { $in: ids } } },
    {
      $group: {
        _id: '$project',
        totalTasks: { $sum: 1 },
        completedTasks: {
          $sum: { $cond: [{ $eq: ['$status', 'done'] }, 1, 0] },
        },
      },
    },
  ])

  const statsMap = new Map(stats.map((item) => [String(item._id), item]))

  return projects.map((project) => {
    const projectStats = statsMap.get(String(project._id))
    return {
      ...project,
      totalTasks: projectStats?.totalTasks ?? 0,
      completedTasks: projectStats?.completedTasks ?? 0,
    }
  })
}

const normalizeMembers = (userId: string, members?: string[]) => {
  const unique = new Set([userId, ...(members ?? [])])
  return Array.from(unique)
}

export const projectService = {
  getAll: async (req: AuthRequest, query: ProjectListQuery = {}) => {
    const { skip, page, limit } = paginate(query.page, query.limit)
    const filter = buildListFilter(req, query)
    const sort = buildSort(query.sortBy, query.sortOrder)

    const [rawData, total] = await Promise.all([
      Project.find(filter)
        .populate('owner', 'name email avatar')
        .populate('members', 'name email avatar')
        .skip(skip)
        .limit(limit)
        .sort(sort)
        .lean(),
      Project.countDocuments(filter),
    ])

    const data = await attachTaskStats(rawData)
    return paginatedResponse(data, total, page, limit)
  },

  getById: async (id: string, userId: string) => {
    const project = await Project.findOne({
      _id: id,
      ...buildAccessFilter(userId),
    })
      .populate('owner', 'name email avatar role')
      .populate('members', 'name email avatar role')
      .lean()

    if (!project) throw new AppError('Project not found', 404)

    const [withStats] = await attachTaskStats([project])
    return withStats
  },

  create: async (userId: string, payload: ProjectPayload) => {
    const key = payload.key
      ? payload.key.toUpperCase()
      : await generateUniqueKey(deriveProjectKey(payload.name))

    const existing = await Project.findOne({ key })
    if (existing) throw new AppError('Project key already exists', 409)

    const members = normalizeMembers(userId, payload.members)

    const project = await Project.create({
      name: payload.name,
      key,
      description: payload.description,
      color: payload.color,
      icon: payload.icon,
      startDate: payload.startDate,
      deadline: payload.deadline,
      visibility: payload.visibility ?? 'team',
      priority: payload.priority ?? 'medium',
      status: payload.status ?? 'planning',
      coverImage: payload.coverImage,
      owner: userId,
      members,
    })

    await Board.create({
      name: 'Main Board',
      project: project._id,
      columns: DEFAULT_BOARD_COLUMNS,
    })

    await activityService.record({
      action: 'project_created',
      actor: userId,
      project: project._id.toString(),
      message: `Project "${project.name}" was created`,
    })

    const populated = await Project.findById(project._id)
      .populate('owner members', 'name email avatar')
      .lean()

    const [withStats] = await attachTaskStats([populated!])
    return withStats
  },

  update: async (id: string, userId: string, payload: Partial<ProjectPayload>) => {
    const updatePayload: Record<string, unknown> = { ...payload }

    if (payload.members) {
      updatePayload.members = normalizeMembers(userId, payload.members)
    }

    const project = await Project.findOneAndUpdate(
      { _id: id, owner: userId },
      updatePayload,
      { new: true, runValidators: true },
    )
      .populate('owner members', 'name email avatar')
      .lean()

    if (!project) throw new AppError('Project not found or unauthorized', 404)

    const [withStats] = await attachTaskStats([project])
    return withStats
  },

  archive: async (id: string, userId: string) => {
    const project = await Project.findOneAndUpdate(
      { _id: id, owner: userId },
      { status: 'archived' },
      { new: true, runValidators: true },
    )
      .populate('owner members', 'name email avatar')
      .lean()

    if (!project) throw new AppError('Project not found or unauthorized', 404)

    const [withStats] = await attachTaskStats([project])
    return withStats
  },

  duplicate: async (id: string, userId: string) => {
    const original = await Project.findOne({ _id: id, ...buildAccessFilter(userId) }).lean()
    if (!original) throw new AppError('Project not found', 404)

    const key = await generateUniqueKey(`${original.key}CP`.slice(0, 6))
    const duplicate = await Project.create({
      name: `${original.name} (Copy)`,
      key,
      description: original.description,
      color: original.color,
      icon: original.icon,
      startDate: original.startDate,
      deadline: original.deadline,
      visibility: original.visibility,
      priority: original.priority,
      status: 'planning',
      coverImage: original.coverImage,
      owner: userId,
      members: normalizeMembers(userId, original.members.map(String)),
    })

    const boards = await Board.find({ project: original._id }).lean()
    for (const board of boards) {
      const newBoard = await Board.create({
        name: board.name,
        project: duplicate._id,
        columns: board.columns?.length ? board.columns : DEFAULT_BOARD_COLUMNS,
      })

      const tasks = await Task.find({ board: board._id }).lean()
      if (tasks.length) {
        await Task.insertMany(
          tasks.map((task, index) => ({
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            storyPoints: task.storyPoints,
            board: newBoard._id,
            project: duplicate._id,
            columnId: task.columnId,
            order: index,
            assignee: task.assignee,
            reporter: userId,
            labels: task.labels,
            dueDate: task.dueDate,
            checklist: task.checklist,
          })),
        )
      }
    }

    if (!boards.length) {
      await Board.create({
        name: 'Main Board',
        project: duplicate._id,
        columns: DEFAULT_BOARD_COLUMNS,
      })
    }

    await activityService.record({
      action: 'project_created',
      actor: userId,
      project: duplicate._id.toString(),
      message: `Project "${duplicate.name}" was duplicated`,
    })

    const populated = await Project.findById(duplicate._id)
      .populate('owner members', 'name email avatar')
      .lean()

    const [withStats] = await attachTaskStats([populated!])
    return withStats
  },

  delete: async (id: string, userId: string) => {
    const project = await Project.findOne({ _id: id, owner: userId })
    if (!project) throw new AppError('Project not found or unauthorized', 404)

    const boardIds = (await Board.find({ project: id }).select('_id')).map((board) => board._id)

    await Promise.all([
      Task.deleteMany({ $or: [{ project: id }, { board: { $in: boardIds } }] }),
      Board.deleteMany({ project: id }),
      Project.deleteOne({ _id: id }),
    ])
  },
}
