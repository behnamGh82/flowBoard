import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined'
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface ProjectActionsMenuProps {
  onEdit: () => void
  onDelete: () => void
  onDuplicate: () => void
  onArchive: () => void
}

export const ProjectActionsMenu = ({
  onEdit,
  onDelete,
  onDuplicate,
  onArchive,
}: ProjectActionsMenuProps) => {
  const { t } = useTranslation('pages')
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClose = () => setAnchorEl(null)

  return (
    <>
      <IconButton
        size="small"
        onClick={(event) => {
          event.stopPropagation()
          event.preventDefault()
          setAnchorEl(event.currentTarget)
        }}
      >
        <MoreVertIcon fontSize="small" />
      </IconButton>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem
          onClick={(event) => {
            event.stopPropagation()
            handleClose()
            onEdit()
          }}
        >
          <ListItemIcon>
            <EditOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>{t('projectActionEdit')}</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={(event) => {
            event.stopPropagation()
            handleClose()
            onDuplicate()
          }}
        >
          <ListItemIcon>
            <ContentCopyOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>{t('projectActionDuplicate')}</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={(event) => {
            event.stopPropagation()
            handleClose()
            onArchive()
          }}
        >
          <ListItemIcon>
            <ArchiveOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>{t('projectActionArchive')}</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={(event) => {
            event.stopPropagation()
            handleClose()
            onDelete()
          }}
        >
          <ListItemIcon>
            <DeleteOutlinedIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText sx={{ color: 'error.main' }}>{t('projectActionDelete')}</ListItemText>
        </MenuItem>
      </Menu>
    </>
  )
}
