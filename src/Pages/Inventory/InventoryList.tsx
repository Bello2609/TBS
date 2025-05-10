// src/pages/Inventory/InventoryList.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
} from '../../styles/inventoryStyles';

import { Pencil, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
import ReactSelect, { SingleValue } from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Types
interface InventoryItem {
  _id?: string;
  customerId: string;
  customerName: string;
  senderId: string;
  senderName: string;
  goods: string;
  type: string;
  weight: string;
  arrivalDate: string;
  departureDate: string;
}

interface Customer {
  _id: string;
  companyName: string;
}

interface Sender {
  _id: string;
  name: string;
}

const InventoryList: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [senders, setSenders] = useState<Sender[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>('');
  const [selectedCustomerName, setSelectedCustomerName] = useState<string>('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [form, setForm] = useState<InventoryItem>({
    customerId: '',
    customerName: '',
    senderId: '',
    senderName: '',
    goods: '',
    type: '',
    weight: '',
    arrivalDate: '',
    departureDate: '',
  });
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [customersRes, sendersRes, inventoryRes] = await Promise.all([
          axios.get('/api/customers'),
          axios.get('/api/senders'),
          axios.get('/api/inventory'),
        ]);

        setCustomers(customersRes.data);
        setSenders(sendersRes.data);
        setInventory(inventoryRes.data);
      } catch {
        toast.error('Error fetching data.');
      }
    };
    fetchData();
  }, []);

  const handleCustomerSelect = (option: SingleValue<{ value: string; label: string }>) => {
    if (option) {
      setSelectedCustomerId(option.value);
      setSelectedCustomerName(option.label);
    } else {
      setSelectedCustomerId('');
      setSelectedCustomerName('');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({
      customerId: '',
      customerName: '',
      senderId: '',
      senderName: '',
      goods: '',
      type: '',
      weight: '',
      arrivalDate: '',
      departureDate: '',
    });
    setEditId(null);
  };

  const handleSave = async () => {
    if (!form.senderId || !selectedCustomerId) {
      toast.error('Please select customer and sender.');
      return;
    }

    const formData = {
      ...form,
      customerId: selectedCustomerId,
      customerName: selectedCustomerName,
    };

    try {
      if (editId) {
        await axios.put(`/api/inventory/${editId}`, formData);
        toast.success('Inventory updated successfully.');
      } else {
        await axios.post('/api/inventory', formData);
        toast.success('Inventory added successfully.');
      }

      const updatedInventory = await axios.get('/api/inventory');
      setInventory(updatedInventory.data);
      setShowModal(false);
      resetForm();
    } catch {
      toast.error('Error saving inventory.');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this inventory item?')) {
      try {
        await axios.delete(`/api/inventory/${id}`);
        setInventory(inventory.filter((item) => item._id !== id));
        toast.success('Inventory deleted successfully.');
      } catch {
        toast.error('Error deleting inventory.');
      }
    }
  };

  const handleEdit = (item: InventoryItem) => {
    setForm(item);
    setEditId(item._id || null);
    setSelectedCustomerId(item.customerId);
    setSelectedCustomerName(item.customerName);
    setShowModal(true);
  };

  const filteredInventory = inventory.filter((item) => {
    const matchCustomer = selectedCustomerId ? item.customerId === selectedCustomerId : true;
    const arrival = new Date(item.arrivalDate);
    const matchDate =
      (!startDate || arrival >= startDate) && (!endDate || arrival <= endDate);
    return matchCustomer && matchDate;
  });

  return (
    <PageContainer>
      <h2>Inventory Management</h2>

      <PageHeader>
        <ReactSelect
          options={customers.map((c) => ({ value: c._id, label: c.companyName }))}
          onChange={handleCustomerSelect}
          placeholder="Select Customer"
          isClearable
        />
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          placeholderText="Start Date"
          dateFormat="yyyy-MM-dd"
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          placeholderText="End Date"
          dateFormat="yyyy-MM-dd"
        />
        <AddButton onClick={() => { resetForm(); setShowModal(true); }}>
          + Add Inventory
        </AddButton>
      </PageHeader>

      <InventoryTable>
        <thead>
          <tr>
            <th>Arrival Date</th>
            <th>Sender</th>
            <th>Goods</th>
            <th>Type</th>
            <th>Weight</th>
            <th>Departure Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredInventory.map((item) => (
            <TableRow key={item._id}>
              <TableCell>{item.arrivalDate}</TableCell>
              <TableCell>{item.senderName}</TableCell>
              <TableCell>{item.goods}</TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell>{item.weight}</TableCell>
              <TableCell>{item.departureDate}</TableCell>
              <TableCell>
                <ActionButtons>
                  <IconButton onClick={() => handleEdit(item)}>
                    <Pencil />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(item._id!)}>
                    <Trash2 />
                  </IconButton>
                </ActionButtons>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </InventoryTable>

      {showModal && (
        <ModalOverlay>
          <ModalContainer>
            <ModalTitle>{editId ? 'Edit Inventory' : 'Add Inventory'}</ModalTitle>
            <ModalForm>
              <ReactSelect
                options={senders.map((s) => ({ value: s._id, label: s.name }))}
                onChange={(option: SingleValue<{ value: string; label: string }>) => {
                  if (option) {
                    setForm({ ...form, senderId: option.value, senderName: option.label });
                  }
                }}
                placeholder="Select Sender"
                value={{ value: form.senderId, label: form.senderName }}
              />
              <FormRow><Label>Goods</Label><Input name="goods" value={form.goods} onChange={handleChange} /></FormRow>
              <FormRow><Label>Type</Label><Input name="type" value={form.type} onChange={handleChange} /></FormRow>
              <FormRow><Label>Weight</Label><Input name="weight" value={form.weight} onChange={handleChange} /></FormRow>
              <FormRow><Label>Arrival Date</Label><Input type="date" name="arrivalDate" value={form.arrivalDate} onChange={handleChange} /></FormRow>
              <FormRow><Label>Departure Date</Label><Input type="date" name="departureDate" value={form.departureDate} onChange={handleChange} /></FormRow>

              <ModalActions>
                <CancelButton onClick={() => setShowModal(false)}>Cancel</CancelButton>
                <SaveButton onClick={handleSave}>{editId ? 'Update' : 'Save'}</SaveButton>
              </ModalActions>
            </ModalForm>
          </ModalContainer>
        </ModalOverlay>
      )}
    </PageContainer>
  );
};

export default InventoryList;
