import { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { MainLayout } from '@/layouts/MainLayout'
import { AuthLayout } from '@/layouts/AuthLayout'
import { ProtectedRoute, PublicRoute, SuspenseFallback } from '@/routes/ProtectedRoute'
import { routePermissions } from '@/routes/roles'

const DashboardPage = lazy(() =>
  import('@/pages/DashboardPage').then((m) => ({ default: m.DashboardPage })),
)
const ProjectsPage = lazy(() =>
  import('@/pages/ProjectsPage').then((m) => ({ default: m.ProjectsPage })),
)
const BoardsPage = lazy(() =>
  import('@/pages/BoardsPage').then((m) => ({ default: m.BoardsPage })),
)
const TasksPage = lazy(() =>
  import('@/pages/TasksPage').then((m) => ({ default: m.TasksPage })),
)
const UsersPage = lazy(() =>
  import('@/pages/UsersPage').then((m) => ({ default: m.UsersPage })),
)
const NotificationsPage = lazy(() =>
  import('@/pages/NotificationsPage').then((m) => ({ default: m.NotificationsPage })),
)
const SettingsPage = lazy(() =>
  import('@/pages/SettingsPage').then((m) => ({ default: m.SettingsPage })),
)
const LoginPage = lazy(() =>
  import('@/pages/LoginPage').then((m) => ({ default: m.LoginPage })),
)
const RegisterPage = lazy(() =>
  import('@/pages/RegisterPage').then((m) => ({ default: m.RegisterPage })),
)
const ForgotPasswordPage = lazy(() =>
  import('@/pages/ForgotPasswordPage').then((m) => ({ default: m.ForgotPasswordPage })),
)
const ResetPasswordPage = lazy(() =>
  import('@/pages/ResetPasswordPage').then((m) => ({ default: m.ResetPasswordPage })),
)
const UnauthorizedPage = lazy(() =>
  import('@/pages/UnauthorizedPage').then((m) => ({ default: m.UnauthorizedPage })),
)

const withSuspense = (element: React.ReactNode) => (
  <Suspense fallback={<SuspenseFallback />}>{element}</Suspense>
)

export const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { index: true, element: <Navigate to="/dashboard" replace /> },
          { path: 'dashboard', element: withSuspense(<DashboardPage />) },
          {
            path: 'projects',
            element: (
              <ProtectedRoute allowedRoles={routePermissions.management}>
                {withSuspense(<ProjectsPage />)}
              </ProtectedRoute>
            ),
          },
          {
            path: 'boards',
            element: (
              <ProtectedRoute allowedRoles={routePermissions.delivery}>
                {withSuspense(<BoardsPage />)}
              </ProtectedRoute>
            ),
          },
          {
            path: 'tasks',
            element: (
              <ProtectedRoute allowedRoles={routePermissions.delivery}>
                {withSuspense(<TasksPage />)}
              </ProtectedRoute>
            ),
          },
          {
            path: 'users',
            element: (
              <ProtectedRoute allowedRoles={routePermissions.adminOnly}>
                {withSuspense(<UsersPage />)}
              </ProtectedRoute>
            ),
          },
          { path: 'notifications', element: withSuspense(<NotificationsPage />) },
          {
            path: 'settings',
            element: (
              <ProtectedRoute allowedRoles={routePermissions.adminOnly}>
                {withSuspense(<SettingsPage />)}
              </ProtectedRoute>
            ),
          },
          { path: 'unauthorized', element: withSuspense(<UnauthorizedPage />) },
        ],
      },
    ],
  },
  {
    element: <PublicRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: 'login', element: withSuspense(<LoginPage />) },
          { path: 'register', element: withSuspense(<RegisterPage />) },
          { path: 'forgot-password', element: withSuspense(<ForgotPasswordPage />) },
          { path: 'reset-password', element: withSuspense(<ResetPasswordPage />) },
        ],
      },
    ],
  },
  { path: '*', element: <Navigate to="/dashboard" replace /> },
])
