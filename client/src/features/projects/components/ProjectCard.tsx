import {
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Chip,
  Box,
  Avatar,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import type { Project } from '@/types'

interface ProjectCardProps {
  project: Project
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const navigate = useNavigate()

  return (
    <Card>
      <CardActionArea onClick={() => navigate(`/projects/${project._id}`)}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
            <Avatar
              sx={{
                bgcolor: project.color ?? 'primary.main',
                width: 40,
                height: 40,
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              {project.key}
            </Avatar>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }} noWrap>
                {project.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {project.key}
              </Typography>
            </Box>
            <Chip
              label={project.status}
              size="small"
              color={project.status === 'active' ? 'success' : 'default'}
            />
          </Box>
          {project.description && (
            <Typography variant="body2" color="text.secondary" noWrap>
              {project.description}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
