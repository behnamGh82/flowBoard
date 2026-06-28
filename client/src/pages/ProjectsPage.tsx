import { useState } from 'react'
import { Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useTranslation } from 'react-i18next'
import { PageHeader } from '@/components/ui/PageHeader'
import { SearchInput } from '@/components/ui/SearchInput'
import { ProjectList } from '@/features/projects'
import { useDebounce } from '@/hooks/useDebounce'

export const ProjectsPage = () => {
  const { t } = useTranslation('pages')
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search)

  return (
    <>
      <PageHeader
        title={t('projectsTitle')}
        subtitle={t('projectsSubtitle')}
        action={
          <Button variant="contained" startIcon={<AddIcon />}>
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
    </>
  )
}
