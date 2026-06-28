import { Grid } from '@mui/material'
import { ProjectCard } from '@/features/projects/components/ProjectCard'
import { EmptyState } from '@/components/common/EmptyState'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { useProjects } from '@/features/projects/hooks/useProjects'

interface ProjectListProps {
  search?: string
}

export const ProjectList = ({ search }: ProjectListProps) => {
  const { data, isLoading, isError } = useProjects({ search })

  if (isLoading) return <LoadingSpinner />
  if (isError || !data?.data.length) {
    return (
      <EmptyState
        title="No projects yet"
        description="Create your first project to start organizing work."
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
