// src/pages/Invoices/editInvoice.tsx

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  InvoiceContainer,
  Input,
  Select,
} from "../../styles/InvoiceStyles";
import { Button } from "../../components/ui/Button";
import { toast } from "react-toastify";

// Interfaces
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

const EditInvoice: React.FC = () => {
  const { id } = useParams(); // invoiceId from URL
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [inventoryList, setInventoryList] = useState<Inventory[]>([]);

  // Fetch invoice data
  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const res = await axios.get(`/api/invoices/${id}`);
        const invoice = res.data;
        setFormData({
          customerId: invoice.customerId,
          inventoryId: invoice.inventoryId,
          invoiceNumber: invoice.invoiceNumber,
          amount: invoice.amount.toString(),
          status: invoice.status,
          dueDate: invoice.dueDate,
          items: invoice.items,
          bankAccount: invoice.bankAccount,
        });
      } catch {
        toast.error("Failed to load invoice.");
        navigate("/invoices");
      }
    };

    const fetchCustomers = async () => {
      try {
        const res = await axios.get("/api/customers");
        setCustomers(res.data);
      } catch {
        toast.error("Failed to load customers.");
      }
    };

    fetchInvoice();
    fetchCustomers();
  }, [id, navigate]);

  // Fetch inventory when customer changes
  useEffect(() => {
    const fetchInventory = async () => {
      if (!formData.customerId) return;
      try {
        const res = await axios.get(`/api/inventory?customerId=${formData.customerId}`);
        setInventoryList(res.data);
      } catch {
        toast.error("Failed to load inventory.");
      }
    };
    fetchInventory();
  }, [formData.customerId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.put(`/api/invoices/${id}`, {
        ...formData,
        amount: parseFloat(formData.amount),
      });
      toast.success("✅ Invoice updated successfully!");
      navigate("/invoices");
    } catch {
      toast.error("❌ Failed to update invoice.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <InvoiceContainer style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h1>Edit Invoice</h1>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <Select name="customerId" value={formData.customerId} onChange={handleChange} required>
          <option value="">Select Customer</option>
          {customers.map((customer) => (
            <option key={customer._id} value={customer._id}>
              {customer.companyName}
            </option>
          ))}
        </Select>

        {formData.customerId && (
          <Select name="inventoryId" value={formData.inventoryId} onChange={handleChange} required>
            <option value="">Select Inventory</option>
            {inventoryList.map((inv) => (
              <option key={inv._id} value={inv._id}>
                {inv.goods} – {inv.type} – {inv.weight}kg
              </option>
            ))}
          </Select>
        )}

        <Input type="text" name="invoiceNumber" value={formData.invoiceNumber} onChange={handleChange} readOnly />
        <Input type="number" name="amount" value={formData.amount} onChange={handleChange} required />
        <Input type="text" name="bankAccount" value={formData.bankAccount} onChange={handleChange} required />
        <Select name="status" value={formData.status} onChange={handleChange} required>
          <option value="Pending">Pending</option>
          <option value="Paid">Paid</option>
          <option value="Overdue">Overdue</option>
        </Select>
        <Input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} required />
        <textarea
          name="items"
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
          {loading ? "Updating..." : "Update Invoice"}
        </Button>
      </form>
    </InvoiceContainer>
  );
};

export default EditInvoice;
