import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { parseExcelSpreadsheetData } from '../utilities'
import DataTable from './DataTable'

export default function Upload({ buttonText }) {

  const [file, setFile] = useState(null)

  const onChange = async (event) => {
    const spreadsheet = event.target.files[0]
    const fileData = await parseExcelSpreadsheetData(spreadsheet)
    setFile({
      spreadsheet,
      fileData
    })
  }
  return (
    <>
      <label htmlFor="upload-file">
        <input
          hidden
          id="upload-file"
          name="upload-file"
          type="file"
          onChange={(event) => onChange(event)}
        />
        <Button color="secondary" variant="contained" component="span">
          {buttonText}
        </Button>
      </label>
      {file &&
        <>
          <p>{file.spreadsheet.name} selected</p>
          <p>{file.fileData.length - 1} rows of data found</p>
          <DataTable fileData={file.fileData} />
        </>
      }

    </>
  )
}