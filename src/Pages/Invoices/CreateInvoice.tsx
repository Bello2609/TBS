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
  Button,
} from "@/styles/InvoiceStyles";

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
  departureDate?: string;
  customerId: string;
  sender: {
    name: string;
  };
}

const CreateInvoice = () => {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [inventoryList, setInventoryList] = useState<Inventory[]>([]);
  const [selectedInventory, setSelectedInventory] = useState<Inventory[]>([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    customerId: "",
    inventoryIds: [] as string[],
    invoiceNumber: "",
    status: "Pending" as "Pending" | "Paid" | "Overdue",
    dueDate: "",
    bankAccount: "",
    kidNumber: "",
    unitPrice: 1.0,
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
    setForm((prev) => ({ ...prev, invoiceNumber: generateInvoiceNumber() }));
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
    const selected = inventoryList.filter((i) =>
      form.inventoryIds.includes(i._id)
    );
    setSelectedInventory(selected);
  }, [form.inventoryIds, inventoryList]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "unitPrice") {
      setForm((prev) => ({ ...prev, unitPrice: parseFloat(value) }));
    } else if (name === "inventoryIds") {
      const target = e.target as HTMLSelectElement;
      const selectedValues: string[] = [];
      for (let i = 0; i < target.options.length; i++) {
        if (target.options[i].selected) {
          selectedValues.push(target.options[i].value);
        }
      }
      setForm((prev) => ({ ...prev, inventoryIds: selectedValues }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.customerId ||
      form.inventoryIds.length === 0 ||
      !form.dueDate ||
      !form.bankAccount ||
      !form.kidNumber
    ) {
      toast.warning("Please fill in all required fields.");
      return;
    }

    if (selectedInventory.length === 0) {
      toast.error("No inventory items selected.");
      return;
    }

    setLoading(true);
    try {
      const quantity = selectedInventory.reduce(
        (sum, inv) => sum + inv.weight,
        0
      );
      const total = quantity * form.unitPrice;
      const taxRate = 0.25;
      const taxAmount = total * taxRate;
      const grandTotal = total + taxAmount;

      const items = selectedInventory.map((inv) => ({
        description: `${inv.goods} (${inv.type})`,
        quantity: inv.weight,
        unitPrice: form.unitPrice,
        total: inv.weight * form.unitPrice,
      }));

      const payload = {
        customerId: form.customerId,
        invoiceNumber: form.invoiceNumber,
        date: new Date().toISOString(),
        dueDate: form.dueDate,
        status: form.status,
        totalQuantity: quantity,
        products: selectedInventory.map((i) => i.goods).join(", "),
        unit: "kg",
        unitPrice: form.unitPrice,
        items,
        tax: taxAmount,
        grandTotal,
        inventoryIds: form.inventoryIds,
        bankInfo: {
          accountNumber: form.bankAccount,
          kidNumber: form.kidNumber,
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
            <Select
              name="customerId"
              value={form.customerId}
              onChange={handleChange}
              required
            >
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
              <label>Inventory Items</label>
              <Select
                name="inventoryIds"
                multiple
                value={form.inventoryIds}
                onChange={handleChange}
                required
                style={{ height: "120px" }}
              >
                {inventoryList.map((inv) => (
                  <option key={inv._id} value={inv._id}>
                    {inv.goods} – {inv.type} – {inv.weight} kg
                  </option>
                ))}
              </Select>
            </FormRow>
          )}

          <FormRow>
            <label>Unit Price (kr/kg)</label>
            <Input
              type="number"
              name="unitPrice"
              step="0.01"
              value={form.unitPrice}
              onChange={handleChange}
            />
          </FormRow>

          <FormRow>
            <label>Bank Account</label>
            <Input
              name="bankAccount"
              value={form.bankAccount}
              onChange={handleChange}
              required
            />
          </FormRow>

          <FormRow>
            <label>KID Number</label>
            <Input
              name="kidNumber"
              value={form.kidNumber}
              onChange={handleChange}
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
            <Input
              type="date"
              name="dueDate"
              value={form.dueDate}
              onChange={handleChange}
              required
            />
          </FormRow>

          <FormRow>
            <label>Invoice Number</label>
            <Input name="invoiceNumber" value={form.invoiceNumber} readOnly />
          </FormRow>

          {selectedInventory.length > 0 && (
            <>
              <FormRow>
                <label>Total Quantity (kg)</label>
                <Input
                  readOnly
                  value={selectedInventory
                    .reduce((sum, i) => sum + i.weight, 0)
                    .toFixed(2)}
                />
              </FormRow>

              <FormRow>
                <label>Total (excl. VAT)</label>
                <Input
                  readOnly
                  value={(
                    selectedInventory.reduce((sum, i) => sum + i.weight, 0) *
                    form.unitPrice
                  ).toFixed(2)}
                />
              </FormRow>

              <FormRow>
                <label>VAT (25%)</label>
                <Input
                  readOnly
                  value={(
                    selectedInventory.reduce((sum, i) => sum + i.weight, 0) *
                    form.unitPrice *
                    0.25
                  ).toFixed(2)}
                />
              </FormRow>

              <FormRow>
                <label>Grand Total (incl. VAT)</label>
                <Input
                  readOnly
                  value={(
                    selectedInventory.reduce((sum, i) => sum + i.weight, 0) *
                    form.unitPrice *
                    1.25
                  ).toFixed(2)}
                />
              </FormRow>
            </>
          )}

          <div style={{ width: "100%", marginTop: "20px" }}>
            <Button
              type="submit"
              $variant="primary"
              style={{ width: "100%" }}
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Invoice"}
            </Button>
          </div>
        </FormSection>
      </form>
    </InvoiceContainer>
  );
};

export default CreateInvoice;
