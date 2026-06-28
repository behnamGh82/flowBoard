import { MenuItem, Stack, ToggleButton, ToggleButtonGroup } from '@mui/material'
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined'
import TableRowsOutlinedIcon from '@mui/icons-material/TableRowsOutlined'
import { useTranslation } from 'react-i18next'
import { AppInput } from '@/components/ui/AppInput'
import { SearchInput } from '@/components/ui/SearchInput'
import {
  PROJECT_SORT_FIELDS,
  PROJECT_STATUSES,
  type ProjectListParams,
  type ProjectViewMode,
} from '@/constants/project'
import { useUserOptions } from '@/features/users/hooks/useUsers'

interface ProjectFiltersProps {
  filters: ProjectListParams
  viewMode: ProjectViewMode
  onFiltersChange: (filters: ProjectListParams) => void
  onViewModeChange: (mode: ProjectViewMode) => void
}

export const ProjectFilters = ({
  filters,
  viewMode,
  onFiltersChange,
  onViewModeChange,
}: ProjectFiltersProps) => {
  const { t } = useTranslation('pages')
  const { data: users = [] } = useUserOptions()

  const update = (patch: Partial<ProjectListParams>) =>
    onFiltersChange({ ...filters, ...patch })

  return (
    <Stack spacing={2} sx={{ mb: 3 }}>
      <SearchInput
        value={filters.search ?? ''}
        onChange={(search) => update({ search })}
        placeholder={t('searchProjects')}
        fullWidth
      />

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ alignItems: { md: 'center' } }}>
        <AppInput
          select
          label={t('projectFilterStatus')}
          value={filters.status ?? ''}
          onChange={(e) => update({ status: e.target.value || undefined })}
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="">{t('projectFilterAll')}</MenuItem>
          {PROJECT_STATUSES.map((status) => (
            <MenuItem key={status} value={status}>
              {t(`projectStatus.${status}`)}
            </MenuItem>
          ))}
        </AppInput>

        <AppInput
          select
          label={t('projectFilterOwner')}
          value={filters.owner ?? ''}
          onChange={(e) => update({ owner: e.target.value || undefined })}
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="">{t('projectFilterAll')}</MenuItem>
          {users.map((user) => (
            <MenuItem key={user._id} value={user._id}>
              {user.name}
            </MenuItem>
          ))}
        </AppInput>

        <AppInput
          select
          label={t('projectFilterMember')}
          value={filters.member ?? ''}
          onChange={(e) => update({ member: e.target.value || undefined })}
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="">{t('projectFilterAll')}</MenuItem>
          {users.map((user) => (
            <MenuItem key={user._id} value={user._id}>
              {user.name}
            </MenuItem>
          ))}
        </AppInput>

        <AppInput
          select
          label={t('projectSortBy')}
          value={filters.sortBy ?? 'updatedAt'}
          onChange={(e) =>
            update({ sortBy: e.target.value as ProjectListParams['sortBy'] })
          }
          sx={{ minWidth: 180 }}
        >
          {PROJECT_SORT_FIELDS.map((field) => (
            <MenuItem key={field} value={field}>
              {t(`projectSort.${field}`)}
            </MenuItem>
          ))}
        </AppInput>

        <AppInput
          select
          label={t('projectSortOrder')}
          value={filters.sortOrder ?? 'desc'}
          onChange={(e) => update({ sortOrder: e.target.value as 'asc' | 'desc' })}
          sx={{ minWidth: 140 }}
        >
          <MenuItem value="desc">{t('projectSortDesc')}</MenuItem>
          <MenuItem value="asc">{t('projectSortAsc')}</MenuItem>
        </AppInput>

        <ToggleButtonGroup
          exclusive
          value={viewMode}
          onChange={(_, value: ProjectViewMode | null) => value && onViewModeChange(value)}
          size="small"
          sx={{ ml: { md: 'auto' } }}
        >
          <ToggleButton value="grid" aria-label="grid view">
            <GridViewOutlinedIcon fontSize="small" />
          </ToggleButton>
          <ToggleButton value="table" aria-label="table view">
            <TableRowsOutlinedIcon fontSize="small" />
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>
    </Stack>
  )
}
