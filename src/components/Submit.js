import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

export default function Submit({headers}) {

    let disable = false

    headers.forEach(header => {
        if (!header.ignore && !header.mapping) {
            disable = true
        }
    })

    return (
        <Button id='submitButton' disabled={disable} variant="contained" color="primary">
        Submit
      </Button>
    )
}

Submit.propTypes = {
    headers: PropTypes.array.isRequired
  }