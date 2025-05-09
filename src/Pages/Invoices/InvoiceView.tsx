// src/pages/Invoices/InvoiceView.tsx

import { InvoiceContainer } from "@/styles/invoiceStyles";
import { Button } from "@/components/ui/button";

interface Customer {
  name: string;
  email: string;
  address: string;
  postCode: string;
  city: string;
  phone: string;
}

interface InventoryItem {
  arrivalDate: string;
  departureDate: string;
  customer: string;
  goods: string;
  type: string;
  quantity: number;
  weight: number;
  sender: {
    name: string;
    email: string;
    phone: string;
    company: string;
  };
}

interface BankInfo {
  accountNumber: string;
  kidNumber: string;
}

interface Invoice {
  id: number;
  invoiceNumber: string;
  company: string;
  customer: Customer;
  products: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  total: number;
  tax: number;
  grandTotal: number;
  status: "Paid" | "Pending" | "Overdue";
  date: string;
  dueDate?: string;
  inventoryItems: InventoryItem[];
  bankInfo: BankInfo;
}

interface Props {
  invoice: Invoice;
  onBack: () => void;
  onDownload: () => void;
}

const InvoiceView: React.FC<Props> = ({ invoice, onBack, onDownload }) => {
  const totalQty = invoice.inventoryItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalWeight = invoice.inventoryItems.reduce((sum, item) => sum + item.weight, 0);

  return (
    <InvoiceContainer style={{ maxWidth: "1000px", margin: "0 auto", backgroundColor: "#fff", padding: "32px", borderRadius: "12px" }}>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginBottom: "24px" }}>
        <Button onClick={onBack}>← Tilbake</Button>
        <Button onClick={onDownload}>⬇ Last ned PDF</Button>
      </div>

      {/* Invoice Header */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "32px" }}>
        <div>
          <h2>{invoice.company}</h2>
          <p>Stanseveien 33, 0976 Oslo</p>
          <p>Email: firmapost@tbs.no</p>
          <p>Org.nr: 916 411 258</p>
        </div>
        <div>
          <h1 style={{ fontSize: "28px", color: "#dc2626" }}>FAKTURA</h1>
          <p><strong>Fakturanr:</strong> {invoice.invoiceNumber}</p>
          <p><strong>Dato:</strong> {new Date(invoice.date).toLocaleDateString("no-NO")}</p>
          {invoice.dueDate && <p><strong>Forfallsdato:</strong> {new Date(invoice.dueDate).toLocaleDateString("no-NO")}</p>}
          <p><strong>Status:</strong> {invoice.status === "Paid" ? "Betalt" : invoice.status}</p>
        </div>
      </div>

      {/* Customer Info */}
      <div style={{ marginBottom: "28px" }}>
        <h3>Kundeinformasjon</h3>
        <p><strong>{invoice.customer.name}</strong></p>
        <p>{invoice.customer.address}, {invoice.customer.postCode} {invoice.customer.city}</p>
        <p>Tlf: {invoice.customer.phone}</p>
        <p>E-post: {invoice.customer.email}</p>
      </div>

      {/* Product Info */}
      <div style={{ marginBottom: "32px" }}>
        <h3>Fakturadetaljer</h3>
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "12px" }}>
          <thead>
            <tr style={{ backgroundColor: "#f3f4f6" }}>
              <th style={{ padding: "10px" }}>Produkt</th>
              <th style={{ padding: "10px" }}>Antall</th>
              <th style={{ padding: "10px" }}>Enhet</th>
              <th style={{ padding: "10px" }}>Pris/stk</th>
              <th style={{ padding: "10px" }}>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: "10px" }}>{invoice.products}</td>
              <td style={{ padding: "10px" }}>{invoice.quantity}</td>
              <td style={{ padding: "10px" }}>{invoice.unit}</td>
              <td style={{ padding: "10px" }}>{invoice.unitPrice.toFixed(2)} kr</td>
              <td style={{ padding: "10px" }}>{invoice.total.toFixed(2)} kr</td>
            </tr>
          </tbody>
        </table>
        <div style={{ marginTop: "16px", textAlign: "right" }}>
          <p><strong>MVA ({invoice.tax}%):</strong> {((invoice.total * invoice.tax) / 100).toFixed(2)} kr</p>
          <p><strong>Totalt inkl. MVA:</strong> {invoice.grandTotal.toFixed(2)} kr</p>
        </div>
      </div>

      {/* Inventory Info */}
      <div style={{ marginBottom: "32px" }}>
        <h3>Vedlagt godsliste</h3>
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
          <thead>
            <tr style={{ backgroundColor: "#f3f4f6" }}>
              <th style={{ padding: "8px" }}>Ankomst</th>
              <th style={{ padding: "8px" }}>Kunde</th>
              <th style={{ padding: "8px" }}>Vare</th>
              <th style={{ padding: "8px" }}>Type</th>
              <th style={{ padding: "8px" }}>Antall</th>
              <th style={{ padding: "8px" }}>Vekt (kg)</th>
              <th style={{ padding: "8px" }}>Avgang</th>
              <th style={{ padding: "8px" }}>Sender Navn</th>
              <th style={{ padding: "8px" }}>Firma</th>
              <th style={{ padding: "8px" }}>E-post</th>
              <th style={{ padding: "8px" }}>Telefon</th>
            </tr>
          </thead>
          <tbody>
            {invoice.inventoryItems.map((item, index) => (
              <tr key={index}>
                <td style={{ padding: "8px" }}>{item.arrivalDate}</td>
                <td style={{ padding: "8px" }}>{item.customer}</td>
                <td style={{ padding: "8px" }}>{item.goods}</td>
                <td style={{ padding: "8px" }}>{item.type}</td>
                <td style={{ padding: "8px" }}>{item.quantity}</td>
                <td style={{ padding: "8px" }}>{item.weight}</td>
                <td style={{ padding: "8px" }}>{item.departureDate}</td>
                <td style={{ padding: "8px" }}>{item.sender?.name || "-"}</td>
                <td style={{ padding: "8px" }}>{item.sender?.company || "-"}</td>
                <td style={{ padding: "8px" }}>{item.sender?.email || "-"}</td>
                <td style={{ padding: "8px" }}>{item.sender?.phone || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ marginTop: "8px" }}>
          <strong>Total antall:</strong> {totalQty} &nbsp; | &nbsp;
          <strong>Total vekt:</strong> {totalWeight.toFixed(1)} kg
        </p>
      </div>

      {/* Bank Info */}
      <div style={{ marginBottom: "32px" }}>
        <h3>Betalingsinformasjon</h3>
        <p><strong>Konto:</strong> {invoice.bankInfo.accountNumber}</p>
        <p><strong>KID:</strong> {invoice.bankInfo.kidNumber}</p>
      </div>
    </InvoiceContainer>
  );
};

export default InvoiceView;
