import * as FileSystem from 'expo-file-system';
import XLSX from 'xlsx';

export default async function exportXls(dataList) {
  const wb = XLSX.utils.book_new();
  for (const { aba, data } of dataList) {
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, aba);
  }
  const wbout = XLSX.write(wb, {
    type: 'base64',
    bookType: 'xlsx',
  });
  const uri = FileSystem.documentDirectory + 'ficoo.xlsx';
  console.log(`Writing to ${JSON.stringify(uri)}`);
  await FileSystem.writeAsStringAsync(uri, wbout, {
    encoding: FileSystem.EncodingType.Base64,
  });
}
