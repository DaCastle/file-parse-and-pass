import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

export default function Submit({ headers, rows, spreadsheet }) {

    let disable = false

    headers.forEach(header => {
        if (!header.ignore && !header.mapping) {
            disable = true
        }
    })

    const onSubmit = () => {

        /**
         * here would be api reachout, going to print to console for this POC
         */
        // const requestOptions = {
        //     method: 'PUT',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: {
        //         spreadsheet,
        //         headers,
        //         rows
        //     }
        // }
        // fetch('https://google.com', requestOptions)
        //     .then(response => response.json())
        //     .then(data => console.log(data))

        console.log('spreadsheet - ', spreadsheet)
        console.log('headers - ', headers)
        console.table('rows - ', rows)

    }

    return (
        <Button id='submitButton' onClick={() => onSubmit()} disabled={disable} variant="contained" color="primary">
            Submit
        </Button>
    )
}

Submit.propTypes = {
    headers: PropTypes.array.isRequired,
    rows: PropTypes.array.isRequired,
    spreadsheet: PropTypes.object.isRequired
}