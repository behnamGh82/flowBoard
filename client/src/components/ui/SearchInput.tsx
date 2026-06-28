import { TextField, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  fullWidth?: boolean
}

export const SearchInput = ({
  value,
  onChange,
  placeholder = 'Search…',
  fullWidth = false,
}: SearchInputProps) => (
  <TextField
    size="small"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    fullWidth={fullWidth}
    slotProps={{
      input: {
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon fontSize="small" color="action" />
          </InputAdornment>
        ),
      },
    }}
  />
)
