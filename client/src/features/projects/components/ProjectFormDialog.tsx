import { useMemo } from 'react'
import { Alert, Box, Stack } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { AppDialog } from '@/components/ui/AppDialog'
import { AppInput } from '@/components/ui/AppInput'
import { AppButton } from '@/components/ui/AppButton'
import {
  createProjectSchema,
  deriveProjectKey,
  type ProjectFormValues,
} from '@/features/projects/schemas/project.schema'
import { useCreateProject } from '@/features/projects/hooks/useProjects'
import {
  DEFAULT_PROJECT_COLOR,
  PROJECT_COLOR_PRESETS,
} from '@/constants/project'
import type { ApiError } from '@/types'

interface ProjectFormDialogProps {
  open: boolean
  onClose: () => void
}

export const ProjectFormDialog = ({ open, onClose }: ProjectFormDialogProps) => {
  const { t } = useTranslation(['pages', 'validation', 'common'])
  const createProject = useCreateProject()
  const projectSchema = useMemo(() => createProjectSchema(t), [t])

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: '',
      key: '',
      description: '',
      color: DEFAULT_PROJECT_COLOR,
    },
  })

  const selectedColor = watch('color') ?? DEFAULT_PROJECT_COLOR

  const handleClose = () => {
    reset()
    createProject.reset()
    onClose()
  }

  const onSubmit = handleSubmit(async (values) => {
    await createProject.mutateAsync(values)
    handleClose()
  })

  const handleNameBlur = () => {
    const name = watch('name')
    const key = watch('key')
    if (name && !key) {
      setValue('key', deriveProjectKey(name), { shouldValidate: true })
    }
  }

  return (
    <AppDialog
      open={open}
      onClose={handleClose}
      title={t('pages:projectFormTitle')}
      actions={
        <>
          <AppButton onClick={handleClose} disabled={createProject.isPending}>
            {t('common:cancel')}
          </AppButton>
          <AppButton
            variant="contained"
            onClick={onSubmit}
            loading={createProject.isPending}
          >
            {t('pages:projectFormSubmit')}
          </AppButton>
        </>
      }
    >
      <Box component="form" onSubmit={onSubmit} noValidate>
        {createProject.isError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {(createProject.error as ApiError).message}
          </Alert>
        )}

        <AppInput
          {...register('name')}
          label={t('pages:projectFormName')}
          margin="normal"
          autoFocus
          error={!!errors.name}
          helperText={errors.name?.message}
          onBlur={handleNameBlur}
        />

        <AppInput
          {...register('key', {
            onChange: (e) => {
              e.target.value = e.target.value.toUpperCase().replace(/[^A-Z]/g, '')
            },
          })}
          label={t('pages:projectFormKey')}
          margin="normal"
          inputProps={{ maxLength: 6 }}
          error={!!errors.key}
          helperText={errors.key?.message ?? t('pages:projectFormKeyHint')}
        />

        <AppInput
          {...register('description')}
          label={t('pages:projectFormDescription')}
          margin="normal"
          multiline
          minRows={3}
          error={!!errors.description}
          helperText={errors.description?.message}
        />

        <Controller
          name="color"
          control={control}
          render={({ field }) => (
            <Stack spacing={1} sx={{ mt: 2 }}>
              <AppInput
                {...field}
                label={t('pages:projectFormColor')}
                type="color"
                sx={{ '& input': { height: 48, cursor: 'pointer' } }}
              />
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {PROJECT_COLOR_PRESETS.map((color) => (
                  <Box
                    key={color}
                    onClick={() => field.onChange(color)}
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: 1,
                      bgcolor: color,
                      cursor: 'pointer',
                      border: 2,
                      borderColor: selectedColor === color ? 'text.primary' : 'transparent',
                    }}
                  />
                ))}
              </Stack>
            </Stack>
          )}
        />
      </Box>
    </AppDialog>
  )
}
