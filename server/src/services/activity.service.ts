import { Activity, Project } from '../models'
import { paginate, paginatedResponse } from '../utils/helpers'

export const activityService = {
  getTimeline: async (
    userId: string,
    params: { page?: number; limit?: number; project?: string },
  ) => {
    const { skip, page, limit } = paginate(params.page, params.limit)
    const accessibleProjectIds = await Project.find({
      $or: [{ owner: userId }, { members: userId }],
    }).distinct('_id')

    const filter: Record<string, unknown> = {
      $or: [
        { project: { $in: accessibleProjectIds } },
        { actor: userId },
      ],
    }

    if (params.project) {
      filter.project = params.project
    }

    const [data, total] = await Promise.all([
      Activity.find(filter)
        .populate('actor', 'name email avatar role')
        .populate('project', 'name key color')
        .populate('task', 'title status priority')
        .populate('comment', 'content')
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }),
      Activity.countDocuments(filter),
    ])

    return paginatedResponse(data, total, page, limit)
  },

  record: async (payload: {
    action: string
    actor: string
    message: string
    project?: string
    task?: string
    comment?: string
    metadata?: Record<string, unknown>
  }) => {
    return Activity.create(payload)
  },
}
