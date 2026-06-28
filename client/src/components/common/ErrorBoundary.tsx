import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Box, Button, Typography } from '@mui/material'
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined'
import { withTranslation, type WithTranslation } from 'react-i18next'

interface Props extends WithTranslation {
  children: ReactNode
}

interface State {
  hasError: boolean
}

class ErrorBoundaryBase extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info)
  }

  render() {
    const { t, children } = this.props

    if (this.state.hasError) {
      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
            gap: 2,
          }}
        >
          <ErrorOutlineOutlinedIcon sx={{ fontSize: 48, color: 'error.main' }} />
          <Typography variant="h6">{t('common:somethingWentWrong')}</Typography>
          <Button variant="contained" onClick={() => window.location.reload()}>
            {t('common:reloadPage')}
          </Button>
        </Box>
      )
    }

    return children
  }
}

export const ErrorBoundary = withTranslation()(ErrorBoundaryBase)
