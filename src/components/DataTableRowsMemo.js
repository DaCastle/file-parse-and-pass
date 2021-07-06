import React from 'react'
import PropTypes from 'prop-types'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

function DataTableRows({ rows }) {
  return rows.map((row, index) => {
    return (
      <TableRow key={index}>
        {row.map((value, index) => {
          return (
            <TableCell key={index} align='center'>
              {value}
            </TableCell>
          )
        })}
      </TableRow>
    )
  })
}

DataTableRows.propTypes = {
  rows: PropTypes.array.isRequired,
}

export const DataTableRowsMemo = React.memo(DataTableRows)
