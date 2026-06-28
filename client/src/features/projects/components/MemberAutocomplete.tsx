import { Autocomplete, Avatar, Box, Chip, TextField } from '@mui/material'
import { Controller, type Control } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useUserOptions } from '@/features/users/hooks/useUsers'
import { useDebounce } from '@/hooks/useDebounce'
import { useMemo, useState } from 'react'
import type { ProjectFormValues } from '@/features/projects/schemas/project.schema'
import type { User } from '@/types'
import { getInitials } from '@/utils/helpers'

interface MemberAutocompleteProps {
  control: Control<ProjectFormValues>
  seedMembers?: User[]
}

export const MemberAutocomplete = ({ control, seedMembers = [] }: MemberAutocompleteProps) => {
  const { t } = useTranslation('pages')
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 300)
  const { data: users = [] } = useUserOptions(debouncedSearch || undefined)

  const options = useMemo(() => {
    const map = new Map<string, User>()
    ;[...seedMembers, ...users].forEach((user) => map.set(user._id, user))
    return Array.from(map.values())
  }, [seedMembers, users])

  return (
    <Controller
      name="members"
      control={control}
      render={({ field }) => {
        const selectedUsers = field.value
          .map((id) => options.find((user) => user._id === id))
          .filter((user): user is User => Boolean(user))

        return (
          <Autocomplete
            multiple
            options={options}
            value={selectedUsers}
            onChange={(_, value) => field.onChange(value.map((user) => user._id))}
            inputValue={search}
            onInputChange={(_, value) => setSearch(value)}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option._id === value._id}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  {...getTagProps({ index })}
                  key={option._id}
                  avatar={
                    <Avatar src={option.avatar} sx={{ width: 24, height: 24 }}>
                      {getInitials(option.name)}
                    </Avatar>
                  }
                  label={option.name}
                  size="small"
                />
              ))
            }
            renderOption={(props, option) => (
              <Box component="li" {...props} key={option._id} sx={{ display: 'flex', gap: 1.5 }}>
                <Avatar src={option.avatar} sx={{ width: 28, height: 28 }}>
                  {getInitials(option.name)}
                </Avatar>
                <Box>
                  <Box>{option.name}</Box>
                  <Box sx={{ fontSize: 12, color: 'text.secondary' }}>{option.email}</Box>
                </Box>
              </Box>
            )}
            renderInput={(params) => (
              <TextField {...params} label={t('projectFormMembers')} margin="normal" />
            )}
          />
        )
      }}
    />
  )
}

export const resolveProjectMembers = (members: User[] | string[]): User[] =>
  members.filter((member): member is User => typeof member !== 'string')
