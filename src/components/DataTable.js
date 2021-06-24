import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export default function DataTable({ fileData }) {

    const columnHeaders = fileData[0]
    const rows = fileData.slice(1)

    return (
        <TableContainer component={Paper}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        {columnHeaders.map((header, index) => {
                            return (
                                <TableCell key={index}>{header}</TableCell>
                            )
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => {
                        return (
                            <TableRow key={index}>
                                {row.map((value, index) => {
                                    return (
                                        <TableCell key={index} align='center'>{value}</TableCell>
                                    )
                                })}
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}