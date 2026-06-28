import { Box, Avatar, Typography, Paper } from '@mui/material'
import type { Comment } from '@/types'
import { formatRelative } from '@/utils/formatDate'
import { getInitials } from '@/utils/helpers'

interface CommentItemProps {
  comment: Comment
}

export const CommentItem = ({ comment }: CommentItemProps) => {
  const author = typeof comment.author === 'object' ? comment.author : null

  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
      <Avatar sx={{ width: 36, height: 36, fontSize: 13 }}>
        {author ? getInitials(author.name) : '?'}
      </Avatar>
      <Paper variant="outlined" sx={{ flex: 1, p: 2, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography variant="subtitle2">{author?.name ?? 'Unknown'}</Typography>
          <Typography variant="caption" color="text.secondary">
            {formatRelative(comment.createdAt)}
          </Typography>
        </Box>
        <Typography variant="body2">{comment.content}</Typography>
      </Paper>
    </Box>
  )
}
