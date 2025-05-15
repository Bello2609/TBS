import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.model";
import { Notify } from "../utils/Notification";
import GetLoggedInUser from "../utils/GetLoggedInUser";

// ✅ GET /api/users - Fetch all users or filter by role
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const { role } = req.query;
    const filter = role ? { role } : {};
    const users = await User.find(filter).select("-password");
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error while fetching users." });
  }
};

// ✅ GET /api/users/:id - Fetch single user
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({ message: "Server error while fetching user." });
  }
};

// ✅ POST /api/users - Create new user
export const createUser = async (req: Request, res: Response): Promise<void> => {
  const { username, email, name, role, password, phone, companyName } = req.body;

  if (!username || !email || !name || !role || !password || !phone) {
    res.status(400).json({ message: "All required user fields must be provided." });
    return;
  }

  if (role === "customer" && !companyName) {
    res.status(400).json({ message: "Company name is required for customers." });
    return;
  }

  try {
    const existing = await User.findOne({ $or: [{ username }, { email }] });
    if (existing) {
      res.status(409).json({ message: "Username or email already in use." });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      name,
      role,
      phone,
      password: hashedPassword,
      companyName: role === "customer" ? companyName : undefined,
    });

    await user.save();
    let authHeader = req.headers.authorization;
    if (!authHeader){
      res.status(401).json({ message: 'No authorization header provided' });
      return 
    }
    let token = GetLoggedInUser(authHeader);
    const data_for_notification = { 
      userId: token,
      action: "A user created",
      message: "A user has been created",
     }
    await Notify(data_for_notification);

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      name: user.name,
      role: user.role,
      phone: user.phone,
      companyName: user.companyName,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Server error while creating user." });
  }
};

// ✅ PUT /api/users/:id - Update existing user
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { username, email, name, role, phone, companyName } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    user.username = username || user.username;
    user.email = email || user.email;
    user.name = name || user.name;
    user.role = role || user.role;
    user.phone = phone || user.phone;

    if (role === "customer") {
      if (!companyName) {
        res.status(400).json({ message: "Company name is required for customer role." });
        return;
      }
      user.companyName = companyName;
    } else {
      user.companyName = undefined;
    }

    await user.save();
    let authHeader = req.headers.authorization;
    if (!authHeader){
      res.status(401).json({ message: 'No authorization header provided' });
      return 
    }
    let token = GetLoggedInUser(authHeader);
    const data_for_notification = { 
      userId: token,
      action: "User Updated",
      message: "A User was updated",
     }
    await Notify(data_for_notification);

    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      name: user.name,
      role: user.role,
      phone: user.phone,
      companyName: user.companyName,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error while updating user." });
  }
};

// ✅ DELETE /api/users/:id - Delete user
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }
    let authHeader = req.headers.authorization;
    if (!authHeader){
      res.status(401).json({ message: 'No authorization header provided' });
      return 
    }
    let token = GetLoggedInUser(authHeader);
    const data_for_notification = { 
      userId: token,
      action: "User Deleted",
      message: "A user has been deleted",
     }
    await Notify(data_for_notification);
    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Server error while deleting user." });
  }
};
