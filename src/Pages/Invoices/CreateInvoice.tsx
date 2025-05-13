// src/pages/invoices/CreateInvoice.tsx

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/services/axiosInstance";
import { toast } from "react-toastify";
import {
  InvoiceContainer,
  TopBar,
  PageTitle,
  FormSection,
  FormRow,
  Input,
  Select,
  Textarea,
} from "@/styles/invoiceStyles";
import { Button } from "@/components/ui/button";

interface Customer {
  _id: string;
  companyName: string;
}

interface Inventory {
  _id: string;
  goods: string;
  type: string;
  weight: number;
  arrivalDate: string;
}

const CreateInvoice = () => {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [inventoryList, setInventoryList] = useState<Inventory[]>([]);
  const [selectedInventory, setSelectedInventory] = useState<Inventory | null>(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    customerId: "",
    inventoryId: "",
    invoiceNumber: "",
    status: "Pending" as "Pending" | "Paid" | "Overdue",
    dueDate: "",
    bankAccount: "",
    itemsNote: "",
  });

  const generateInvoiceNumber = () => {
    const date = new Date();
    const datePart = date.toISOString().slice(2, 10).replace(/-/g, "");
    const randPart = Math.floor(Math.random() * 900 + 100);
    return `TBS-${datePart}-${randPart}`;
  };

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const res = await axiosInstance.get("/api/customers");
        setCustomers(res.data);
      } catch {
        toast.error("Failed to load customers.");
      }
    };

    loadCustomers();
    setForm((prev) => ({
      ...prev,
      invoiceNumber: generateInvoiceNumber(),
    }));
  }, []);

  useEffect(() => {
    const loadInventory = async () => {
      if (!form.customerId) return;
      try {
        const res = await axiosInstance.get(
          `/api/inventory/uninvoiced?customerId=${form.customerId}`
        );
        setInventoryList(res.data || []);
      } catch {
        toast.error("Failed to load inventory.");
      }
    };

    loadInventory();
  }, [form.customerId]);

  useEffect(() => {
    const selected = inventoryList.find((i) => i._id === form.inventoryId);
    setSelectedInventory(selected || null);
  }, [form.inventoryId, inventoryList]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.customerId || !form.inventoryId || !form.dueDate || !form.bankAccount) {
      toast.warning("Please fill in all required fields.");
      return;
    }

    if (!selectedInventory) {
      toast.error("Selected inventory not found.");
      return;
    }

    setLoading(true);
    try {
      const unitPrice = 1.0;
      const quantity = selectedInventory.weight;
      const total = quantity * unitPrice;
      const taxRate = 0.25;
      const taxAmount = total * taxRate;
      const grandTotal = total + taxAmount;

      const payload = {
        customerId: form.customerId,
        invoiceNumber: form.invoiceNumber,
        date: new Date().toISOString(),
        dueDate: form.dueDate,
        status: form.status,
        totalQuantity: quantity,
        products: selectedInventory.goods,
        unit: "kg",
        unitPrice: unitPrice,
        items: [
          {
            description: `${selectedInventory.goods} (${selectedInventory.type})`,
            quantity: quantity,
            unitPrice: unitPrice,
            total: total,
          },
        ],
        tax: taxAmount,
        grandTotal: grandTotal,
        inventoryIds: [form.inventoryId],
        bankInfo: {
          accountNumber: form.bankAccount,
          kidNumber: "123456789",
        },
      };

      const res = await axiosInstance.post("/api/invoices", payload);

      toast.success("Invoice created successfully!");
      navigate(`/invoices/${res.data._id}`);
    } catch {
      toast.error("Failed to create invoice.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <InvoiceContainer>
      <TopBar>
        <PageTitle>Create Invoice</PageTitle>
      </TopBar>

      <form onSubmit={handleSubmit}>
        <FormSection>
          <FormRow>
            <label>Customer</label>
            <Select name="customerId" value={form.customerId} onChange={handleChange} required>
              <option value="">Select Customer</option>
              {customers.map((cust) => (
                <option key={cust._id} value={cust._id}>
                  {cust.companyName}
                </option>
              ))}
            </Select>
          </FormRow>

          {form.customerId && (
            <FormRow>
              <label>Inventory</label>
              <Select name="inventoryId" value={form.inventoryId} onChange={handleChange} required>
                <option value="">Select Inventory</option>
                {inventoryList.map((inv) => (
                  <option key={inv._id} value={inv._id}>
                    {inv.goods} – {inv.type} – {inv.weight} kg
                  </option>
                ))}
              </Select>
            </FormRow>
          )}

          <FormRow>
            <label>Invoice Number</label>
            <Input name="invoiceNumber" value={form.invoiceNumber} readOnly />
          </FormRow>

          <FormRow>
            <label>Bank Account</label>
            <Input name="bankAccount" value={form.bankAccount} onChange={handleChange} required />
          </FormRow>

          <FormRow>
            <label>Status</label>
            <Select name="status" value={form.status} onChange={handleChange}>
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
              <option value="Overdue">Overdue</option>
            </Select>
          </FormRow>

          <FormRow>
            <label>Due Date</label>
            <Input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} required />
          </FormRow>

          {selectedInventory && (
            <>
              <FormRow>
                <label>Item Description</label>
                <Textarea
                  name="itemsNote"
                  rows={4}
                  value={`${selectedInventory.goods} (${selectedInventory.type}) – ${selectedInventory.weight} kg\nArrival: ${selectedInventory.arrivalDate}`}
                  readOnly
                />
              </FormRow>

              <FormRow>
                <label>Quantity (kg)</label>
                <Input value={selectedInventory.weight} readOnly />
              </FormRow>

              <FormRow>
                <label>Total (excl. VAT)</label>
                <Input value={(selectedInventory.weight * 1).toFixed(2)} readOnly />
              </FormRow>

              <FormRow>
                <label>VAT (25%)</label>
                <Input value={(selectedInventory.weight * 1 * 0.25).toFixed(2)} readOnly />
              </FormRow>

              <FormRow>
                <label>Grand Total (incl. VAT)</label>
                <Input value={(selectedInventory.weight * 1.25).toFixed(2)} readOnly />
              </FormRow>
            </>
          )}

          <Button type="submit" $variant="primary" $fullWidth disabled={loading}>
            {loading ? "Creating..." : "Create Invoice"}
          </Button>
        </FormSection>
      </form>
    </InvoiceContainer>
  );
};

export default CreateInvoice;
