import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { parseExcelSpreadsheetData, addDefaultMappings, selectOptions } from '../utilities'
import DataTable from './DataTable'
import Submit from './Submit'
export default function Upload({ buttonText }) {

  const [file, setFile] = useState(null)


  const onFileUpload = async (event) => {
    const spreadsheet = event.target.files[0]
    const fileData = await parseExcelSpreadsheetData(spreadsheet)
    const headers = addDefaultMappings(fileData[0])
    const rows = fileData.slice(1)

    const options = selectOptions.map(option => {
      return ({
        value: option,
        disabled: false
      })
    })

    setFile({
      spreadsheet,
      fileData: {
        headers,
        rows
      },
      selectableOptions: options
    })
  }

  const onCheckboxClicked = (option) => {
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

  const onDropDownSelection = (mappedValue, columnName) => {
    console.log(mappedValue)
    console.log(columnName)
    let previousSelection = null

    const updatedHeaders = file.fileData.headers.map(header => {

      if (header.value === columnName) {
        previousSelection = header.mapping
        return {
          ...header,
          mapping: mappedValue
        }
      } else {
        return header
      }
    })

    const updatedSelectOptions = file.selectableOptions.map(option => {
      if (option.value === mappedValue || option.value === previousSelection) {
        return {
          ...option,
          disabled: !option.disabled
        }
      } else {
        return option
      }

    })

    setFile(prevState => ({
      ...prevState,
      fileData: {
        ...prevState.fileData,
        headers: updatedHeaders
      },
      selectableOptions: updatedSelectOptions
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
          <Submit headers={file.fileData.headers} />
          <DataTable
            fileData={file.fileData}
            onCheckboxClicked={onCheckboxClicked}
            onDropDownSelection={onDropDownSelection}
            selectOptions={file.selectableOptions}
          />

        </>
      }

    </>
  )
}

Upload.propTypes = {
  buttonText: PropTypes.string.isRequired
}