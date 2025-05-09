import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

// Export to PDF

export const exportToPDF = (data: any[], title: string) => {
  const doc = new jsPDF();
  const tableData = data.map((item) => Object.values(item));

  doc.text(title, 10, 10);
  autoTable(doc, { head: [Object.keys(data[0])], body: tableData });

  doc.save(`${title}.pdf`);
};

export const exportToExcel = (data: any[], title: string) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  XLSX.writeFile(workbook, `${title}.xlsx`);
};