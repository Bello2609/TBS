// src/pages/inventory/inventorylist.tsx

import React, { useState, useEffect } from "react";
import InventoryFilter from "./components/inventoryFilter";
import InventoryTableComponent from "./components/inventoryTable";
import InventoryModal from "./components/inventoryModal";
import { InventoryContainer, TopBar, AddButton } from "@/styles/inventoryStyles";
import axiosInstance from "@/services/axiosInstance";
import { toast } from "react-toastify";
import { InventoryItem, Customer, Sender, OptionType } from "./types";

const InventoryList: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [senders, setSenders] = useState<Sender[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);

  const [selectedCustomer, setSelectedCustomer] = useState<OptionType | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const [form, setForm] = useState<Omit<InventoryItem, "_id" | "customerId" | "customerName">>({
    goods: "",
    type: "",
    weight: "",
    arrivalDate: "",
    departureDate: "",
    senderName: "",
  });

  const [newSenderName, setNewSenderName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [customerRes, inventoryRes] = await Promise.all([
          axiosInstance.get("/api/users?role=customer"),
          axiosInstance.get("/api/inventory"),
        ]);
        setCustomers(customerRes.data);
        setInventory(inventoryRes.data);
      } catch {
        toast.error("Failed to load data.");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedCustomer) {
      axiosInstance
        .get(`/api/senders?customerId=${selectedCustomer.value}`)
        .then((res) => setSenders(res.data))
        .catch(() => toast.error("Failed to load senders."));
    }
  }, [selectedCustomer]);

  const handleAddSender = async () => {
    if (!newSenderName.trim()) return toast.error("Sender name is required");
    try {
      const res = await axiosInstance.post("/api/senders", {
        name: newSenderName,
        customerId: selectedCustomer?.value,
      });
      setSenders((prev) => [...prev, res.data]);
      setForm((prev) => ({ ...prev, senderName: res.data.name }));
      setNewSenderName("");
      toast.success("Sender added.");
    } catch {
      toast.error("Failed to add sender.");
    }
  };

  const handleSave = async () => {
    if (!selectedCustomer) return toast.error("Customer is required.");
    if (!form.senderName || !form.goods) return toast.error("Required fields are missing.");

    const payload = {
      ...form,
      customerId: selectedCustomer.value,
      customerName: selectedCustomer.label,
    };

    try {
      if (editId) {
        await axiosInstance.put(`/api/inventory/${editId}`, payload);
        toast.success("Inventory updated.");
      } else {
        await axiosInstance.post("/api/inventory", payload);
        toast.success("Inventory created.");
      }
      const updated = await axiosInstance.get("/api/inventory");
      setInventory(updated.data);
      setShowModal(false);
      resetForm();
    } catch {
      toast.error("Failed to save inventory.");
    }
  };

  const resetForm = () => {
    setForm({
      goods: "",
      type: "",
      weight: "",
      arrivalDate: "",
      departureDate: "",
      senderName: "",
    });
    setEditId(null);
    setNewSenderName("");
  };

  const handleEdit = (item: InventoryItem) => {
    setForm({
      goods: item.goods,
      type: item.type,
      weight: item.weight,
      arrivalDate: item.arrivalDate,
      departureDate: item.departureDate,
      senderName: item.senderName,
    });
    setEditId(item._id || null);
    const selected = customers.find((c) => c._id === item.customerId);
    if (selected) {
      setSelectedCustomer({ value: selected._id, label: selected.companyName });
    }
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this inventory?")) return;
    try {
      await axiosInstance.delete(`/api/inventory/${id}`);
      setInventory((prev) => prev.filter((item) => item._id !== id));
      toast.success("Deleted.");
    } catch {
      toast.error("Delete failed.");
    }
  };

  const filteredInventory = inventory.filter((item) => {
    const matchCustomer = selectedCustomer ? item.customerId === selectedCustomer.value : true;
    const arrival = new Date(item.arrivalDate);
    const matchDate =
      (!startDate || arrival >= startDate) && (!endDate || arrival <= endDate);
    return matchCustomer && matchDate;
  });

  return (
    <InventoryContainer>
      <TopBar>
        <h2>Inventory</h2>
        <AddButton
          onClick={() => {
            if (!selectedCustomer) {
              toast.error("Select a customer first.");
              return;
            }
            resetForm();
            setShowModal(true);
          }}
        >
          + New Inventory
        </AddButton>
      </TopBar>

      <InventoryFilter
        customers={customers.map((c) => ({ value: c._id, label: c.companyName }))}
        selectedCustomer={selectedCustomer}
        startDate={startDate}
        endDate={endDate}
        onCustomerChange={setSelectedCustomer}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
      />

      <InventoryTableComponent
        inventory={filteredInventory}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {showModal && (
        <InventoryModal
          isEdit={!!editId}
          form={form}
          senderOptions={senders.map((s) => ({ value: s.name, label: s.name }))}
          newSenderName={newSenderName}
          onChange={(field, value) => setForm((prev) => ({ ...prev, [field]: value }))}
          onSenderChange={(selected) =>
            setForm((prev) => ({
              ...prev,
              senderName: selected?.value || "",
            }))
          }
          onAddSender={handleAddSender}
          onNewSenderChange={setNewSenderName}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </InventoryContainer>
  );
};

export default InventoryList;
