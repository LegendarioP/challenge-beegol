import { Box, Pagination } from '@mui/material'

type PaginationControlsProps = {
  count: number
  page: number
  onChange: (value: number) => void
}

export function PaginationControls({ count, page, onChange }: PaginationControlsProps) {
  return (
    <Box display="flex" justifyContent="center" mt={3}>
      <Pagination
        count={count}
        page={page}
        onChange={(_, value) => onChange(value)}
        color="primary"
        shape="rounded"
      />
    </Box>
  )
}