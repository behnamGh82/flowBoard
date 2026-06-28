import { Box, Typography } from '@mui/material'
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined'
import type { ReactNode } from 'react'

interface EmptyStateProps {
  title: string
  description?: string
  icon?: ReactNode
  action?: ReactNode
}

export const EmptyState = ({
  title,
  description,
  icon,
  action,
}: EmptyStateProps) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      py: 8,
      px: 3,
      textAlign: 'center',
    }}
  >
    <Box sx={{ color: 'text.secondary', mb: 2, fontSize: 48 }}>
      {icon ?? <InboxOutlinedIcon fontSize="inherit" />}
    </Box>
    <Typography variant="h6" gutterBottom>
      {title}
    </Typography>
    {description && (
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 360 }}>
        {description}
      </Typography>
    )}
    {action}
  </Box>
)
