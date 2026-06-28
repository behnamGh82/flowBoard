import { useState } from 'react'
import { Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useTranslation } from 'react-i18next'
import { PageHeader } from '@/components/ui/PageHeader'
import { SearchInput } from '@/components/ui/SearchInput'
import { ProjectList } from '@/features/projects'
import { ProjectFormDialog } from '@/features/projects/components/ProjectFormDialog'
import { useDebounce } from '@/hooks/useDebounce'

export const ProjectsPage = () => {
  const { t } = useTranslation('pages')
  const [search, setSearch] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const debouncedSearch = useDebounce(search)

  return (
    <>
      <PageHeader
        title={t('projectsTitle')}
        subtitle={t('projectsSubtitle')}
        action={
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => setDialogOpen(true)}>
            {t('newProject')}
          </Button>
        }
      />
      <SearchInput
        value={search}
        onChange={setSearch}
        placeholder={t('searchProjects')}
        fullWidth
      />
      <ProjectList search={debouncedSearch || undefined} />
      <ProjectFormDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  )
}
