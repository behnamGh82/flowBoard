import { useQuery } from '@tanstack/react-query'
import { userService } from '@/features/users/services/user.service'

export const userKeys = {
  all: ['users'] as const,
  list: (params?: { page?: number; search?: string }) =>
    [...userKeys.all, 'list', params] as const,
  detail: (id: string) => [...userKeys.all, 'detail', id] as const,
  options: (search?: string) => [...userKeys.all, 'options', search] as const,
}

export const useUsers = (params?: { page?: number; search?: string }) =>
  useQuery({
    queryKey: userKeys.list(params),
    queryFn: () => userService.getAll(params),
  })

export const useUserOptions = (search?: string) =>
  useQuery({
    queryKey: userKeys.options(search),
    queryFn: () => userService.getOptions({ search, limit: 25 }),
  })

export const useUser = (id: string) =>
  useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => userService.getById(id),
    enabled: !!id,
  })
