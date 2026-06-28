import { Comment, Project, Task } from '../models'
import { AppError } from '../middleware/error.middleware'
import { activityService } from './activity.service'

export const commentService = {
  getAll: async (userId: string) => {
    const projectIds = await Project.find({
      $or: [{ owner: userId }, { members: userId }],
    }).distinct('_id')
    const taskIds = await Task.find({ project: { $in: projectIds } }).distinct('_id')

    return Comment.find({ task: { $in: taskIds } })
      .populate('author', 'name email avatar role')
      .populate('task', 'title status priority')
      .sort({ createdAt: -1 })
      .limit(50)
  },

  getByTask: async (taskId: string) => {
    return Comment.find({ task: taskId })
      .populate('author', 'name email avatar')
      .sort({ createdAt: -1 })
  },

  create: async (userId: string, content: string, taskId: string) => {
    const comment = await Comment.create({ content, task: taskId, author: userId })
    const task = await Task.findById(taskId)

    if (task) {
      await activityService.record({
        action: 'comment_added',
        actor: userId,
        project: task.project.toString(),
        task: task._id.toString(),
        comment: comment._id.toString(),
        message: `Comment added to "${task.title}"`,
      })
    }

    return comment
  },

  delete: async (id: string, userId: string) => {
    const comment = await Comment.findOneAndDelete({ _id: id, author: userId })
    if (!comment) throw new AppError('Comment not found or unauthorized', 404)
  },
}
