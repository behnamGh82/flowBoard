import { Server as HttpServer } from 'http'
import { Server, Socket } from 'socket.io'
import jwt from 'jsonwebtoken'
import { env } from '../config/env'

export enum SocketEvents {
  TASK_UPDATED = 'task:updated',
  TASK_CREATED = 'task:created',
  COMMENT_ADDED = 'comment:added',
  NOTIFICATION = 'notification:new',
  USER_ONLINE = 'user:online',
  USER_OFFLINE = 'user:offline',
}

interface AuthenticatedSocket extends Socket {
  userId?: string
}

let io: Server | null = null

export const initSocket = (httpServer: HttpServer): Server => {
  io = new Server(httpServer, {
    cors: {
      origin: env.clientUrl,
      methods: ['GET', 'POST'],
    },
  })

  io.use((socket: AuthenticatedSocket, next) => {
    const token = socket.handshake.auth?.token as string | undefined
    if (!token) return next(new Error('Authentication required'))

    try {
      const decoded = jwt.verify(token, env.jwtSecret) as { id: string }
      socket.userId = decoded.id
      next()
    } catch {
      next(new Error('Invalid token'))
    }
  })

  io.on('connection', (socket: AuthenticatedSocket) => {
    const userId = socket.userId!
    socket.join(`user:${userId}`)
    io!.emit(SocketEvents.USER_ONLINE, { userId })

    socket.on('join:project', (projectId: string) => {
      socket.join(`project:${projectId}`)
    })

    socket.on('leave:project', (projectId: string) => {
      socket.leave(`project:${projectId}`)
    })

    socket.on('join:board', (boardId: string) => {
      socket.join(`board:${boardId}`)
    })

    socket.on('disconnect', () => {
      io!.emit(SocketEvents.USER_OFFLINE, { userId })
    })
  })

  return io
}

export const getIO = (): Server => {
  if (!io) throw new Error('Socket.io not initialized')
  return io
}

export const emitToProject = (projectId: string, event: SocketEvents, data: unknown) => {
  getIO().to(`project:${projectId}`).emit(event, data)
}

export const emitToBoard = (boardId: string, event: SocketEvents, data: unknown) => {
  getIO().to(`board:${boardId}`).emit(event, data)
}

export const emitToUser = (userId: string, event: SocketEvents, data: unknown) => {
  getIO().to(`user:${userId}`).emit(event, data)
}
