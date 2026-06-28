import { useState } from 'react'
import { Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { PageHeader } from '@/components/ui/PageHeader'
import { SearchInput } from '@/components/ui/SearchInput'
import { ProjectList } from '@/features/projects'
import { useDebounce } from '@/hooks/useDebounce'

export const ProjectsPage = () => {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search)

  return (
    <>
      <PageHeader
        title="Projects"
        subtitle="Manage and organize your projects"
        action={
          <Button variant="contained" startIcon={<AddIcon />}>
            New Project
          </Button>
        }
      />
      <SearchInput
        value={search}
        onChange={setSearch}
        placeholder="Search projects…"
        fullWidth
      />
      <ProjectList search={debouncedSearch || undefined} />
    </>
  )
}
