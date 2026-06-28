import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { ProjectCard } from '@/features/projects/components/ProjectCard'
import { EmptyState } from '@/components/common/EmptyState'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { useProjects } from '@/features/projects/hooks/useProjects'

interface ProjectListProps {
  search?: string
}

export const ProjectList = ({ search }: ProjectListProps) => {
  const { t } = useTranslation('pages')
  const { data, isLoading, isError } = useProjects({ search })

  if (isLoading) return <LoadingSpinner />
  if (isError || !data?.data.length) {
    return (
      <EmptyState
        title={t('noProjectsTitle')}
        description={t('noProjectsDescription')}
      />
    )
  }

  return (
    <Grid container spacing={2}>
      {data.data.map((project) => (
        <Grid key={project._id} size={{ xs: 12, sm: 6, lg: 4 }}>
          <ProjectCard project={project} />
        </Grid>
      ))}
    </Grid>
  )
}
