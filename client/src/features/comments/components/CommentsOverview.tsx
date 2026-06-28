import { Card, CardContent, Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { EmptyState } from '@/components/common/EmptyState'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { useComments } from '@/features/comments/hooks/useComments'
import { formatRelative } from '@/utils/formatDate'
import type { User } from '@/types'

const getAuthor = (author: User | string) => (typeof author === 'object' ? author : null)

export const CommentsOverview = () => {
  const { t } = useTranslation(['comments', 'pages'])
  const { data, isLoading, isError } = useComments()

  if (isLoading) return <LoadingSpinner />

  if (isError || !data?.length) {
    return (
      <EmptyState
        title={t('pages:commentsEmptyTitle')}
        description={t('pages:commentsEmptyDescription')}
      />
    )
  }

  return (
    <Stack spacing={2}>
      <Typography variant="h6">{t('comments:latestComments')}</Typography>
      {data.map((comment) => {
        const author = getAuthor(comment.author)

        return (
          <Card key={comment._id}>
            <CardContent>
              <Stack spacing={1}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  {author?.name ?? t('comments:unknownAuthor')}
                </Typography>
                <Typography variant="body2">{comment.content}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {t('comments:commentedOnTask')} · {formatRelative(comment.createdAt)}
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        )
      })}
    </Stack>
  )
}
