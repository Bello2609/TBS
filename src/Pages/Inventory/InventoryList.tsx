// src/pages/Inventory/InventoryList.tsx

import React, { useState, useEffect } from 'react';
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
} from '../../styles/InventoryStyles';

import { fakeCustomers, Customer } from "../data/fakeCustomers"; // Import Customer
import { fetchSenders, Sender } from '../../api/fetchSenders';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
import ReactSelect, { SingleValue } from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Inventory item type
interface InventoryItem {
  customerId: string;
  customerName: string;
  senderId: string;
  senderName: string;
  num: string;
  phone: string;
  address: string;
  goods: string;
  type: string;
  weight: string;
  arrivalDate: string;
  departureDate: string;
}

const InventoryList: React.FC = () => {
  // States
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [senders, setSenders] = useState<Sender[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>('');
  const [selectedCustomerName, setSelectedCustomerName] = useState<string>('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showSenderModal, setShowSenderModal] = useState<boolean>(false);
  const [newSenderName, setNewSenderName] = useState<string>('');
  const [form, setForm] = useState<InventoryItem>({
    customerId: '',
    customerName: '',
    senderId: '',
    senderName: '',
    num: '',
    phone: '',
    address: '',
    goods: '',
    type: '',
    weight: '',
    arrivalDate: '',
    departureDate: '',
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  // Function to fetch customers
  const fetchCustomers = async (): Promise<Customer[]> => {
    return fakeCustomers;
  };

  // Fetch customers and senders on mount
  useEffect(() => {
    const loadData = async () => {
      const customerList = await fetchCustomers();
      const senderList = await fetchSenders();
      setCustomers(customerList);
      setSenders(senderList);
    };
    loadData();
  }, []);

  // Handle customer selection
  const handleCustomerSelect = (option: SingleValue<{ value: string; label: string }>) => {
    const value = option?.value || '';
    const customer = customers.find((c) => c.id.toString() === value);
    if (customer) {
      setSelectedCustomerId(customer.id.toString());
      setSelectedCustomerName(customer.companyName);
    } else {
      setSelectedCustomerId('');
      setSelectedCustomerName('');
    }
    setPage(0);
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Reset form fields
  const resetForm = () => {
    setForm({
      customerId: '',
      customerName: '',
      senderId: '',
      senderName: '',
      num: '',
      phone: '',
      address: '',
      goods: '',
      type: '',
      weight: '',
      arrivalDate: '',
      departureDate: '',
    });
  };

  // Save inventory item (new or edited)
  const handleSave = () => {
    if (!form.senderId) {
      toast.error('Please select a sender.');
      return;
    }
    if (editIndex !== null) {
      const updatedList = [...inventory];
      updatedList[editIndex] = { ...form, customerId: selectedCustomerId, customerName: selectedCustomerName };
      setInventory(updatedList);
      toast.success('Inventory updated successfully!');
    } else {
      setInventory((prev) => [...prev, { ...form, customerId: selectedCustomerId, customerName: selectedCustomerName }]);
      toast.success('Inventory added successfully!');
    }
    setShowModal(false);
    resetForm();
    setEditIndex(null);
  };

  // Delete inventory item
  const handleDelete = (index: number) => {
    if (window.confirm('Are you sure you want to delete this inventory record?')) {
      const updatedList = [...inventory];
      updatedList.splice(index, 1);
      setInventory(updatedList);
      toast.success('Inventory deleted.');
    }
  };

  // Add a new sender
  const handleAddNewSender = () => {
    if (!newSenderName.trim()) {
      toast.error('Sender name cannot be empty.');
      return;
    }
    const newSender: Sender = {
      id: Date.now().toString(),
      name: newSenderName.trim(),
    };
    setSenders((prev) => [...prev, newSender]);
    setForm((prev) => ({
      ...prev,
      senderId: newSender.id,
      senderName: newSender.name,
    }));
    setShowSenderModal(false);
    setNewSenderName('');
    toast.success('Sender added successfully!');
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedCustomerId('');
    setSelectedCustomerName('');
    setStartDate(null);
    setEndDate(null);
    setPage(0);
  };

  // Filter and paginate inventory
  const filteredInventory = inventory
    .filter((item) => (selectedCustomerId ? item.customerId === selectedCustomerId : true))
    .filter((item) => {
      const arrival = new Date(item.arrivalDate);
      return (!startDate || arrival >= startDate) && (!endDate || arrival <= endDate);
    })
    .sort((a, b) => new Date(b.arrivalDate).getTime() - new Date(a.arrivalDate).getTime());

  const paginatedInventory = filteredInventory.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <PageContainer>
      {/* Main Title */}
      <h2 style={{ marginBottom: '1.5rem' }}>Inventory</h2>

      {/* Filters */}
      <PageHeader>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ minWidth: '250px' }}>
            <ReactSelect
              options={[
                { value: '', label: 'Select Customer' },
                ...customers.map((c) => ({ value: c.id.toString(), label: c.companyName }))
              ]}
              value={
                selectedCustomerId
                  ? { value: selectedCustomerId, label: selectedCustomerName }
                  : { value: '', label: 'Select Customer' }
              }
              onChange={handleCustomerSelect}
              isSearchable
              placeholder="Select Customer"
            />
          </div>

          {/* Date Filters */}
          <div style={{ display: 'flex', gap: '8px' }}>
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
          </div>

          {/* Reset Filters Button */}
          <AddButton type="button" style={{ backgroundColor: '#7c3aed' }} onClick={handleResetFilters}>
            Reset Filters
          </AddButton>
        </div>

        {/* Add New Inventory Button */}
        <div style={{ marginTop: '10px' }}>
          <AddButton
            onClick={() => {
              resetForm();
              setEditIndex(null);
              setShowModal(true);
            }}
            disabled={!selectedCustomerId}
          >
            + Add New Inventory
          </AddButton>
        </div>
      </PageHeader>

      {/* Selected Customer */}
      {selectedCustomerName && <h3>Inventory for: {selectedCustomerName}</h3>}

      {/* Inventory Table */}
      <InventoryTable>
        <thead>
          <tr>
            <th>Arrival Date</th>
            <th>Sender</th>
            <th>Goods</th>
            <th>Type</th>
            <th>Weight</th>
            <th>Departure Date</th>
            <th style={{ textAlign: 'center' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedInventory.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.arrivalDate}</TableCell>
              <TableCell>{item.senderName}</TableCell>
              <TableCell>{item.goods}</TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell>{item.weight}</TableCell>
              <TableCell>{item.departureDate}</TableCell>
              <TableCell style={{ textAlign: 'center' }}>
                <ActionButtons>
                  <IconButton onClick={() => setSelectedItem(item)}>
                    <Eye />
                  </IconButton>
                  <IconButton onClick={() => {
                    setForm(item);
                    setEditIndex(index);
                    setShowModal(true);
                  }}>
                    <Pencil />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(index)}>
                    <Trash2 />
                  </IconButton>
                </ActionButtons>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </InventoryTable>

      {/* Pagination */}
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          Rows per page:
          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(parseInt(e.target.value));
              setPage(0);
            }}
            style={{ marginLeft: '8px', padding: '4px' }}
          >
            {[5, 10, 25].map((size) => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>
        <div>
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
            disabled={page === 0}
            style={{ marginRight: '8px', padding: '4px 10px' }}
          >
            Previous
          </button>
          <button
            onClick={() => setPage((prev) => (prev + 1 < Math.ceil(filteredInventory.length / rowsPerPage) ? prev + 1 : prev))}
            style={{ padding: '4px 10px' }}
          >
            Next
          </button>
          <span style={{ marginLeft: '12px' }}>
            Page {page + 1} of {Math.ceil(filteredInventory.length / rowsPerPage)}
          </span>
        </div>
      </div>

      {/* Modals */}
      {/* View Inventory Modal */}
      {selectedItem && (
        <ModalOverlay>
          <ModalContainer>
            <ModalTitle>Inventory Details</ModalTitle>
            <ModalForm>
              {Object.entries(selectedItem).map(([key, value]) => (
                <FormRow key={key}>
                  <Label>{key}</Label>
                  <Input value={value} readOnly />
                </FormRow>
              ))}
              <ModalActions>
                <CancelButton onClick={() => setSelectedItem(null)}>Close</CancelButton>
              </ModalActions>
            </ModalForm>
          </ModalContainer>
        </ModalOverlay>
      )}

      {/* Create/Edit Inventory Modal */}
      {showModal && (
        <ModalOverlay>
          <ModalContainer>
            <ModalTitle>{editIndex !== null ? 'Edit Inventory' : 'Add Inventory'}</ModalTitle>
            <ModalForm>
              {/* Sender selection */}
              <FormRow>
                <Label>Sender</Label>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <div style={{ flex: '1' }}>
                    <ReactSelect
                      options={[{ value: '', label: 'Select Sender' }, ...senders.map((s) => ({ value: s.id, label: s.name }))]}
                      value={form.senderId ? { value: form.senderId, label: form.senderName } : { value: '', label: 'Select Sender' }}
                      onChange={(option) => setForm((prev) => ({
                        ...prev,
                        senderId: (option as { value: string; label: string })?.value || '',
                        senderName: senders.find((s) => s.id === (option as { value: string; label: string })?.value)?.name || '',
                      }))}
                      isSearchable
                      placeholder="Select Sender"
                    />
                  </div>
                  <AddButton type="button" onClick={() => setShowSenderModal(true)}>+ Add Sender</AddButton>
                </div>
              </FormRow>

              {/* Other Fields */}
              <FormRow><Label>Goods</Label><Input type="text" name="goods" value={form.goods} onChange={handleChange} /></FormRow>
              <FormRow><Label>Type</Label><Input type="text" name="type" value={form.type} onChange={handleChange} /></FormRow>
              <FormRow><Label>Weight</Label><Input type="text" name="weight" value={form.weight} onChange={handleChange} /></FormRow>
              <FormRow><Label>Arrival Date</Label><Input type="date" name="arrivalDate" value={form.arrivalDate} onChange={handleChange} /></FormRow>
              <FormRow><Label>Departure Date</Label><Input type="date" name="departureDate" value={form.departureDate} onChange={handleChange} /></FormRow>

              <ModalActions>
                <CancelButton onClick={() => { setShowModal(false); setEditIndex(null); }}>Cancel</CancelButton>
                <SaveButton onClick={handleSave}>{editIndex !== null ? 'Update' : 'Save'}</SaveButton>
              </ModalActions>
            </ModalForm>
          </ModalContainer>
        </ModalOverlay>
      )}

      {/* Add New Sender Modal */}
      {showSenderModal && (
        <ModalOverlay>
          <ModalContainer>
            <ModalTitle>Add New Sender</ModalTitle>
            <ModalForm>
              <FormRow>
                <Label>Sender Name</Label>
                <Input
                  type="text"
                  value={newSenderName}
                  onChange={(e) => setNewSenderName(e.target.value)}
                  placeholder="Enter new sender name"
                />
              </FormRow>
              <ModalActions>
                <CancelButton onClick={() => setShowSenderModal(false)}>Cancel</CancelButton>
                <SaveButton onClick={handleAddNewSender}>Save</SaveButton>
              </ModalActions>
            </ModalForm>
          </ModalContainer>
        </ModalOverlay>
      )}
    </PageContainer>
  );
};

export default InventoryList;
