import { io, type Socket } from 'socket.io-client'
import { storage } from '@/utils/storage'

let socket: Socket | null = null

export const SocketEvents = {
  TASK_UPDATED: 'task:updated',
  TASK_CREATED: 'task:created',
  COMMENT_ADDED: 'comment:added',
  NOTIFICATION: 'notification:new',
  USER_ONLINE: 'user:online',
  USER_OFFLINE: 'user:offline',
} as const

export type SocketEvent = (typeof SocketEvents)[keyof typeof SocketEvents]

export const getSocket = (): Socket | null => socket

export const connectSocket = () => {
  if (socket?.connected) return socket

  const token = storage.getToken()
  const url = import.meta.env.VITE_SOCKET_URL ?? 'http://localhost:5000'

  socket = io(url, {
    autoConnect: false,
    auth: { token },
    transports: ['websocket'],
  })

  return socket
}

export const disconnectSocket = () => {
  socket?.disconnect()
  socket = null
}
