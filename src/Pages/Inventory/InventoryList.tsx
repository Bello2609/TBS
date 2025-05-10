import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  PageContainer,
  PageHeader,
  AddButton,
  InventoryTable,
  TableRow,
  TableCell,
  ModalOverlay,
  ModalContainer,
  ModalTitle,
  ModalForm,
  FormRow,
  Label,
  Input,
  ModalActions,
  SaveButton,
  CancelButton,
  ActionButtons,
  IconButton,
} from "../../styles/inventoryStyles";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import ReactSelect, { SingleValue } from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Types
interface InventoryItem {
  _id?: string;
  customerId: string;
  customerName: string;
  goods: string;
  type: string;
  weight: string;
  arrivalDate: string;
  departureDate: string;
  sender: {
    name: string;
    email: string;
    phone: string;
    company: string;
  };
}

interface Customer {
  _id: string;
  companyName: string;
}

const InventoryList: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>("");
  const [selectedCustomerName, setSelectedCustomerName] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [form, setForm] = useState<InventoryItem>({
    customerId: "",
    customerName: "",
    goods: "",
    type: "",
    weight: "",
    arrivalDate: "",
    departureDate: "",
    sender: {
      name: "",
      email: "",
      phone: "",
      company: "",
    },
  });
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [customersRes, inventoryRes] = await Promise.all([
          axios.get("/api/users?role=customer"),
          axios.get("/api/inventory"),
        ]);
        setCustomers(customersRes.data);
        setInventory(inventoryRes.data);
      } catch {
        toast.error("Error loading data.");
      }
    };
    fetchData();
  }, []);

  const handleCustomerSelect = (option: SingleValue<{ value: string; label: string }>) => {
    if (option) {
      setSelectedCustomerId(option.value);
      setSelectedCustomerName(option.label);
    } else {
      setSelectedCustomerId("");
      setSelectedCustomerName("");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const field = name.split(".")[1]; // sender.name → 'name'
    setForm((prev) => ({
      ...prev,
      sender: { ...prev.sender, [field]: value },
    }));
  };

  const resetForm = () => {
    setForm({
      customerId: "",
      customerName: "",
      goods: "",
      type: "",
      weight: "",
      arrivalDate: "",
      departureDate: "",
      sender: {
        name: "",
        email: "",
        phone: "",
        company: "",
      },
    });
    setEditId(null);
  };

  const handleSave = async () => {
    if (!selectedCustomerId || !form.sender.name || !form.goods) {
      toast.error("All required fields must be filled.");
      return;
    }

    const payload = {
      ...form,
      customerId: selectedCustomerId,
      customerName: selectedCustomerName,
    };

    try {
      if (editId) {
        await axios.put(`/api/inventory/${editId}`, payload);
        toast.success("Inventory updated.");
      } else {
        await axios.post("/api/inventory", payload);
        toast.success("Inventory added.");
      }

      const updated = await axios.get("/api/inventory");
      setInventory(updated.data);
      setShowModal(false);
      resetForm();
    } catch {
      toast.error("Failed to save inventory.");
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.delete(`/api/inventory/${id}`);
        setInventory(inventory.filter((item) => item._id !== id));
        toast.success("Deleted.");
      } catch {
        toast.error("Delete failed.");
      }
    }
  };

  const handleEdit = (item: InventoryItem) => {
    setForm(item);
    setSelectedCustomerId(item.customerId);
    setSelectedCustomerName(item.customerName);
    setEditId(item._id || null);
    setShowModal(true);
  };

  const filteredInventory = inventory.filter((item) => {
    const matchCustomer = selectedCustomerId ? item.customerId === selectedCustomerId : true;
    const arrival = new Date(item.arrivalDate);
    const matchDate = (!startDate || arrival >= startDate) && (!endDate || arrival <= endDate);
    return matchCustomer && matchDate;
  });

  return (
    <PageContainer>
      <h2>Inventory</h2>
      <PageHeader>
        <ReactSelect
          options={customers.map((c) => ({ value: c._id, label: c.companyName }))}
          onChange={handleCustomerSelect}
          placeholder="Select Customer"
          isClearable
        />
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} placeholderText="Start Date" />
        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} placeholderText="End Date" />
        <AddButton onClick={() => { resetForm(); setShowModal(true); }}>
          + Add Inventory
        </AddButton>
      </PageHeader>

      <InventoryTable>
        <thead>
          <tr>
            <th>Arrival</th>
            <th>Sender</th>
            <th>Goods</th>
            <th>Type</th>
            <th>Weight</th>
            <th>Departure</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredInventory.map((item) => (
            <TableRow key={item._id}>
              <TableCell>{item.arrivalDate}</TableCell>
              <TableCell>{item.sender.name}</TableCell>
              <TableCell>{item.goods}</TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell>{item.weight}</TableCell>
              <TableCell>{item.departureDate}</TableCell>
              <TableCell>
                <ActionButtons>
                  <IconButton onClick={() => handleEdit(item)}><Pencil /></IconButton>
                  <IconButton onClick={() => handleDelete(item._id!)}><Trash2 /></IconButton>
                </ActionButtons>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </InventoryTable>

      {showModal && (
        <ModalOverlay>
          <ModalContainer>
            <ModalTitle>{editId ? "Edit Inventory" : "Add Inventory"}</ModalTitle>
            <ModalForm>
              <FormRow><Label>Sender Name</Label><Input name="sender.name" value={form.sender.name} onChange={handleSenderChange} /></FormRow>
              <FormRow><Label>Sender Email</Label><Input name="sender.email" value={form.sender.email} onChange={handleSenderChange} /></FormRow>
              <FormRow><Label>Sender Phone</Label><Input name="sender.phone" value={form.sender.phone} onChange={handleSenderChange} /></FormRow>
              <FormRow><Label>Sender Company</Label><Input name="sender.company" value={form.sender.company} onChange={handleSenderChange} /></FormRow>
              <FormRow><Label>Goods</Label><Input name="goods" value={form.goods} onChange={handleChange} /></FormRow>
              <FormRow><Label>Type</Label><Input name="type" value={form.type} onChange={handleChange} /></FormRow>
              <FormRow><Label>Weight</Label><Input name="weight" value={form.weight} onChange={handleChange} /></FormRow>
              <FormRow><Label>Arrival Date</Label><Input type="date" name="arrivalDate" value={form.arrivalDate} onChange={handleChange} /></FormRow>
              <FormRow><Label>Departure Date</Label><Input type="date" name="departureDate" value={form.departureDate} onChange={handleChange} /></FormRow>

              <ModalActions>
                <CancelButton onClick={() => setShowModal(false)}>Cancel</CancelButton>
                <SaveButton onClick={handleSave}>{editId ? "Update" : "Save"}</SaveButton>
              </ModalActions>
            </ModalForm>
          </ModalContainer>
        </ModalOverlay>
      )}
    </PageContainer>
  );
};

export default InventoryList;
