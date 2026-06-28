import { useState } from 'react'
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Chip,
  Grid,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined'
import ViewKanbanOutlinedIcon from '@mui/icons-material/ViewKanbanOutlined'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LoadingScreen } from '@/components/ui/LoadingScreen'
import { ErrorState } from '@/components/ui/ErrorState'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { AppCard } from '@/components/ui/AppCard'
import { ProjectFormDialog } from '@/features/projects/components/ProjectFormDialog'
import { resolveProjectMembers } from '@/features/projects/components/MemberAutocomplete'
import {
  useArchiveProject,
  useDeleteProject,
  useProject,
} from '@/features/projects/hooks/useProjects'
import { getProjectProgress } from '@/features/projects/schemas/project.schema'
import { formatDate } from '@/utils/formatDate'
import { getInitials } from '@/utils/helpers'
import type { Project, User } from '@/types'

const resolveOwner = (owner: Project['owner']): User | null =>
  typeof owner === 'string' ? null : owner

export const ProjectDetailsPage = () => {
  const { id = '' } = useParams()
  const { t } = useTranslation(['pages', 'common'])
  const navigate = useNavigate()
  const { data: project, isLoading, isError, refetch } = useProject(id)
  const deleteProject = useDeleteProject()
  const archiveProject = useArchiveProject()
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  if (isLoading) return <LoadingScreen />
  if (isError || !project) {
    return <ErrorState onRetry={() => refetch()} />
  }

  const progress = getProjectProgress(project)
  const members = resolveProjectMembers(project.members)
  const owner = resolveOwner(project.owner)

  const handleDelete = async () => {
    await deleteProject.mutateAsync(project._id)
    navigate('/projects')
  }

  const handleArchive = async () => {
    await archiveProject.mutateAsync(project._id)
  }

  return (
    <>
      <Button component={Link} to="/projects" startIcon={<ArrowBackIcon />} sx={{ mb: 2 }}>
        {t('pages:projectBackToList')}
      </Button>

      <Paper
        sx={{
          mb: 3,
          overflow: 'hidden',
          border: 1,
          borderColor: 'divider',
        }}
      >
        <Box
          sx={{
            height: 180,
            background: project.coverImage
              ? `linear-gradient(rgba(0,0,0,.35), rgba(0,0,0,.55)), url(${project.coverImage}) center/cover`
              : `linear-gradient(135deg, ${project.color ?? '#4F46E5'}, #111827)`,
            color: '#fff',
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}
        >
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: 2,
                bgcolor: 'rgba(255,255,255,.15)',
                display: 'grid',
                placeItems: 'center',
                fontSize: 28,
              }}
            >
              {project.icon ?? project.key}
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" sx={{ fontWeight: 800 }}>
                {project.name}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                {project.key} · {project.description}
              </Typography>
            </Box>
            <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
              <Chip label={t(`pages:projectStatus.${project.status}`)} color="default" sx={{ color: '#fff' }} />
              <Chip label={t(`pages:projectPriority.${project.priority}`)} variant="outlined" sx={{ color: '#fff', borderColor: 'rgba(255,255,255,.5)' }} />
              <Chip label={t(`pages:projectVisibility.${project.visibility}`)} variant="outlined" sx={{ color: '#fff', borderColor: 'rgba(255,255,255,.5)' }} />
            </Stack>
          </Stack>
        </Box>

        <Box sx={{ p: 3 }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mb: 3 }}>
            <Button variant="contained" startIcon={<EditOutlinedIcon />} onClick={() => setEditOpen(true)}>
              {t('pages:projectActionEdit')}
            </Button>
            <Button variant="outlined" startIcon={<ViewKanbanOutlinedIcon />} component={Link} to="/boards">
              {t('pages:projectOpenBoard')}
            </Button>
            <Button variant="outlined" startIcon={<ArchiveOutlinedIcon />} onClick={handleArchive}>
              {t('pages:projectActionArchive')}
            </Button>
            <Button variant="outlined" color="error" startIcon={<DeleteOutlinedIcon />} onClick={() => setDeleteOpen(true)}>
              {t('pages:projectActionDelete')}
            </Button>
          </Stack>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 4 }}>
              <AppCard>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5 }}>
                  {t('pages:projectProgress')}
                </Typography>
                <LinearProgress variant="determinate" value={progress} sx={{ height: 10, borderRadius: 1, mb: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  {t('pages:projectTaskCount', {
                    completed: project.completedTasks ?? 0,
                    total: project.totalTasks ?? 0,
                  })}
                </Typography>
              </AppCard>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <AppCard>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5 }}>
                  {t('pages:projectTimeline')}
                </Typography>
                <Typography variant="body2">
                  {t('pages:projectFormStartDate')}: {project.startDate ? formatDate(project.startDate) : '-'}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {t('pages:projectFormDeadline')}: {project.deadline ? formatDate(project.deadline) : '-'}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }} color="text.secondary">
                  {t('pages:projectCreatedAt', { date: formatDate(project.createdAt) })}
                </Typography>
              </AppCard>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <AppCard>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5 }}>
                  {t('pages:projectFormMembers')}
                </Typography>
                <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                  <AvatarGroup max={6}>
                    {members.map((member) => (
                      <Avatar key={member._id} src={member.avatar}>
                        {getInitials(member.name)}
                      </Avatar>
                    ))}
                  </AvatarGroup>
                  <Typography variant="body2" color="text.secondary">
                    {members.length} {t('pages:projectMembersCount')}
                  </Typography>
                </Stack>
                {owner && (
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                    {t('pages:projectFilterOwner')}: {owner.name}
                  </Typography>
                )}
              </AppCard>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <ProjectFormDialog
        open={editOpen}
        mode="edit"
        project={project}
        onClose={() => setEditOpen(false)}
      />

      <ConfirmDialog
        open={deleteOpen}
        title={t('pages:projectDeleteTitle')}
        message={t('pages:projectDeleteMessage', { name: project.name })}
        confirmLabel={t('pages:projectActionDelete')}
        cancelLabel={t('common:cancel')}
        loading={deleteProject.isPending}
        onConfirm={handleDelete}
        onCancel={() => setDeleteOpen(false)}
      />
    </>
  )
}
