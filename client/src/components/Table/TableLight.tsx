'use client'
import TableCell from '@mui/material/TableCell'
import TablePagination from '@mui/material/TablePagination'
import TableBodyFn from './Body'
import { styled } from '@mui/system'
import { type SetStateAction, useState } from 'react'

const TableCellStyledHead = styled(TableCell)({
  paddingBottom: '10px',
  paddingTop: '0px',
  fontFamily: 'Outfit, sans-serif',
  color: '#000000',
  borderBottom: '1px solid #ccc'
})

const TableCellStyled = styled(TableCell)({
  fontFamily: 'Outfit, sans-serif',
  color: '#000000',
  borderBottom: '1px solid #ccc'
})

const TablePaginationStyled = styled(TablePagination)(({ theme }) => ({
  width: '100%',
  color: '#000000',
  borderBottom: '1px solid #ccc'
}))

interface Props {
  headers: any
  rows: any
}

const DynamicTableLight = ({ headers, rows }: Props) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  const handleChangePage = (event: any, newPage: SetStateAction<number>) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <TableBodyFn
      headers={headers}
      rows={rows}
      rowsPerPage={rowsPerPage}
      page={page}
      emptyRows={emptyRows}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
      TableCellStyledHead={TableCellStyledHead}
      TableCellStyled={TableCellStyled}
      TablePaginationStyled={TablePaginationStyled}
    />
  )
}

export default DynamicTableLight
