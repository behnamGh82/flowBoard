import { useEffect, useMemo } from 'react'
import {
  Alert,
  Box,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { AppDialog } from '@/components/ui/AppDialog'
import { AppInput } from '@/components/ui/AppInput'
import { AppButton } from '@/components/ui/AppButton'
import { MemberAutocomplete, resolveProjectMembers } from '@/features/projects/components/MemberAutocomplete'
import {
  createProjectSchema,
  projectToFormValues,
  type ProjectFormValues,
} from '@/features/projects/schemas/project.schema'
import {
  useCreateProject,
  useUpdateProject,
} from '@/features/projects/hooks/useProjects'
import {
  DEFAULT_PROJECT_COLOR,
  DEFAULT_PROJECT_ICON,
  PROJECT_COLOR_PRESETS,
  PROJECT_ICON_PRESETS,
} from '@/constants/project'
import type { ApiError, Project } from '@/types'

interface ProjectFormDialogProps {
  open: boolean
  mode: 'create' | 'edit'
  project?: Project
  onClose: () => void
}

const defaultValues: ProjectFormValues = {
  name: '',
  description: '',
  color: DEFAULT_PROJECT_COLOR,
  icon: DEFAULT_PROJECT_ICON,
  startDate: '',
  deadline: '',
  visibility: 'team',
  priority: 'medium',
  status: 'planning',
  members: [],
  coverImage: '',
}

export const ProjectFormDialog = ({
  open,
  mode,
  project,
  onClose,
}: ProjectFormDialogProps) => {
  const { t } = useTranslation(['pages', 'validation', 'common'])
  const createProject = useCreateProject()
  const updateProject = useUpdateProject()
  const projectSchema = useMemo(() => createProjectSchema(t), [t])
  const isEdit = mode === 'edit'
  const mutation = isEdit ? updateProject : createProject

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
    formState: { errors, isDirty },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues,
  })

  const selectedColor = watch('color') ?? DEFAULT_PROJECT_COLOR
  const selectedIcon = watch('icon') ?? DEFAULT_PROJECT_ICON

  useEffect(() => {
    if (!open) return
    reset(isEdit && project ? projectToFormValues(project) : defaultValues)
    createProject.reset()
    updateProject.reset()
  }, [open, isEdit, project, reset, createProject, updateProject])

  const handleClose = () => {
    reset(defaultValues)
    mutation.reset()
    onClose()
  }

  const handleDiscard = () => {
    if (isEdit && project) {
      reset(projectToFormValues(project))
      return
    }
    reset(defaultValues)
  }

  const onSubmit = handleSubmit(async (values) => {
    if (isEdit && project) {
      await updateProject.mutateAsync({ id: project._id, payload: values })
    } else {
      await createProject.mutateAsync(values)
    }
    handleClose()
  })

  const handleCoverChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setValue('coverImage', reader.result, { shouldDirty: true })
      }
    }
    reader.readAsDataURL(file)
  }

  const seedMembers = project ? resolveProjectMembers(project.members) : []

  return (
    <AppDialog
      open={open}
      onClose={handleClose}
      title={isEdit ? t('pages:projectFormEditTitle') : t('pages:projectFormTitle')}
      maxWidth="md"
      actions={
        <>
          {isEdit && (
            <AppButton onClick={handleDiscard} disabled={mutation.isPending || !isDirty}>
              {t('pages:projectFormDiscard')}
            </AppButton>
          )}
          <AppButton onClick={handleClose} disabled={mutation.isPending}>
            {t('common:cancel')}
          </AppButton>
          <AppButton variant="contained" onClick={onSubmit} loading={mutation.isPending}>
            {isEdit ? t('pages:projectFormSave') : t('pages:projectFormSubmit')}
          </AppButton>
        </>
      }
    >
      <Box component="form" onSubmit={onSubmit} noValidate>
        {mutation.isError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {(mutation.error as ApiError).message}
          </Alert>
        )}

        <AppInput
          {...register('name')}
          label={`${t('pages:projectFormName')} *`}
          margin="normal"
          autoFocus
          error={!!errors.name}
          helperText={errors.name?.message}
        />

        <AppInput
          {...register('description')}
          label={t('pages:projectFormDescription')}
          margin="normal"
          multiline
          minRows={3}
        />

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <AppInput
            {...register('status')}
            select
            label={t('pages:projectFormStatus')}
            margin="normal"
            fullWidth
          >
            {(['planning', 'active', 'on_hold', 'completed'] as const).map((status) => (
              <MenuItem key={status} value={status}>
                {t(`pages:projectStatus.${status}`)}
              </MenuItem>
            ))}
          </AppInput>

          <AppInput
            {...register('priority')}
            select
            label={t('pages:projectFormPriority')}
            margin="normal"
            fullWidth
          >
            {(['low', 'medium', 'high'] as const).map((priority) => (
              <MenuItem key={priority} value={priority}>
                {t(`pages:projectPriority.${priority}`)}
              </MenuItem>
            ))}
          </AppInput>

          <AppInput
            {...register('visibility')}
            select
            label={t('pages:projectFormVisibility')}
            margin="normal"
            fullWidth
          >
            {(['private', 'team', 'public'] as const).map((visibility) => (
              <MenuItem key={visibility} value={visibility}>
                {t(`pages:projectVisibility.${visibility}`)}
              </MenuItem>
            ))}
          </AppInput>
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <AppInput
            {...register('startDate')}
            label={t('pages:projectFormStartDate')}
            type="date"
            margin="normal"
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <AppInput
            {...register('deadline')}
            label={t('pages:projectFormDeadline')}
            type="date"
            margin="normal"
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Stack>

        <Controller
          name="color"
          control={control}
          render={({ field }) => (
            <Stack spacing={1} sx={{ mt: 2 }}>
              <Typography variant="subtitle2">{t('pages:projectFormColor')}</Typography>
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

        <Controller
          name="icon"
          control={control}
          render={({ field }) => (
            <Stack spacing={1} sx={{ mt: 2 }}>
              <Typography variant="subtitle2">{t('pages:projectFormIcon')}</Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {PROJECT_ICON_PRESETS.map((icon) => (
                  <Box
                    key={icon}
                    onClick={() => field.onChange(icon)}
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 1,
                      display: 'grid',
                      placeItems: 'center',
                      fontSize: 20,
                      cursor: 'pointer',
                      border: 1,
                      borderColor: selectedIcon === icon ? 'primary.main' : 'divider',
                      bgcolor: selectedIcon === icon ? 'action.selected' : 'transparent',
                    }}
                  >
                    {icon}
                  </Box>
                ))}
              </Stack>
            </Stack>
          )}
        />

        <MemberAutocomplete control={control} seedMembers={seedMembers} />

        <Stack spacing={1} sx={{ mt: 2 }}>
          <Typography variant="subtitle2">{t('pages:projectFormCover')}</Typography>
          <AppInput type="file" inputProps={{ accept: 'image/*' }} onChange={handleCoverChange} />
          {watch('coverImage') && (
            <Box
              component="img"
              src={watch('coverImage')}
              alt=""
              sx={{ width: '100%', maxHeight: 160, objectFit: 'cover', borderRadius: 1 }}
            />
          )}
        </Stack>
      </Box>
    </AppDialog>
  )
}
