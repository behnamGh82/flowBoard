import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  type DialogProps,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

interface AppDialogProps extends DialogProps {
  title: string
  open: boolean
  onClose: () => void
  children: React.ReactNode
  actions?: React.ReactNode
}

export const AppDialog = ({
  title,
  open,
  onClose,
  children,
  actions,
  ...props
}: AppDialogProps) => (
  <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" {...props}>
    <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      {title}
      <IconButton size="small" onClick={onClose} aria-label="close">
        <CloseIcon fontSize="small" />
      </IconButton>
    </DialogTitle>
    <DialogContent dividers>{children}</DialogContent>
    {actions && <DialogActions>{actions}</DialogActions>}
  </Dialog>
)
