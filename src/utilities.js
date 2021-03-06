import XLSX from 'xlsx'
/**
 * https://www.npmjs.com/package/xlsx
 * https://qawithexperts.com/article/javascript/read-excel-file-using-javascript-xlsx-or-xls/239
 * https://stackoverflow.com/questions/46909260/reading-excel-file-in-reactjs
 * https://simon-schraeder.de/posts/filereader-async/
 *
 * @param {object} file
 * @returns Promise
 */
export const parseSpreadsheetData = async (file) => {
  return new Promise((resolve, reject) => {
    try {
      let reader = new FileReader()

      reader.onload = (e) => {
        // If the file is over half a MB, too loarge for demo (:
        console.log((e.total / 1024 / 1024).toFixed(4) + 'MB')
        if ((e.total / 1024 / 1024).toFixed(4) > 1.5) {
          resolve({ error: true })
        }
        const data = e.target.result
        const convertedData = XLSX.read(data, { type: 'binary' })
        const worksheetName = convertedData.SheetNames[0]
        const worksheet = convertedData.Sheets[worksheetName]
        const parsedData = XLSX.utils.sheet_to_json(worksheet, { header: 1 })
        resolve(parsedData)
      }

      reader.onerror = reject

      reader.readAsBinaryString(file)
    } catch {
      console.log('file explorer closed before selecting file')
    }
  })
}

/**
 * Make the header column names more useful for our app
 * by wrapping them in an object with their own 'ignore'
 * and 'mapping' values.
 *
 * Extra Credit - utilize the selectOptions list to to check
 * if the header name is a perfect match with any of the
 * selectOptions.
 *
 * @param {array} headers
 * @returns array
 */
export const setDefaultMappings = (headers) => {
  let withDefaultMappings = headers.map((header) => {
    let mappedValue = null

    selectOptions.forEach((option) => {
      if (header.toString().trim().toLowerCase() === option) {
        mappedValue = option
      }
    })

    return {
      value: header,
      ignore: false,
      mapping: mappedValue,
    }
  })
  return withDefaultMappings
}

/**
 * Extra Credit - if the addDefaultMappings function mapped
 * an initial header value with a select option, we want to
 * disable that option off the bat. This map() & forEach()
 * check to see if a mapped header value matches a select
 * option, and if so, we want the option to startDisabled
 */
export const setDefaultSelectOptions = (headers) => {
  const options = selectOptions.map((option) => {
    let startDisabled = false

    headers.forEach((header) => {
      if (header.mapping === option) {
        startDisabled = true
      }
    })

    return {
      value: option,
      disabled: startDisabled,
    }
  })
  return options
}

/**
 * Our static list of selectable options
 */
const selectOptions = [
  'address',
  'age',
  'diagnosis',
  'dominant hand',
  'ethnicity',
  'id',
  'nationality',
  'occupation',
  'political party',
  'race',
  'religion',
  'ses',
  'sex',
  'years of schooling',
]
