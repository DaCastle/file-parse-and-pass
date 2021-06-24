import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { selectOptions } from '../utilities';

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
                                <TableCell key={index} className='headers'>
                                    <span>{header}</span>
                                    <span>
                                        <FormControlLabel
                                            value="Ignore"
                                            control={<Checkbox color="primary" />}
                                            label="Ignore"
                                            labelPlacement="end"
                                        />
                                    </span>
                                    <span>
                                        <FormControl id='mapping'>
                                            <InputLabel htmlFor="mapping-select">Mapping</InputLabel>
                                            <Select defaultValue="" id="mapping-select">
                                                {selectOptions.map(option => {
                                                    return (
                                                        <MenuItem key={option} value={option}>{option}</MenuItem>
                                                    )
                                                })}
                                            </Select>
                                        </FormControl>
                                    </span>
                                </TableCell>
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

DataTable.propTypes = {
    fileData: PropTypes.array.isRequired
}