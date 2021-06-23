import XLSX from 'xlsx'

export const parseExcelSpreadsheetData = (file) => {

    const reader = new FileReader();

    reader.onload = function (e) {
        const data = e.target.result;
        const convertedData = XLSX.read(data, { type: 'binary' });
        const worksheetName = convertedData.SheetNames[0];
        const worksheet = convertedData.Sheets[worksheetName];

        const dataParse = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        console.log(dataParse)
        return dataParse
    };
    reader.readAsBinaryString(file)
}