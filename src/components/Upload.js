import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { parseExcelSpreadsheetData, addDefaultMappings } from '../utilities'
import DataTable from './DataTable'

export default function Upload({ buttonText }) {

  const [file, setFile] = useState(null)


  const onFileUpload = async (event) => {
    const spreadsheet = event.target.files[0]
    const fileData = await parseExcelSpreadsheetData(spreadsheet)
    const headers = addDefaultMappings(fileData[0])
    const rows = fileData.slice(1)

    setFile({
      spreadsheet,
      fileData: {
        headers,
        rows
      }
    })
  }

  const oncheckboxClicked = (option) => {
    const updatedHeaders = file.fileData.headers.map(header => {
      if (header.value === option.value) {
        return {
          value: header.value,
          ignore: !header.ignore,
          mapping: header.mapping
        }
      } else {
        return header
      }
    })

    setFile(prevState => ({
      ...prevState,
      fileData: {
        ...prevState.fileData,
        headers: updatedHeaders
      }
    }))
  }

  return (
    <>
      <label htmlFor="upload-file">
        <input
          hidden
          id="upload-file"
          name="upload-file"
          type="file"
          onChange={(event) => onFileUpload(event)}
        />
        <Button color="secondary" variant="contained" component="span">
          {buttonText}
        </Button>
      </label>
      {file &&
        <>
          <p>{file.spreadsheet.name} selected</p>
          <p>{file.fileData.rows.length} rows of data found</p>
          <DataTable fileData={file.fileData} oncheckboxClicked={oncheckboxClicked} />
        </>
      }

    </>
  )
}

Upload.propTypes = {
  buttonText: PropTypes.string.isRequired
}