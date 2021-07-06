import { fireEvent, render, screen } from '@testing-library/react'
import Upload from './components/Upload'
import * as utils from './utilities'

let file = null

beforeEach(() => {
  file = new File([{ test: 'test' }], 'test.csv', { type: 'excel/csv' })
  jest.spyOn(utils, 'parseSpreadsheetData').mockReturnValue([
    ['Name', 'Gender', 'Age'],
    ['bob', 'M', 35],
    ['jane', 'F', 80],
    ['jordan', 'U', 10],
  ])
})

test('renders the upload button', () => {
  render(<Upload buttonText='Click or Drag excel/csv file here' />)
  const button = screen.getByText('Click or Drag excel/csv file here')
  expect(button).toBeInTheDocument()
})

test('renders the loading icon', async () => {
  const { container } = render(
    <Upload buttonText='Click or Drag excel/csv file here' />,
  )
  const button = screen.getByTestId('upload-file')

  Object.defineProperty(button, 'files', {
    value: [file],
  })

  fireEvent.change(button)

  const loadingIcon = container.getElementsByClassName('lds-ring')
  expect(loadingIcon.length).toBe(1)
})

test('renders the file name selected', async () => {
  render(<Upload buttonText='Click or Drag excel/csv file here' />)
  const button = screen.getByTestId('upload-file')

  Object.defineProperty(button, 'files', {
    value: [file],
  })

  fireEvent.change(button)

  const text = await screen.findByText('test.csv selected')
  expect(text).toBeInTheDocument()
})

test('renders the number of table data rows', async () => {
  render(<Upload buttonText='Click or Drag excel/csv file here' />)
  const button = screen.getByTestId('upload-file')

  Object.defineProperty(button, 'files', {
    value: [file],
  })

  fireEvent.change(button)

  const text = await screen.findByText('3 rows of data found')
  expect(text).toBeInTheDocument()
})

test('renders the submit button', async () => {
  render(<Upload buttonText='Click or Drag excel/csv file here' />)
  const button = screen.getByTestId('upload-file')

  Object.defineProperty(button, 'files', {
    value: [file],
  })

  fireEvent.change(button)

  const text = await screen.findByText('Submit')
  expect(text).toBeInTheDocument()
})

test('renders the column header values', async () => {
  render(<Upload buttonText='Click or Drag excel/csv file here' />)
  const button = screen.getByTestId('upload-file')

  Object.defineProperty(button, 'files', {
    value: [file],
  })

  fireEvent.change(button)

  const text = await screen.findByText('Submit')
  expect(text).toBeInTheDocument()
  expect(screen.getByText('Name')).toBeInTheDocument()
  expect(screen.getByText('Gender')).toBeInTheDocument()
  expect(screen.getByText('Age')).toBeInTheDocument()
})

test('renders the expected number of Ignore checkboxes', async () => {
  render(<Upload buttonText='Click or Drag excel/csv file here' />)
  const button = screen.getByTestId('upload-file')

  Object.defineProperty(button, 'files', {
    value: [file],
  })

  fireEvent.change(button)

  const text = await screen.findByText('Submit')
  expect(text).toBeInTheDocument()
  expect(screen.getAllByText('Ignore').length).toBe(3)
})

test('renders the expected number of mapping dropdowns', async () => {
  render(<Upload buttonText='Click or Drag excel/csv file here' />)
  const button = screen.getByTestId('upload-file')

  Object.defineProperty(button, 'files', {
    value: [file],
  })

  fireEvent.change(button)

  const text = await screen.findByText('Submit')
  expect(text).toBeInTheDocument()
  expect(screen.getAllByText('Mapping').length).toBe(3)
})

test('renders the expected row data', async () => {
  render(<Upload buttonText='Click or Drag excel/csv file here' />)
  const button = screen.getByTestId('upload-file')

  Object.defineProperty(button, 'files', {
    value: [file],
  })

  fireEvent.change(button)

  const text = await screen.findByText('Submit')
  expect(text).toBeInTheDocument()
  expect(screen.getByText('bob')).toBeInTheDocument()
  expect(screen.getByText('F')).toBeInTheDocument()
  expect(screen.getByText('10')).toBeInTheDocument()
})

test('renders the submit button disabled', async () => {
  render(<Upload buttonText='Click or Drag excel/csv file here' />)
  const button = screen.getByTestId('upload-file')

  Object.defineProperty(button, 'files', {
    value: [file],
  })

  fireEvent.change(button)

  const text = await screen.findByText('Submit')
  expect(text).toBeInTheDocument()
  expect(screen.getByText('Submit').parentElement).toBeDisabled()
})

test('renders the submit button enabled', async () => {
  render(<Upload buttonText='Click or Drag excel/csv file here' />)
  const button = screen.getByTestId('upload-file')

  Object.defineProperty(button, 'files', {
    value: [file],
  })

  fireEvent.change(button)

  const text = await screen.findByText('Submit')
  expect(text).toBeInTheDocument()
  const checkboxButtons = screen.getAllByTestId('ignore-checkbox')
  checkboxButtons.forEach((button) => {
    fireEvent.click(button)
  })
  expect(screen.getByText('Submit').parentElement).toBeEnabled()
})
