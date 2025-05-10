// src/pages/Invoices/CreateInvoice.tsx

import { useState, useEffect } from "react";
import axios from "axios";
import {
  InvoiceContainer,
  Input,
  Select,
} from "../../styles/invoiceStyles";
import { Button } from "../../components/ui/button";
import { toast } from "react-toastify";

// ✅ Interfaces

interface Inventory {
  _id: string;
  goods: string;
  type: string;
  weight: string;
  arrivalDate: string;
}

interface Customer {
  _id: string;
  companyName: string;
}

interface InvoiceForm {
  customerId: string;
  inventoryId: string;
  invoiceNumber: string;
  amount: string;
  status: "Paid" | "Pending" | "Overdue";
  dueDate: string;
  items: string;
  bankAccount: string;
}

const CreateInvoice: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [inventoryList, setInventoryList] = useState<Inventory[]>([]);
  const [formData, setFormData] = useState<InvoiceForm>({
    customerId: "",
    inventoryId: "",
    invoiceNumber: "",
    amount: "",
    status: "Pending",
    dueDate: "",
    items: "",
    bankAccount: "",
  });
  const [loading, setLoading] = useState(false);

  // 📌 Generate next invoice number
  const generateNextInvoiceNumber = () => {
    const current = localStorage.getItem("lastInvoiceNumber");
    let nextNumber = 1;

    if (current) {
      const match = current.match(/TBS-(\d+)/);
      if (match) {
        nextNumber = parseInt(match[1]) + 1;
      }
    }

    const newNumber = `TBS-${String(nextNumber).padStart(2, "0")}`;
    localStorage.setItem("lastInvoiceNumber", newNumber);
    return newNumber;
  };

  // 📦 Fetch all customers from API
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await axios.get("/api/customers");
        setCustomers(res.data);
      } catch {
        toast.error("Failed to load customers.");
      }
    };

    fetchCustomers();
    const autoNumber = generateNextInvoiceNumber();
    setFormData((prev) => ({ ...prev, invoiceNumber: autoNumber }));
  }, []);

  // 📦 Fetch inventory based on selected customer
  useEffect(() => {
    const fetchInventoryByCustomer = async () => {
      if (!formData.customerId) return;
      try {
        const res = await axios.get(`/api/inventory?customerId=${formData.customerId}`);
        setInventoryList(res.data);
      } catch {
        toast.error("Failed to load inventory for this customer.");
      }
    };

    fetchInventoryByCustomer();
  }, [formData.customerId]);

  // ✍️ Handle field changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Submit form to backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.customerId || !formData.invoiceNumber || !formData.amount || !formData.inventoryId || !formData.bankAccount) {
      toast.warning("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    try {
      await axios.post("/api/invoices", {
        ...formData,
        amount: parseFloat(formData.amount),
      });

      toast.success("✅ Invoice created successfully!");

      // Reset form and regenerate number
      setFormData({
        customerId: "",
        inventoryId: "",
        invoiceNumber: generateNextInvoiceNumber(),
        amount: "",
        status: "Pending",
        dueDate: "",
        items: "",
        bankAccount: "",
      });
      setInventoryList([]);
    } catch {
      toast.error("❌ Failed to create invoice.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <InvoiceContainer style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h1>Create Invoice</h1>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {/* 🔽 Customer Selector */}
        <Select
          name="customerId"
          value={formData.customerId}
          onChange={handleChange}
          required
        >
          <option value="">Select Customer</option>
          {customers.map((customer) => (
            <option key={customer._id} value={customer._id}>
              {customer.companyName}
            </option>
          ))}
        </Select>

        {/* 📦 Inventory Selector */}
        {formData.customerId && (
          <Select
            name="inventoryId"
            value={formData.inventoryId}
            onChange={handleChange}
            required
          >
            <option value="">Select Inventory</option>
            {inventoryList.map((inv) => (
              <option key={inv._id} value={inv._id}>
                {inv.goods} – {inv.type} – {inv.weight}kg
              </option>
            ))}
          </Select>
        )}

        {/* 🔢 Invoice Number */}
        <Input
          type="text"
          name="invoiceNumber"
          value={formData.invoiceNumber}
          onChange={handleChange}
          readOnly
        />

        <Input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          required
        />

        <Input
          type="text"
          name="bankAccount"
          placeholder="Bank Account Number"
          value={formData.bankAccount}
          onChange={handleChange}
          required
        />

        <Select
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
        >
          <option value="Pending">Pending</option>
          <option value="Paid">Paid</option>
          <option value="Overdue">Overdue</option>
        </Select>

        <Input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          required
        />

        <textarea
          name="items"
          placeholder="Invoice items or description"
          value={formData.items}
          onChange={handleChange}
          rows={4}
          required
          style={{
            padding: "12px 16px",
            borderRadius: "10px",
            border: "1px solid #d1d5db",
            fontSize: "15px",
            resize: "vertical",
            backgroundColor: "#f9fafb",
          }}
        />

        <Button type="submit" $variant="primary" $fullWidth>
          {loading ? "Creating..." : "Create Invoice"}
        </Button>
      </form>
    </InvoiceContainer>
  );
};

export default CreateInvoice;
