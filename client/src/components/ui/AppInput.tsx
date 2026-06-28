import { TextField, type TextFieldProps } from '@mui/material'

export type AppInputProps = TextFieldProps

export const AppInput = (props: AppInputProps) => (
  <TextField variant="outlined" fullWidth {...props} />
)
