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

interface InvoiceForm {
  customerId: string;
  inventoryId: string;
  invoiceNumber: string;
  amount: number;
  status: "Pending" | "Paid" | "Overdue";
  dueDate: string;
  items: string;
  bankAccount: string;
}

const CreateInvoice = () => {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [inventoryList, setInventoryList] = useState<Inventory[]>([]);
  const [form, setForm] = useState<InvoiceForm>({
    customerId: "",
    inventoryId: "",
    invoiceNumber: "",
    amount: 0,
    status: "Pending",
    dueDate: "",
    items: "",
    bankAccount: "",
  });
  const [loading, setLoading] = useState(false);

  // Generate invoice number
  const generateInvoiceNumber = () => {
    const date = new Date();
    const datePart = date.toISOString().slice(2, 10).replace(/-/g, "");
    const randPart = Math.floor(Math.random() * 900 + 100);
    return `TBS-${datePart}-${randPart}`;
  };

  // Load customers
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

  // Load inventory for selected customer
  useEffect(() => {
    const loadInventory = async () => {
      if (!form.customerId) return;
      try {
        const res = await axiosInstance.get(`/api/inventory/uninvoiced?customerId=${form.customerId}`);
        setInventoryList(res.data || []);
      } catch {
        toast.error("Failed to load inventory.");
      }
    };

    loadInventory();
  }, [form.customerId]);

  // Calculate amount and item description
  useEffect(() => {
    const selected = inventoryList.find((i) => i._id === form.inventoryId);
    if (selected) {
      const pricePerKg = 1.0;
      const total = selected.weight * pricePerKg;
      setForm((prev) => ({
        ...prev,
        amount: total,
        items: `${selected.goods} (${selected.type}) – ${selected.weight} kg\nArrival: ${selected.arrivalDate}`,
      }));
    }
  }, [form.inventoryId, inventoryList]);

  // Handle input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Submit invoice
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.customerId || !form.inventoryId || !form.dueDate || !form.bankAccount) {
      toast.warning("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await axiosInstance.post("/api/invoices", {
        customerId: form.customerId,
        invoiceNumber: form.invoiceNumber,
        dueDate: form.dueDate,
        status: form.status,
        items: form.items,
        amount: Number(form.amount),
        tax: 25,
        grandTotal: Number(form.amount) * 1.25,
        inventoryIds: [form.inventoryId],
        bankInfo: {
          accountNumber: form.bankAccount,
          kidNumber: "123456789", // يمكن توليده لاحقًا أو تركه افتراضيًا
        },
      });

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
            <label>Amount (NOK)</label>
            <Input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              step="0.01"
              required
            />
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

          <FormRow>
            <label>Items / Notes</label>
            <Textarea name="items" rows={4} value={form.items} onChange={handleChange} />
          </FormRow>

          <Button type="submit" $variant="primary" $fullWidth disabled={loading}>
            {loading ? "Creating..." : "Create Invoice"}
          </Button>
        </FormSection>
      </form>
    </InvoiceContainer>
  );
};

export default CreateInvoice;
