// src/pages/Invoices/InvoiceModal.tsx

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  ModalOverlay,
  ModalContentScrollable,
  Input,
  Select,
} from "@/styles/InvoiceStyles";
import { Button } from "@/components/ui/Button";

// ✅ Customer interface
interface Customer {
  _id: string;
  companyName: string;
  companyEmail: string;
  companyPhone: string;
  orgNumber: string;
  zipCode: string;
  address: string;
  city: string;
}

interface InvoiceModalProps {
  onClose: () => void;
}

const InvoiceModal: React.FC<InvoiceModalProps> = ({ onClose }) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: "",
    products: "",
    quantity: 1,
    unit: "stk",
    unitPrice: 0,
    total: 0,
    tax: 0,
    grandTotal: 0,
    accountNumber: "",
    kidNumber: "",
    companyEmail: "",
    companyPhone: "",
    orgNumber: "",
    zipCode: "",
    address: "",
    city: "",
  });

  // 🔢 Generate next invoice number
  const generateNextInvoiceNumber = () => {
    const last = localStorage.getItem("lastInvoiceNumber");
    let next = 1;
    if (last) {
      const match = last.match(/TBS-(\d+)/);
      if (match) next = parseInt(match[1]) + 1;
    }
    const newNumber = `TBS-${String(next).padStart(3, "0")}`;
    localStorage.setItem("lastInvoiceNumber", newNumber);
    return newNumber;
  };

  // 🔄 Load customers
  const fetchCustomers = useCallback(async () => {
    try {
      const res = await axios.get("/api/customers");
      setCustomers(res.data || []);
    } catch {
      setError("Failed to load customers.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCustomers();
    const autoNumber = generateNextInvoiceNumber();
    setInvoiceData((prev) => ({ ...prev, invoiceNumber: autoNumber }));
  }, [fetchCustomers]);

  // 🔁 Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const parsed = name === "quantity" || name === "unitPrice" ? Number(value) : value;

    setInvoiceData((prev) => {
      const updated = { ...prev, [name]: parsed };
      const total = Number(updated.quantity) * Number(updated.unitPrice);
      const tax = +(total * 0.25).toFixed(2);
      const grandTotal = +(total + tax).toFixed(2);

      return { ...updated, total, tax, grandTotal };
    });
  };

  // 🔘 Customer selection
  const handleCustomerSelect = (id: string) => {
    const customer = customers.find((c) => c._id === id);
    if (customer) {
      setSelectedCustomerId(id);
      setInvoiceData((prev) => ({
        ...prev,
        companyEmail: customer.companyEmail,
        companyPhone: customer.companyPhone,
        orgNumber: customer.orgNumber,
        zipCode: customer.zipCode,
        address: customer.address,
        city: customer.city,
      }));
    }
  };

  // ✅ Submit invoice
  const handleAddInvoice = async () => {
    if (!selectedCustomerId || !invoiceData.invoiceNumber || !invoiceData.accountNumber || !invoiceData.kidNumber) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      await axios.post("/api/invoices", {
        customerId: selectedCustomerId,
        invoiceNumber: invoiceData.invoiceNumber,
        products: invoiceData.products,
        quantity: invoiceData.quantity,
        unit: invoiceData.unit,
        unitPrice: invoiceData.unitPrice,
        total: invoiceData.total,
        tax: invoiceData.tax,
        grandTotal: invoiceData.grandTotal,
        items: `${invoiceData.products} - ${invoiceData.quantity} ${invoiceData.unit}`,
        bankInfo: {
          accountNumber: invoiceData.accountNumber,
          kidNumber: invoiceData.kidNumber,
        },
      });

      alert("Invoice created successfully!");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to create invoice.");
    }
  };

  return (
    <ModalOverlay>
      <ModalContentScrollable>
        <h2 style={{ marginBottom: "20px" }}>Create Invoice</h2>

        {error && <div style={{ color: "red", marginBottom: "12px" }}>{error}</div>}

        {loading ? (
          <p>Loading customers...</p>
        ) : (
          <Select value={selectedCustomerId} onChange={(e) => handleCustomerSelect(e.target.value)}>
            <option value="">Select Customer</option>
            {customers.map((c) => (
              <option key={c._id} value={c._id}>
                {c.companyName}
              </option>
            ))}
          </Select>
        )}

        {/* Invoice fields */}
        <Input name="invoiceNumber" value={invoiceData.invoiceNumber} readOnly />
        <Input name="products" placeholder="Products" value={invoiceData.products} onChange={handleChange} />
        <Input name="quantity" type="number" placeholder="Quantity" value={invoiceData.quantity} onChange={handleChange} />
        <Input name="unit" placeholder="Unit" value={invoiceData.unit} onChange={handleChange} />
        <Input name="unitPrice" type="number" placeholder="Unit Price" value={invoiceData.unitPrice} onChange={handleChange} />
        <Input name="accountNumber" placeholder="Bank Account" value={invoiceData.accountNumber} onChange={handleChange} />
        <Input name="kidNumber" placeholder="KID Number" value={invoiceData.kidNumber} onChange={handleChange} />

        {/* Totals */}
        <Input value={`Total: ${invoiceData.total.toFixed(2)} kr`} readOnly />
        <Input value={`VAT (25%): ${invoiceData.tax.toFixed(2)} kr`} readOnly />
        <Input value={`Grand Total: ${invoiceData.grandTotal.toFixed(2)} kr`} readOnly />

        {/* Customer info preview */}
        <Input value={invoiceData.companyEmail} readOnly />
        <Input value={invoiceData.companyPhone} readOnly />
        <Input value={invoiceData.orgNumber} readOnly />
        <Input value={invoiceData.zipCode} readOnly />
        <Input value={invoiceData.address} readOnly />
        <Input value={invoiceData.city} readOnly />

        {/* Buttons */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "24px" }}>
          <Button onClick={onClose} style={{ backgroundColor: "#ccc", color: "#000" }}>
            Cancel
          </Button>
          <Button onClick={handleAddInvoice}>Save Invoice</Button>
        </div>
      </ModalContentScrollable>
    </ModalOverlay>
  );
};

export default InvoiceModal;
