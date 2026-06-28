import { Skeleton, Stack, Grid } from '@mui/material'

export const CardSkeleton = () => (
  <Skeleton variant="rounded" height={120} sx={{ borderRadius: 3 }} />
)

export const TableSkeleton = ({ rows = 5 }: { rows?: number }) => (
  <Stack spacing={1}>
    {Array.from({ length: rows }).map((_, i) => (
      <Skeleton key={i} variant="rounded" height={48} />
    ))}
  </Stack>
)

export const DashboardSkeleton = () => (
  <Grid container spacing={3}>
    {Array.from({ length: 4 }).map((_, i) => (
      <Grid key={i} size={{ xs: 12, sm: 6, lg: 3 }}>
        <CardSkeleton />
      </Grid>
    ))}
    <Grid size={{ xs: 12, lg: 8 }}>
      <Skeleton variant="rounded" height={360} sx={{ borderRadius: 3 }} />
    </Grid>
    <Grid size={{ xs: 12, lg: 4 }}>
      <Skeleton variant="rounded" height={360} sx={{ borderRadius: 3 }} />
    </Grid>
  </Grid>
)
