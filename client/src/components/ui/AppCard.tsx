import { Card, CardContent, type CardProps } from '@mui/material'

interface AppCardProps extends CardProps {
  children: React.ReactNode
  noPadding?: boolean
}

export const AppCard = ({ children, noPadding = false, ...props }: AppCardProps) => (
  <Card {...props}>
    {noPadding ? children : <CardContent>{children}</CardContent>}
  </Card>
)
