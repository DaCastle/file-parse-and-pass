export const parseSpreadsheetData = jest.fn(() =>
  Promise.resolve([
    ['Name', 'Gender', 'Age'],
    ['bob', 'M', 35],
    ['jane', 'F', 80],
    ['jordan', 'U', 10],
  ]),
)
