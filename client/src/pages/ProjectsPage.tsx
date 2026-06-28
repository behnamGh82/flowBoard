import { useMemo, useState } from 'react'
import { Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useTranslation } from 'react-i18next'
import { PageHeader } from '@/components/ui/PageHeader'
import { EmptyState } from '@/components/common/EmptyState'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { ProjectFilters } from '@/features/projects/components/ProjectFilters'
import { ProjectGridView } from '@/features/projects/components/ProjectGridView'
import { ProjectTableView } from '@/features/projects/components/ProjectTableView'
import { ProjectFormDialog } from '@/features/projects/components/ProjectFormDialog'
import { useArchiveProject, useDeleteProject, useDuplicateProject, useProjects } from '@/features/projects/hooks/useProjects'
import { useDebounce } from '@/hooks/useDebounce'
import type { ProjectListParams, ProjectViewMode } from '@/constants/project'
import type { Project } from '@/types'

export const ProjectsPage = () => {
  const { t } = useTranslation(['pages', 'common'])
  const [viewMode, setViewMode] = useState<ProjectViewMode>('grid')
  const [filters, setFilters] = useState<ProjectListParams>({ sortBy: 'updatedAt', sortOrder: 'desc' })
  const [dialog, setDialog] = useState<{ open: boolean; mode: 'create' | 'edit'; project?: Project }>({ open: false, mode: 'create' })
  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null)

  const debouncedSearch = useDebounce(filters.search ?? '')
  const queryParams = useMemo(
    () => ({ ...filters, search: debouncedSearch || undefined }),
    [filters, debouncedSearch],
  )

  const { data, isLoading, isError } = useProjects(queryParams)
  const deleteProject = useDeleteProject()
  const duplicateProject = useDuplicateProject()
  const archiveProject = useArchiveProject()

  const projects = data?.data ?? []

  const openCreate = () => setDialog({ open: true, mode: 'create' })
  const openEdit = (project: Project) => setDialog({ open: true, mode: 'edit', project })

  const handleDuplicate = async (project: Project) => {
    await duplicateProject.mutateAsync(project._id)
  }

  const handleArchive = async (project: Project) => {
    await archiveProject.mutateAsync(project._id)
  }

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return
    await deleteProject.mutateAsync(deleteTarget._id)
    setDeleteTarget(null)
  }

  return (
    <>
      <PageHeader title={t('pages:projectsTitle')} subtitle={t('pages:projectsSubtitle')} />
      <ProjectFilters filters={filters} viewMode={viewMode} onFiltersChange={setFilters} onViewModeChange={setViewMode} />
      {isLoading && <LoadingSpinner />}
      {!isLoading && (isError || !projects.length) && (<EmptyState title={t('pages:noProjectsTitle')} description={t('pages:noProjectsDescription')} />)}
      {!isLoading && projects.length > 0 && viewMode === 'grid' && (
        <ProjectGridView projects={projects} onEdit={openEdit} onDelete={setDeleteTarget} onDuplicate={handleDuplicate} onArchive={handleArchive} />
      )}
      {!isLoading && projects.length > 0 && viewMode === 'table' && (
        <ProjectTableView projects={projects} onEdit={openEdit} onDelete={setDeleteTarget} onDuplicate={handleDuplicate} onArchive={handleArchive} />
      )}
      <Fab color="primary" aria-label={t('pages:newProject')} sx={{ position: 'fixed', bottom: 24, right: 24 }} onClick={openCreate}>
        <AddIcon />
      </Fab>
      <ProjectFormDialog open={dialog.open} mode={dialog.mode} project={dialog.project} onClose={() => setDialog({ open: false, mode: 'create' })} />
      <ConfirmDialog open={Boolean(deleteTarget)} title={t('pages:projectDeleteTitle')} message={t('pages:projectDeleteMessage', { name: deleteTarget?.name ?? '' })} confirmLabel={t('pages:projectActionDelete')} cancelLabel={t('common:cancel')} loading={deleteProject.isPending} onConfirm={handleDeleteConfirm} onCancel={() => setDeleteTarget(null)} />
    </>
  )
}
