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

export default function DataTable({ fileData, onCheckboxClicked, onDropDownSelection, selectOptions }) {

    const columnHeaders = fileData.headers
    const rows = fileData.rows

    return (
        <TableContainer component={Paper}>
            <Table size="small" stickyHeader={true}>
                <TableHead>
                    <TableRow>
                        {columnHeaders.map((header, index) => {
                            return (
                                <TableCell key={index} className='headers'>
                                    <span>{header.value}</span>
                                    <span>
                                        <FormControlLabel
                                            value="Ignore"
                                            control={<Checkbox onChange={() => onCheckboxClicked(header)} color="primary" />}
                                            label="Ignore"
                                            labelPlacement="end"
                                        />
                                    </span>
                                    <span>
                                        <FormControl id='mapping'>
                                            <InputLabel htmlFor="mapping-select">Mapping</InputLabel>
                                            <Select onChange={(option) => onDropDownSelection(option.target.value, header.value)} defaultValue="" id="mapping-select" disabled={header.ignore}>
                                                <MenuItem key='empty' value={null}>Select an option</MenuItem>
                                                {selectOptions.map(option => {
                                                    return (
                                                        <MenuItem disabled={option.disabled} key={option.value} value={option.value}>{option.value}</MenuItem>
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
    fileData: PropTypes.object.isRequired,
    onCheckboxClicked: PropTypes.func.isRequired,
    onDropDownSelection: PropTypes.func.isRequired,
    selectOptions: PropTypes.array.isRequired
}