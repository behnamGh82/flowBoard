import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material'
import LanguageIcon from '@mui/icons-material/Language'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocale } from '@/contexts/LocaleContext'
import type { AppLanguage } from '@/types'

export const LanguageSwitcher = () => {
  const { t } = useTranslation('common')
  const { language, setLanguage } = useLocale()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const options: Array<{ value: AppLanguage; label: string }> = [
    { value: 'en', label: t('english') },
    { value: 'fa', label: t('persian') },
  ]

  return (
    <>
      <Tooltip title={t('language')}>
        <IconButton color="inherit" onClick={(e) => setAnchorEl(e.currentTarget)}>
          <LanguageIcon />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            selected={language === option.value}
            onClick={() => {
              setLanguage(option.value)
              setAnchorEl(null)
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
