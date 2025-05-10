import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi";

import {
  UserContainer,
  UserTable,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableData,
  ActionButtons,
  TopBar,
  SearchInput,
  AddButton,
  FilterSelect,
  PaginationContainer,
  RowsPerPage,
  PageButtons,
  ViewButton,
  EditButton,
  DeleteButton,
} from "@/styles/userStyles";

import UserModal from "./userModal";
import UserDetailsModal from "./userDetailsModal";
import type { User } from "../types/user";
import { useAuth } from "@/context/authContext";

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const navigate = useNavigate();
  const { user } = useAuth();

  // ✅ Load users from API
  const fetchUsers = async () => {
    try {
      const res = await axios.get("/api/users");
      setUsers(res.data);
      setFilteredUsers(res.data);
    } catch (error) {
      toast.error("Failed to load users.");
      console.error(error);
    }
  };

  useEffect(() => {
    if (user?.role === "customer") {
      navigate("/");
    } else {
      fetchUsers();
    }
  }, [user]);

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filtered = users.filter((user) => {
      const matchesQuery =
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.phone.toLowerCase().includes(query);
      const matchesRole = roleFilter ? user.role === roleFilter : true;
      return matchesQuery && matchesRole;
    });

    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [searchQuery, roleFilter, users]);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/users/${id}`);
      toast.success("User deleted.");
      fetchUsers(); // Refresh list
    } catch (error) {
      toast.error("Error deleting user.");
      console.error(error);
    }
  };

  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <UserContainer>
      <TopBar>
        <h1>User Management</h1>
        {user?.role === "admin" && (
          <AddButton onClick={() => {
            setSelectedUser(null);
            setIsModalOpen(true);
          }}>
            + Add User
          </AddButton>
        )}
      </TopBar>

      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "16px" }}>
        <SearchInput
          placeholder="Search by name, email, or phone..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <FilterSelect value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="employee">Employee</option>
          <option value="customer">Customer</option>
        </FilterSelect>
      </div>

      {paginatedUsers.length > 0 ? (
        <>
          <UserTable>
            <TableHead>
              <TableRow>
                <TableHeader>ID</TableHeader>
                <TableHeader>Name</TableHeader>
                <TableHeader>Email</TableHeader>
                <TableHeader>Phone</TableHeader>
                <TableHeader>Role</TableHeader>
                <TableHeader>Actions</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableData>{user.id}</TableData>
                  <TableData>{user.name}</TableData>
                  <TableData>{user.email}</TableData>
                  <TableData>{user.phone}</TableData>
                  <TableData>{user.role}</TableData>
                  <TableData>
                    <ActionButtons>
                      <ViewButton onClick={() => {
                        setSelectedUser(user);
                        setShowUserDetails(true);
                      }}>
                        <FiEye />
                      </ViewButton>
                      <EditButton onClick={() => {
                        setSelectedUser(user);
                        setIsModalOpen(true);
                      }}>
                        <FiEdit />
                      </EditButton>
                      <DeleteButton onClick={() => handleDelete(user.id)}>
                        <FiTrash2 />
                      </DeleteButton>
                    </ActionButtons>
                  </TableData>
                </TableRow>
              ))}
            </TableBody>
          </UserTable>

          <PaginationContainer>
            <RowsPerPage value={rowsPerPage} onChange={(e) => setRowsPerPage(Number(e.target.value))}>
              {[5, 10, 15, 20].map((size) => (
                <option key={size} value={size}>{size}</option>
              ))}
            </RowsPerPage>
            <PageButtons>
              <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>Previous</button>
              <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>Next</button>
            </PageButtons>
          </PaginationContainer>
        </>
      ) : (
        <p>No users found.</p>
      )}

      {isModalOpen && (
        <UserModal
          mode={selectedUser ? "edit" : "create"}
          userToEdit={selectedUser ?? undefined}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedUser(null);
          }}
          onUserSaved={fetchUsers}
        />
      )}

      {showUserDetails && selectedUser && (
        <UserDetailsModal
          user={selectedUser}
          onClose={() => {
            setShowUserDetails(false);
            setSelectedUser(null);
          }}
        />
      )}
    </UserContainer>
  );
};

export default UserManagement;
