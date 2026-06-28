import { User } from '../models'
import { AppError } from '../middleware/error.middleware'
import { paginate, paginatedResponse } from '../utils/helpers'

export const userService = {
  getAll: async (search?: string, page = 1, limit = 20) => {
    const { skip, page: p, limit: l } = paginate(page, limit)
    const filter = search ? { name: { $regex: search, $options: 'i' } } : {}

    const [data, total] = await Promise.all([
      User.find(filter).select('-password').skip(skip).limit(l).sort({ name: 1 }),
      User.countDocuments(filter),
    ])

    return paginatedResponse(data, total, p, l)
  },

  getById: async (id: string) => {
    const user = await User.findById(id).select('-password')
    if (!user) throw new AppError('User not found', 404)
    return user
  },

  getOptions: async (search?: string, limit = 20) => {
    const filter = search
      ? {
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
          ],
        }
      : {}

    return User.find(filter).select('name email avatar role').limit(limit).sort({ name: 1 })
  },
}
