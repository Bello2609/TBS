import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

// Export to PDF
export const exportToPDF = <T extends Record<string, unknown>>(data: T[], title: string) => {
  if (data.length === 0) return;
  const doc = new jsPDF();
  const tableData: (string | number | boolean | null)[][] = data.map((item) =>
    Object.values(item).map((v) =>
      typeof v === "string" || typeof v === "number" || typeof v === "boolean" ? v : v === null ? "" : JSON.stringify(v)
    )
  );

  doc.text(title, 10, 10);
  autoTable(doc, { head: [Object.keys(data[0])], body: tableData });

  doc.save(`${title}.pdf`);
};

export const exportToExcel = <T extends Record<string, unknown>>(data: T[], title: string) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  XLSX.writeFile(workbook, `${title}.xlsx`);
};