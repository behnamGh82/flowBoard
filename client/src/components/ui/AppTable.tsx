import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material'

export interface AppTableColumn<T> {
  id: string
  label: string
  align?: 'left' | 'right' | 'center'
  render: (row: T) => React.ReactNode
  width?: string | number
}

interface AppTableProps<T> {
  columns: AppTableColumn<T>[]
  rows: T[]
  getRowId: (row: T) => string
  emptyMessage?: string
}

export const AppTable = <T,>({
  columns,
  rows,
  getRowId,
  emptyMessage = 'No data',
}: AppTableProps<T>) => (
  <TableContainer component={Paper} variant="outlined">
    <Table size="small">
      <TableHead>
        <TableRow>
          {columns.map((col) => (
            <TableCell key={col.id} align={col.align} sx={{ width: col.width, fontWeight: 700 }}>
              {col.label}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.length === 0 ? (
          <TableRow>
            <TableCell colSpan={columns.length}>
              <Typography variant="body2" color="text.secondary" align="center" sx={{ py: 3 }}>
                {emptyMessage}
              </Typography>
            </TableCell>
          </TableRow>
        ) : (
          rows.map((row) => (
            <TableRow key={getRowId(row)} hover>
              {columns.map((col) => (
                <TableCell key={col.id} align={col.align}>
                  {col.render(row)}
                </TableCell>
              ))}
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  </TableContainer>
)
