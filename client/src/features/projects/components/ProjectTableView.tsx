import { Avatar, AvatarGroup, Box, Chip, IconButton, LinearProgress, Stack, Typography } from '@mui/material'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AppTable, type AppTableColumn } from '@/components/ui/AppTable'
import { ProjectActionsMenu } from '@/features/projects/components/ProjectActionsMenu'
import { getProjectProgress } from '@/features/projects/schemas/project.schema'
import { resolveProjectMembers } from '@/features/projects/components/MemberAutocomplete'
import { formatDate } from '@/utils/formatDate'
import { getInitials } from '@/utils/helpers'
import type { Project } from '@/types'

interface ProjectTableViewProps {
  projects: Project[]
  onEdit: (project: Project) => void
  onDelete: (project: Project) => void
  onDuplicate: (project: Project) => void
  onArchive: (project: Project) => void
}

export const ProjectTableView = ({
  projects,
  onEdit,
  onDelete,
  onDuplicate,
  onArchive,
}: ProjectTableViewProps) => {
  const { t } = useTranslation('pages')
  const navigate = useNavigate()

  const columns: AppTableColumn<Project>[] = [
    {
      id: 'name',
      label: t('projectFormName'),
      render: (row) => (
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: 1,
              bgcolor: row.color ?? 'primary.main',
              display: 'grid',
              placeItems: 'center',
            }}
          >
            {row.icon ?? row.key.slice(0, 1)}
          </Box>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {row.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {row.key}
            </Typography>
          </Box>
        </Stack>
      ),
    },
    {
      id: 'status',
      label: t('projectFormStatus'),
      render: (row) => <Chip size="small" label={t(`projectStatus.${row.status}`)} />,
    },
    {
      id: 'progress',
      label: t('projectProgress'),
      render: (row) => (
        <Box sx={{ minWidth: 120 }}>
          <LinearProgress variant="determinate" value={getProjectProgress(row)} />
          <Typography variant="caption" color="text.secondary">
            {row.completedTasks ?? 0}/{row.totalTasks ?? 0}
          </Typography>
        </Box>
      ),
    },
    {
      id: 'members',
      label: t('projectFormMembers'),
      render: (row) => (
        <AvatarGroup max={3} sx={{ '& .MuiAvatar-root': { width: 24, height: 24, fontSize: 11 } }}>
          {resolveProjectMembers(row.members).map((member) => (
            <Avatar key={member._id} src={member.avatar}>
              {getInitials(member.name)}
            </Avatar>
          ))}
        </AvatarGroup>
      ),
    },
    {
      id: 'deadline',
      label: t('projectFormDeadline'),
      render: (row) => (row.deadline ? formatDate(row.deadline) : '-'),
    },
    {
      id: 'updatedAt',
      label: t('projectSort.updatedAt'),
      render: (row) => formatDate(row.updatedAt),
    },
    {
      id: 'actions',
      label: t('projectActions'),
      align: 'right',
      render: (row) => (
        <Stack direction="row" spacing={0.5} justifyContent="flex-end">
          <IconButton size="small" onClick={() => navigate(`/projects/${row._id}`)}>
            <EditOutlinedIcon fontSize="small" />
          </IconButton>
          <ProjectActionsMenu
            onEdit={() => onEdit(row)}
            onDelete={() => onDelete(row)}
            onDuplicate={() => onDuplicate(row)}
            onArchive={() => onArchive(row)}
          />
        </Stack>
      ),
    },
  ]

  return (
    <AppTable
      columns={columns}
      rows={projects}
      getRowId={(row) => row._id}
      emptyMessage={t('noProjectsTitle')}
    />
  )
}
