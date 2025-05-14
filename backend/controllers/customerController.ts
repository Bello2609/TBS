import { Request, Response } from "express";
import Customer from "../models/customer.model.js";
import User from "../models/user.model.js";
import { Notify } from "../utils/Notification.js";
import GetLoggedInUser from "../utils/GetLoggedInUser.js";


// ✅ GET /api/customers - List all customers with user info
export const getAllCustomers = async (req: Request, res: Response): Promise<void> => {

  try {
    const customers = await Customer.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      { $match: { "user.role": "customer" } },
      {
        $project: {
          _id: 1,
          userId: 1,
          companyName: 1,
          companyEmail: 1,
          orgNumber: 1,
          zipCode: 1,
          city: 1,
          address: 1,
          contactPerson: 1,
          companyPhone: 1,
          customerType: 1,
          createdAt: 1,
        },
      },
      { $sort: { createdAt: -1 } },
    ]);

    if (!customers.length) {
      res.status(404).json({ message: "No customers found." });
      return;
    }

    res.status(200).json(customers);
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({ message: "Failed to retrieve customers." });
  }
};

// ✅ GET /api/customers/:id - Get customer by ID
export const getCustomerById = async (req: Request, res: Response): Promise<void> => {
  try {
    const customer = await Customer.findById(req.params.id).populate({
      path: "userId",
      select: "name email role",
    });

    if (!customer) {
      res.status(404).json({ message: "Customer not found." });
      return;
    }

    res.status(200).json(customer);
  } catch (error) {
    console.error("Error fetching customer:", error);
    res.status(500).json({ message: "Failed to fetch customer." });
  }
};

// ✅ POST /api/customers - Create a new customer
export const createCustomer = async (req: Request, res: Response): Promise<void> => {

  try {
    const {
      userId,
      companyName,
      companyEmail,
      orgNumber,
      zipCode,
      city,
      address,
      contactPerson,
      companyPhone,
      customerType,
    } = req.body;

    if (
      !userId || !companyName || !orgNumber || !zipCode || !city ||
      !address || !contactPerson || !companyPhone || !customerType
    ) {
      res.status(400).json({ message: "Missing required customer fields." });
      return;
    }

    const user = await User.findById(userId);
    if (!user || user.role !== "customer") {
      res.status(400).json({ message: "Invalid user or role must be 'customer'." });
      return;
    }

    const exists = await Customer.findOne({ userId });
    if (exists) {
      res.status(400).json({ message: "Customer already exists for this user." });
      return;
    }

    const newCustomer = new Customer({
      userId,
      companyName: companyName.trim(),
      companyEmail: companyEmail?.trim() || undefined,
      orgNumber: orgNumber.trim(),
      zipCode: zipCode.trim(),
      city: city.trim(),
      address: address.trim(),
      contactPerson: contactPerson.trim(),
      companyPhone: companyPhone.trim(),
      customerType,
    });

    const saved = await newCustomer.save();
    let authHeader = req.headers.authorization;
    if (!authHeader){
      res.status(401).json({ message: 'No authorization header provided' });
      return 
    }
    let token = GetLoggedInUser(authHeader);
    const data_for_notification = { 
      userId: token,
      action: "Customer created",
      message: `A new customer has been  created`
     }
    await Notify(data_for_notification);
    res.status(201).json(saved);
  } catch (error) {
    console.error("Error creating customer:", error);
    res.status(500).json({ message: "Failed to create customer." });
  }
};

// ✅ PUT /api/customers/:id - Update customer
export const updateCustomer = async (req: Request, res: Response): Promise<void> => {
  try {
    const updated = await Customer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      res.status(404).json({ message: "Customer not found." });
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
      action: "Customer Updated",
      message: "A customer was updated",
     }
    await Notify(data_for_notification);

    res.status(200).json(updated);
  } catch (error) {
    console.error("Error updating customer:", error);
    res.status(500).json({ message: "Failed to update customer." });
  }
};

// ✅ DELETE /api/customers/:id - Delete customer
export const deleteCustomer = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await Customer.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404).json({ message: "Customer not found." });
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
      action: "Customer Updated",
      message: "A customer was deleted",
     }
    await Notify(data_for_notification);
    res.status(200).json({ message: "Customer deleted successfully." });
  } catch (error) {
    console.error("Error deleting customer:", error);
    res.status(500).json({ message: "Failed to delete customer." });
  }
};
