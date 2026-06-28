import { Grid } from '@mui/material'
import { ProjectCard } from '@/features/projects/components/ProjectCard'
import type { Project } from '@/types'

interface ProjectGridViewProps {
  projects: Project[]
  onEdit: (project: Project) => void
  onDelete: (project: Project) => void
  onDuplicate: (project: Project) => void
  onArchive: (project: Project) => void
}

export const ProjectGridView = ({
  projects,
  onEdit,
  onDelete,
  onDuplicate,
  onArchive,
}: ProjectGridViewProps) => (
  <Grid container spacing={2}>
    {projects.map((project) => (
      <Grid key={project._id} size={{ xs: 12, sm: 6, lg: 4 }}>
        <ProjectCard
          project={project}
          onEdit={onEdit}
          onDelete={onDelete}
          onDuplicate={onDuplicate}
          onArchive={onArchive}
        />
      </Grid>
    ))}
  </Grid>
)
