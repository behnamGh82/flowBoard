import { Notification } from '../models'
import { AppError } from '../middleware/error.middleware'
import { paginate, paginatedResponse } from '../utils/helpers'

export const notificationService = {
  getAll: async (userId: string, unreadOnly?: boolean, page = 1, limit = 20) => {
    const { skip, page: p, limit: l } = paginate(page, limit)
    const filter: Record<string, unknown> = { recipient: userId }
    if (unreadOnly) filter.read = false

    const [data, total] = await Promise.all([
      Notification.find(filter).skip(skip).limit(l).sort({ createdAt: -1 }),
      Notification.countDocuments(filter),
    ])

    return paginatedResponse(data, total, p, l)
  },

  markAsRead: async (id: string, userId: string) => {
    const notification = await Notification.findOneAndUpdate(
      { _id: id, recipient: userId },
      { read: true },
      { new: true },
    )
    if (!notification) throw new AppError('Notification not found', 404)
    return notification
  },

  markAllAsRead: async (userId: string) => {
    await Notification.updateMany({ recipient: userId, read: false }, { read: true })
  },
}
