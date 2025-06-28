import { saveAs } from 'file-saver';

export const exportCSV = (data: any[], filename: string) => {
  if (data.length === 0) return;

  const headers = Object.keys(data[0]);
  const csvRows = [
    headers.join(','), 
    ...data.map((row) =>
      headers.map((header) => {
        let value = row[header];
        if (typeof value === 'object') {
          value = JSON.stringify(value);
        }
        return `"${String(value).replace(/"/g, '""')}"`; 
      }).join(',')
    ),
  ];

  const csvContent = csvRows.join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, `${filename}.csv`);
};
