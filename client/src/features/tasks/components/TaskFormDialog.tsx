import { useMemo } from 'react'
import { Alert, Box, MenuItem } from '@mui/material'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { AppDialog } from '@/components/ui/AppDialog'
import { AppInput } from '@/components/ui/AppInput'
import { AppButton } from '@/components/ui/AppButton'
import {
  createTaskSchema,
  toTaskPayload,
  type TaskFormValues,
} from '@/features/tasks/schemas/task.schema'
import { useCreateTask } from '@/features/tasks/hooks/useTasks'
import { COLUMN_TO_STATUS } from '@/constants/task'
import type { ApiError } from '@/types'

interface TaskFormDialogProps {
  open: boolean
  onClose: () => void
  boardId: string
  projectId: string
  columnId: string
}

export const TaskFormDialog = ({
  open,
  onClose,
  boardId,
  projectId,
  columnId,
}: TaskFormDialogProps) => {
  const { t } = useTranslation(['pages', 'validation', 'common'])
  const createTask = useCreateTask()
  const taskSchema = useMemo(() => createTaskSchema(t), [t])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: '',
      description: '',
      status: COLUMN_TO_STATUS[columnId] ?? 'backlog',
      priority: 'medium',
      storyPoints: undefined,
      board: boardId,
      project: projectId,
      columnId,
      labels: '',
      dueDate: '',
    },
  })

  const handleClose = () => {
    reset({
      title: '',
      description: '',
      status: COLUMN_TO_STATUS[columnId] ?? 'backlog',
      priority: 'medium',
      board: boardId,
      project: projectId,
      columnId,
      labels: '',
      dueDate: '',
    })
    createTask.reset()
    onClose()
  }

  const onSubmit = handleSubmit(async (values) => {
    await createTask.mutateAsync(toTaskPayload({ ...values, board: boardId, project: projectId, columnId }))
    handleClose()
  })

  return (
    <AppDialog
      open={open}
      onClose={handleClose}
      title={t('pages:taskFormTitle')}
      actions={
        <>
          <AppButton onClick={handleClose} disabled={createTask.isPending}>
            {t('common:cancel')}
          </AppButton>
          <AppButton variant="contained" onClick={onSubmit} loading={createTask.isPending}>
            {t('pages:taskFormSubmit')}
          </AppButton>
        </>
      }
    >
      <Box component="form" onSubmit={onSubmit} noValidate>
        {createTask.isError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {(createTask.error as ApiError).message}
          </Alert>
        )}

        <AppInput
          {...register('title')}
          label={t('pages:taskFormTitleLabel')}
          margin="normal"
          autoFocus
          error={!!errors.title}
          helperText={errors.title?.message}
        />

        <AppInput
          {...register('description')}
          label={t('pages:taskFormDescription')}
          margin="normal"
          multiline
          minRows={2}
        />

        <AppInput
          {...register('priority')}
          select
          label={t('pages:taskFormPriority')}
          margin="normal"
          defaultValue="medium"
        >
          {(['lowest', 'low', 'medium', 'high', 'highest'] as const).map((priority) => (
            <MenuItem key={priority} value={priority}>
              {priority}
            </MenuItem>
          ))}
        </AppInput>

        <AppInput
          {...register('storyPoints')}
          label={t('pages:taskFormStoryPoints')}
          type="number"
          margin="normal"
          inputProps={{ min: 0 }}
        />

        <AppInput
          {...register('labels')}
          label={t('pages:taskFormLabels')}
          margin="normal"
          helperText={t('pages:taskFormLabelsHint')}
        />

        <AppInput
          {...register('dueDate')}
          label={t('pages:taskFormDueDate')}
          type="date"
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
      </Box>
    </AppDialog>
  )
}
