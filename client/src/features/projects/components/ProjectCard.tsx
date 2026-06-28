import {
  Avatar,
  AvatarGroup,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ProjectActionsMenu } from '@/features/projects/components/ProjectActionsMenu'
import { getProjectProgress } from '@/features/projects/schemas/project.schema'
import { resolveProjectMembers } from '@/features/projects/components/MemberAutocomplete'
import { formatDate } from '@/utils/formatDate'
import { getInitials } from '@/utils/helpers'
import type { Project } from '@/types'

interface ProjectCardProps {
  project: Project
  onEdit: (project: Project) => void
  onDelete: (project: Project) => void
  onDuplicate: (project: Project) => void
  onArchive: (project: Project) => void
}

const statusColor = (status: Project['status']) => {
  switch (status) {
    case 'active':
      return 'success'
    case 'planning':
      return 'info'
    case 'completed':
      return 'primary'
    case 'on_hold':
      return 'warning'
    case 'archived':
      return 'default'
    default:
      return 'default'
  }
}

export const ProjectCard = ({
  project,
  onEdit,
  onDelete,
  onDuplicate,
  onArchive,
}: ProjectCardProps) => {
  const { t } = useTranslation('pages')
  const navigate = useNavigate()
  const progress = getProjectProgress(project)
  const members = resolveProjectMembers(project.members)

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          height: 8,
          bgcolor: project.color ?? 'primary.main',
          backgroundImage: project.coverImage ? `url(${project.coverImage})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: 2,
              bgcolor: project.color ?? 'primary.main',
              color: '#fff',
              display: 'grid',
              placeItems: 'center',
              fontSize: 22,
              flexShrink: 0,
            }}
          >
            {project.icon ?? project.key.slice(0, 2)}
          </Box>

          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }} noWrap>
              {project.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {project.key}
            </Typography>
          </Box>

          <ProjectActionsMenu
            onEdit={() => onEdit(project)}
            onDelete={() => onDelete(project)}
            onDuplicate={() => onDuplicate(project)}
            onArchive={() => onArchive(project)}
          />
        </Box>

        {project.description && (
          <Typography variant="body2" color="text.secondary" sx={{ minHeight: 40 }} noWrap>
            {project.description}
          </Typography>
        )}

        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          <Chip
            label={t(`projectStatus.${project.status}`)}
            size="small"
            color={statusColor(project.status)}
          />
          <Chip label={t(`projectPriority.${project.priority}`)} size="small" variant="outlined" />
        </Stack>

        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
            <Typography variant="caption" color="text.secondary">
              {t('projectProgress')}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {progress}%
            </Typography>
          </Box>
          <LinearProgress variant="determinate" value={progress} sx={{ height: 8, borderRadius: 1 }} />
          <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
            {t('projectTaskCount', {
              completed: project.completedTasks ?? 0,
              total: project.totalTasks ?? 0,
            })}
          </Typography>
        </Box>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <AvatarGroup max={4} sx={{ '& .MuiAvatar-root': { width: 28, height: 28, fontSize: 12 } }}>
            {members.map((member) => (
              <Avatar key={member._id} src={member.avatar} alt={member.name}>
                {getInitials(member.name)}
              </Avatar>
            ))}
          </AvatarGroup>
          <Typography variant="caption" color="text.secondary">
            {project.deadline ? formatDate(project.deadline) : t('projectNoDeadline')}
          </Typography>
        </Stack>

        <Typography variant="caption" color="text.secondary">
          {t('projectCreatedAt', { date: formatDate(project.createdAt) })}
        </Typography>
      </CardContent>

      <CardActionArea onClick={() => navigate(`/projects/${project._id}`)} sx={{ mt: 'auto' }}>
        <Box sx={{ px: 2, py: 1.25, borderTop: 1, borderColor: 'divider' }}>
          <Typography variant="body2" color="primary" sx={{ fontWeight: 600 }}>
            {t('projectOpenDetails')}
          </Typography>
        </Box>
      </CardActionArea>
    </Card>
  )
}
