import { Typography } from '@mui/material'
import { AppDialog } from '@/components/ui/AppDialog'
import { AppButton } from '@/components/ui/AppButton'

interface ConfirmDialogProps {
  open: boolean
  title: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  loading?: boolean
  onConfirm: () => void
  onCancel: () => void
}

export const ConfirmDialog = ({
  open,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) => (
  <AppDialog
    title={title}
    open={open}
    onClose={onCancel}
    actions={
      <>
        <AppButton onClick={onCancel} disabled={loading}>
          {cancelLabel}
        </AppButton>
        <AppButton variant="contained" color="error" onClick={onConfirm} loading={loading}>
          {confirmLabel}
        </AppButton>
      </>
    }
  >
    <Typography variant="body2">{message}</Typography>
  </AppDialog>
)
