import XLSX from 'xlsx'

export const parseExcelSpreadsheetData = async (file) => {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();

        reader.onload = (e) => {

            const data = e.target.result;
            const convertedData = XLSX.read(data, { type: 'binary' });
            const worksheetName = convertedData.SheetNames[0];
            const worksheet = convertedData.Sheets[worksheetName];
            const parsedData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            resolve(parsedData);
        };

        reader.onerror = reject;

        reader.readAsBinaryString(file);
    })
}

export const addDefaultMappings = (headers) => {
    let withDefaultMappings = headers.map(header => {
        return ({
            value: header,
            ignore: false,
            mapping: null
        })
    })
    return withDefaultMappings
}

export const selectOptions = [
    "address", "age", "diagnosis", "dominant hand", "ethnicity", "id",
    "nationality", "occupation", "political party", "race", "religion",
    "ses", "sex", "years of schooling"
]
 
