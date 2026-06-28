import jwt from 'jsonwebtoken'
import { Response, NextFunction } from 'express'
import { env } from '../config/env'
import type { AuthRequest } from '../types'

interface JwtPayload {
  id: string
  email: string
  role: string
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  const header = req.headers.authorization
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Authentication required' })
  }

  const token = header.split(' ')[1]
  try {
    const decoded = jwt.verify(token, env.jwtSecret) as JwtPayload
    req.user = decoded
    next()
  } catch {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' })
  }
}

export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: 'Insufficient permissions' })
    }
    next()
  }
}
