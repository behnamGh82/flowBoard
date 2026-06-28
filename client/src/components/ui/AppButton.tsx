import { Button, type ButtonProps } from '@mui/material'

export type AppButtonProps = ButtonProps

export const AppButton = ({ children, ...props }: AppButtonProps) => (
  <Button disableElevation {...props}>
    {children}
  </Button>
)
