import { Project, Task } from '../models'

export const calendarService = {
  getEvents: async (
    userId: string,
    params: { start?: Date; end?: Date; project?: string },
  ) => {
    const projectFilter = params.project
      ? { _id: params.project, $or: [{ owner: userId }, { members: userId }] }
      : { $or: [{ owner: userId }, { members: userId }] }

    const projectIds = await Project.find(projectFilter).distinct('_id')
    const dueDateFilter: Record<string, unknown> = { $exists: true }

    if (params.start) dueDateFilter.$gte = params.start
    if (params.end) dueDateFilter.$lte = params.end

    const tasks = await Task.find({
      project: { $in: projectIds },
      dueDate: dueDateFilter,
    })
      .populate('project', 'name key color')
      .sort({ dueDate: 1 })

    return tasks.map((task) => ({
      _id: task._id.toString(),
      title: task.title,
      description: task.description,
      start: task.dueDate,
      type: 'task_due',
      project: task.project,
      task: task._id,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    }))
  },
}
