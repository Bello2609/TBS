import React, { useEffect, useState } from "react";
import axiosInstance from "@/services/axiosInstance";
import { toast } from "react-toastify";
import InventoryFilter from "./components/inventoryFilter";
import InventoryTableComponent from "./components/inventoryTable";
import InventoryModal from "./components/inventoryModal";
import {
  InventoryContainer,
  TopBar,
  AddButton,
} from "@/styles/inventoryStyles";
import { Customer, InventoryItem, OptionType, Sender } from "./types";

const InventoryList: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [senders, setSenders] = useState<Sender[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [filteredInventory, setFilteredInventory] = useState<InventoryItem[]>([]);

  const [editItem, setEditItem] = useState<InventoryItem | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<OptionType | null>(null);
  const [newSender, setNewSender] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [form, setForm] = useState<{
    customerId: string;
    goods: string;
    type: string;
    quantity: number;
    weight: number;
    arrivalDate: string;
    departureDate: string;
    senderName: string;
  }>({
    customerId: "",
    goods: "",
    type: "",
    quantity: 0,
    weight: 0,
    arrivalDate: "",
    departureDate: "",
    senderName: "",
  });

  useEffect(() => {
    fetchCustomers();
    fetchSenders();
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const res = await axiosInstance.get("/api/inventory");
      setInventory(res.data);
      setFilteredInventory(res.data);
    } catch {
      toast.error("Failed to fetch inventory.");
    }
  };

  const fetchCustomers = async () => {
    try {
      const res = await axiosInstance.get("/api/customers");
      setCustomers(res.data);
    } catch {
      toast.error("Failed to fetch customers.");
    }
  };

  const fetchSenders = async () => {
    try {
      const res = await axiosInstance.get("/api/senders");
      setSenders(res.data);
    } catch {
      toast.error("Failed to fetch senders.");
    }
  };

  const resetForm = () => {
    setForm({
      customerId: "",
      goods: "",
      type: "",
      quantity: 0,
      weight: 0,
      arrivalDate: "",
      departureDate: "",
      senderName: "",
    });
    setNewSender("");
  };

  const handleFormChange = (field: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddNew = () => {
    if (!selectedCustomer) {
      toast.error("Please select a customer before adding inventory.");
      return;
    }

    setEditItem(null);
    resetForm();
    setForm((prev) => ({ ...prev, customerId: selectedCustomer.value }));
    setModalVisible(true);
  };

  const handleEdit = (item: InventoryItem) => {
    setEditItem(item);
    setForm({
      customerId: item.customerId,
      goods: item.goods,
      type: item.type,
      quantity: item.quantity,
      weight: item.weight,
      arrivalDate: item.arrivalDate,
      departureDate: item.departureDate || "",
      senderName: item.senderName,
    });
    setModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await axiosInstance.delete(`/api/inventory/${id}`);
      toast.success("Inventory deleted.");
      fetchInventory();
    } catch {
      toast.error("Failed to delete inventory.");
    }
  };

  const handleSave = async () => {
    try {
      if (!form.customerId) {
        toast.error("Please select a customer.");
        return;
      }

      if (editItem?._id) {
        await axiosInstance.put(`/api/inventory/${editItem._id}`, form);
        toast.success("Inventory updated.");
      } else {
        await axiosInstance.post("/api/inventory", form);
        toast.success("Inventory created.");
      }

      setModalVisible(false);
      fetchInventory();
    } catch {
      toast.error("Failed to save inventory.");
    }
  };

  const handleAddSender = async () => {
    if (!newSender.trim()) {
      toast.warning("Sender name cannot be empty.");
      return;
    }

    try {
      const res = await axiosInstance.post("/api/senders", { name: newSender });
      toast.success("Sender added.");
      setSenders((prev) => [...prev, res.data]);
      setNewSender("");
    } catch {
      toast.error("Failed to add sender.");
    }
  };

  const handleFilter = (customer: OptionType | null) => {
    setSelectedCustomer(customer);

    const filtered = inventory.filter((item) =>
      customer ? item.customerId === customer.value : true
    );

    setFilteredInventory(filtered);
  };

  return (
    <InventoryContainer>
      <TopBar>
        <InventoryFilter
          customerOptions={customers.map((c) => ({
            label: c.companyName,
            value: c._id,
          }))}
          selectedCustomer={selectedCustomer}
          startDate={null}
          endDate={null}
          onCustomerChange={handleFilter}
          onStartDateChange={() => {}}
          onEndDateChange={() => {}}
        />
        <AddButton onClick={handleAddNew}>+ New Inventory</AddButton>
      </TopBar>

      <InventoryTableComponent
        inventory={filteredInventory}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {modalVisible && (
        <InventoryModal
          isEdit={!!editItem}
          form={form}
          senderOptions={senders.map((s) => ({
            label: s.name,
            value: s.name,
          }))}
          newSenderName={newSender}
          onNewSenderChange={setNewSender}
          onSenderChange={(option) =>
            handleFormChange("senderName", option?.value || "")
          }
          onAddSender={handleAddSender}
          onChange={handleFormChange}
          onClose={() => setModalVisible(false)}
          onSave={handleSave}
        />
      )}
    </InventoryContainer>
  );
};

export default InventoryList;
