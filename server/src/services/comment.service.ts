import { Comment } from '../models'
import { AppError } from '../middleware/error.middleware'

export const commentService = {
  getByTask: async (taskId: string) => {
    return Comment.find({ task: taskId })
      .populate('author', 'name email avatar')
      .sort({ createdAt: -1 })
  },

  create: async (userId: string, content: string, taskId: string) => {
    return Comment.create({ content, task: taskId, author: userId })
  },

  delete: async (id: string, userId: string) => {
    const comment = await Comment.findOneAndDelete({ _id: id, author: userId })
    if (!comment) throw new AppError('Comment not found or unauthorized', 404)
  },
}
