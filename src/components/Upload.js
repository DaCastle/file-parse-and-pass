import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { FileDrop } from 'react-file-drop'
import Button from '@material-ui/core/Button'
import {
  parseSpreadsheetData,
  setDefaultMappings,
  setDefaultSelectOptions,
} from '../utilities'
import DataTable from './DataTable'
import Submit from './Submit'
export default function Upload({ buttonText }) {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState({ isLoading: false, error: false })

  /**
   * on 'click' - the event target will have the file,
   * on 'drop' - the file is passed as a seperate arg
   */
  const onFileUpload = async (event, file = false) => {
    // reset state if sequential file uploads occur
    setFile(null)
    setLoading({ isLoading: true, error: false })

    const spreadsheet = file ? file : event.target.files[0]
    const fileData = await parseSpreadsheetData(spreadsheet)

    if (fileData.error) {
      setLoading({ isLoading: false, error: true })
    } else {
      const headers = setDefaultMappings(fileData[0])
      const options = setDefaultSelectOptions(headers)
      const rows = fileData.slice(1)

      setFile({
        spreadsheet,
        fileData: {
          headers,
          rows,
        },
        selectableOptions: options,
      })

      setLoading({ isLoading: false, error: false })
    }
  }

  /**
   * When a checkbox is clicked, find the clicked
   * header object and swap the ignore flag
   *
   * @param {string} option
   */
  const onCheckboxClicked = (option) => {
    const updatedHeaders = file.fileData.headers.map((header) => {
      if (header.value === option.value) {
        return {
          value: header.value,
          ignore: !header.ignore,
          mapping: header.mapping,
        }
      } else {
        return header
      }
    })

    setFile((prevState) => ({
      ...prevState,
      fileData: {
        ...prevState.fileData,
        headers: updatedHeaders,
      },
    }))
  }

  /**
   * @param {string} mappedValue
   * @param {string} columnName
   */
  const onDropDownSelection = (mappedValue, columnName) => {
    let previousSelection = null

    /**
     * find the selected header object that matches the columnName
     * whose dropdown was used. Take note of the current(previous)
     * selected value as previousSelection. Then return the new
     * header object having the updated selected option.
     */
    const updatedHeaders = file.fileData.headers.map((header) => {
      if (header.value === columnName) {
        previousSelection = header.mapping
        return {
          ...header,
          mapping: mappedValue,
        }
      } else {
        return header
      }
    })

    /**
     * Swap the select option 'disabled' flag for both the previous
     * and newly selected options. previousSelection will become available,
     * and the new mappedValue will become disabled.
     */
    const updatedSelectOptions = file.selectableOptions.map((option) => {
      if (option.value === mappedValue || option.value === previousSelection) {
        return {
          ...option,
          disabled: !option.disabled,
        }
      } else {
        return option
      }
    })

    setFile((prevState) => ({
      ...prevState,
      fileData: {
        ...prevState.fileData,
        headers: updatedHeaders,
      },
      selectableOptions: updatedSelectOptions,
    }))
  }

  const onFileDrop = (file, event) => {
    /**
     * reusing onFileUpload (:
     */
    onFileUpload(event, file)
  }

  const loadingIcon = (
    <div class='lds-ring'>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )

  return (
    <>
      <label htmlFor='upload-file'>
        <FileDrop onDrop={(files, event) => onFileDrop(files[0], event)}>
          <input
            hidden
            id='upload-file'
            data-testid='upload-file'
            name='upload-file'
            type='file'
            onChange={(event) => onFileUpload(event)}
          />

          <Button color='secondary' variant='contained' component='span'>
            {loading.isLoading ? loadingIcon : buttonText}
          </Button>
        </FileDrop>
      </label>

      {loading.error && (
        <p>The file is too large for this demo - max file size is 1.5MB</p>
      )}

      {file && (
        <>
          <p>{file.spreadsheet.name} selected</p>
          <p>{file.fileData.rows.length} rows of data found</p>

          <Submit
            headers={file.fileData.headers}
            rows={file.fileData.rows}
            spreadsheet={file.spreadsheet}
          />

          <DataTable
            fileData={file.fileData}
            onCheckboxClicked={onCheckboxClicked}
            onDropDownSelection={onDropDownSelection}
            selectOptions={file.selectableOptions}
          />
        </>
      )}
    </>
  )
}

Upload.propTypes = {
  buttonText: PropTypes.string.isRequired,
}
