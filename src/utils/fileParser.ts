import Papa from 'papaparse';
import * as XLSX from 'xlsx';

export const parseFile = async (file: File): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const fileExtension = file.name.split('.').pop();

    if (fileExtension === 'csv') {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => resolve(results.data as any[]),
        error: (err) => reject(err),
      });
    } else if (fileExtension === 'xlsx') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const workbook = XLSX.read(e.target?.result, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(sheet);
        resolve(json as any[]);
      };
      reader.onerror = (err) => reject(err);
      reader.readAsBinaryString(file);
    } else {
      reject('Unsupported file type');
    }
  });
};
