import { Response, NextFunction } from 'express'
import { projectService } from '../services/project.service'
import { sendSuccess } from '../services/auth.service'
import { getParam } from '../utils/params'
import type { AuthRequest } from '../types'

export const projectController = {
  getAll: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { search, page, limit } = req.query
      const result = await projectService.getAll(
        req,
        search as string | undefined,
        Number(page) || 1,
        Number(limit) || 20,
      )
      sendSuccess(res, result)
    } catch (error) {
      next(error)
    }
  },

  getById: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const project = await projectService.getById(getParam(req.params.id), req.user!.id)
      sendSuccess(res, project)
    } catch (error) {
      next(error)
    }
  },

  create: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const project = await projectService.create(req.user!.id, req.body)
      sendSuccess(res, project, 201)
    } catch (error) {
      next(error)
    }
  },

  update: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const project = await projectService.update(getParam(req.params.id), req.user!.id, req.body)
      sendSuccess(res, project)
    } catch (error) {
      next(error)
    }
  },

  delete: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      await projectService.delete(getParam(req.params.id), req.user!.id)
      sendSuccess(res, null, 204)
    } catch (error) {
      next(error)
    }
  },
}
