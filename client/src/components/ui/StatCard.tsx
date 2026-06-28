import { Card, CardContent, Typography, Box } from '@mui/material'
import type { ReactNode } from 'react'

interface StatCardProps {
  title: string
  value: string | number
  icon?: ReactNode
  trend?: string
  color?: string
}

export const StatCard = ({ title, value, icon, trend, color }: StatCardProps) => (
  <Card>
    <CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            {value}
          </Typography>
          {trend && (
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              {trend}
            </Typography>
          )}
        </Box>
        {icon && (
          <Box
            sx={{
              p: 1.5,
              borderRadius: 2,
              bgcolor: color ? `${color}20` : 'action.hover',
              color: color ?? 'primary.main',
            }}
          >
            {icon}
          </Box>
        )}
      </Box>
    </CardContent>
  </Card>
)
