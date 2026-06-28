import dotenv from 'dotenv'
import mongoose from 'mongoose'
import {
  User,
  Project,
  Board,
  Task,
  Comment,
  Notification,
  Activity,
} from '../models'
import { DEFAULT_BOARD_COLUMNS } from '../constants/board'
import { COLUMN_TO_STATUS } from '../constants/board'

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/flowboard'

const daysFromNow = (days: number) => {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return date
}

interface TaskSeedDef {
  title: string
  description?: string
  columnId: string
  priority: 'lowest' | 'low' | 'medium' | 'high' | 'highest'
  storyPoints?: number
  labels?: string[]
  assignee?: mongoose.Types.ObjectId
  dueDate?: Date
  checklist?: { id: string; text: string; done: boolean; order: number }[]
}

interface ProjectSeedDef {
  name: string
  key: string
  description: string
  status: 'planning' | 'active' | 'on_hold' | 'completed' | 'archived'
  priority: 'low' | 'medium' | 'high'
  visibility: 'private' | 'team' | 'public'
  icon: string
  color: string
  startDate?: Date
  deadline?: Date
  owner: mongoose.Types.ObjectId
  members: mongoose.Types.ObjectId[]
  tasks: TaskSeedDef[]
}

const seed = async () => {
  await mongoose.connect(MONGODB_URI)
  console.log('Connected to MongoDB')

  await Promise.all([
    Activity.deleteMany({}),
    Notification.deleteMany({}),
    Comment.deleteMany({}),
    Task.deleteMany({}),
    Board.deleteMany({}),
    Project.deleteMany({}),
    User.deleteMany({}),
  ])
  console.log('Cleared existing data')

  const [admin, pm, dev1, dev2] = await User.create([
    {
      name: 'Admin User',
      email: 'admin@flowboard.com',
      password: 'password123',
      role: 'admin',
    },
    {
      name: 'Sara Manager',
      email: 'pm@flowboard.com',
      password: 'password123',
      role: 'project_manager',
    },
    {
      name: 'Ali Developer',
      email: 'dev1@flowboard.com',
      password: 'password123',
      role: 'developer',
    },
    {
      name: 'Mina Developer',
      email: 'dev2@flowboard.com',
      password: 'password123',
      role: 'developer',
    },
  ])

  const projectDefs: ProjectSeedDef[] = [
    {
      name: 'FlowBoard Platform',
      key: 'FLW',
      description: 'Core project management platform with Kanban, dashboard, and team collaboration.',
      status: 'active' as const,
      priority: 'high' as const,
      visibility: 'team' as const,
      icon: '🚀',
      color: '#4F46E5',
      startDate: daysFromNow(-30),
      deadline: daysFromNow(45),
      owner: admin._id,
      members: [admin._id, pm._id, dev1._id, dev2._id],
      tasks: [
        {
          title: 'Design dashboard layout',
          description: 'Create wireframes and UI mockups for the main dashboard.',
          columnId: 'in_progress',
          priority: 'high' as const,
          storyPoints: 5,
          labels: ['ui', 'dashboard'],
          assignee: dev1._id,
          dueDate: daysFromNow(3),
          checklist: [
            { id: '1', text: 'Stats cards wireframe', done: true, order: 0 },
            { id: '2', text: 'Chart section layout', done: false, order: 1 },
          ],
        },
        {
          title: 'Implement Kanban drag and drop',
          description: 'Integrate @dnd-kit for column-based task movement.',
          columnId: 'in_review',
          priority: 'highest' as const,
          storyPoints: 8,
          labels: ['frontend', 'kanban'],
          assignee: dev2._id,
          dueDate: daysFromNow(5),
        },
        {
          title: 'Set up authentication flow',
          columnId: 'done',
          priority: 'medium' as const,
          storyPoints: 3,
          labels: ['auth'],
          assignee: dev1._id,
        },
        {
          title: 'Write API documentation',
          columnId: 'todo',
          priority: 'low' as const,
          storyPoints: 2,
          labels: ['docs'],
          assignee: pm._id,
          dueDate: daysFromNow(10),
        },
        {
          title: 'Research notification system',
          columnId: 'backlog',
          priority: 'lowest' as const,
          labels: ['research'],
        },
      ],
    },
    {
      name: 'Mobile App',
      key: 'MOB',
      description: 'Cross-platform mobile companion app for FlowBoard.',
      status: 'active' as const,
      priority: 'medium' as const,
      visibility: 'team' as const,
      icon: '📱',
      color: '#059669',
      startDate: daysFromNow(-14),
      deadline: daysFromNow(60),
      owner: pm._id,
      members: [pm._id, dev1._id, dev2._id],
      tasks: [
        {
          title: 'Push notification integration',
          columnId: 'in_progress',
          priority: 'high' as const,
          storyPoints: 5,
          labels: ['mobile', 'notifications'],
          assignee: dev2._id,
          dueDate: daysFromNow(7),
        },
        {
          title: 'Offline task sync',
          columnId: 'todo',
          priority: 'medium' as const,
          storyPoints: 8,
          labels: ['mobile', 'sync'],
          assignee: dev1._id,
          dueDate: daysFromNow(14),
        },
        {
          title: 'App icon and splash screen',
          columnId: 'done',
          priority: 'low' as const,
          storyPoints: 1,
          labels: ['design'],
          assignee: pm._id,
        },
      ],
    },
    {
      name: 'API Gateway',
      key: 'API',
      description: 'Centralized API gateway for microservices routing and rate limiting.',
      status: 'on_hold' as const,
      priority: 'low' as const,
      visibility: 'private' as const,
      icon: '🔧',
      color: '#DC2626',
      startDate: daysFromNow(-7),
      deadline: daysFromNow(90),
      owner: admin._id,
      members: [admin._id, dev1._id],
      tasks: [
        {
          title: 'Rate limiting middleware',
          columnId: 'backlog',
          priority: 'medium' as const,
          storyPoints: 5,
          labels: ['backend', 'security'],
          assignee: dev1._id,
        },
        {
          title: 'Service discovery setup',
          columnId: 'backlog',
          priority: 'low' as const,
          storyPoints: 3,
          labels: ['infra'],
        },
      ],
    },
  ]

  for (const def of projectDefs) {
    const project = await Project.create({
      name: def.name,
      key: def.key,
      description: def.description,
      status: def.status,
      priority: def.priority,
      visibility: def.visibility,
      icon: def.icon,
      color: def.color,
      startDate: def.startDate,
      deadline: def.deadline,
      owner: def.owner,
      members: def.members,
    })

    const board = await Board.create({
      name: 'Main Board',
      project: project._id,
      columns: DEFAULT_BOARD_COLUMNS,
    })

    await Activity.create({
      action: 'project_created',
      actor: def.owner,
      project: project._id,
      message: `Project "${project.name}" was created`,
    })

    const createdTasks = []
    for (let i = 0; i < def.tasks.length; i++) {
      const taskDef = def.tasks[i]
      const task = await Task.create({
        title: taskDef.title,
        description: taskDef.description,
        status: COLUMN_TO_STATUS[taskDef.columnId] ?? 'backlog',
        priority: taskDef.priority,
        storyPoints: taskDef.storyPoints,
        board: board._id,
        project: project._id,
        columnId: taskDef.columnId,
        order: i,
        assignee: taskDef.assignee,
        reporter: def.owner,
        labels: taskDef.labels ?? [],
        dueDate: taskDef.dueDate,
        checklist: taskDef.checklist ?? [],
      })
      createdTasks.push(task)

      await Activity.create({
        action: 'task_created',
        actor: def.owner,
        project: project._id,
        task: task._id,
        message: `Task "${task.title}" was created`,
      })
    }

    if (createdTasks[0]) {
      await Comment.create({
        content: 'Wireframes look great! Let us finalize the chart section next.',
        task: createdTasks[0]._id,
        author: pm._id,
      })

      await Activity.create({
        action: 'comment_added',
        actor: pm._id,
        project: project._id,
        task: createdTasks[0]._id,
        message: `Comment added on "${createdTasks[0].title}"`,
      })
    }

    if (createdTasks[1]) {
      await Notification.create({
        type: 'task_assigned',
        message: `You were assigned to "${createdTasks[1].title}" in ${project.name}`,
        read: false,
        recipient: dev2._id,
        metadata: { projectId: project._id, taskId: createdTasks[1]._id },
      })
    }
  }

  await Notification.create([
    {
      type: 'project_invite',
      message: 'You were invited to FlowBoard Platform',
      read: false,
      recipient: dev1._id,
    },
    {
      type: 'task_updated',
      message: 'Kanban drag and drop is ready for review',
      read: true,
      recipient: pm._id,
    },
    {
      type: 'comment_added',
      message: 'New comment on Design dashboard layout',
      read: false,
      recipient: dev1._id,
    },
  ])

  console.log('\nSeed completed successfully!\n')
  console.log('Demo accounts (password: password123):')
  console.log('  admin@flowboard.com  — admin')
  console.log('  pm@flowboard.com     — project_manager')
  console.log('  dev1@flowboard.com   — developer')
  console.log('  dev2@flowboard.com   — developer')
  console.log(`\nCreated ${projectDefs.length} projects with boards, tasks, comments, and notifications.`)

  await mongoose.disconnect()
}

seed().catch((error) => {
  console.error('Seed failed:', error)
  process.exit(1)
})
