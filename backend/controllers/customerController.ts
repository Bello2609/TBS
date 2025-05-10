// backend/controllers/customerController.ts

import { Request, Response } from "express";
import Customer from "../models/customer.model.js";

// GET /api/customers - Get all customers
export const getAllCustomers = async (req: Request, res: Response): Promise<void> => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });
    res.status(200).json(customers);
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({ message: "Failed to retrieve customers." });
  }
};

// GET /api/customers/:id - Get customer by ID
export const getCustomerById = async (req: Request, res: Response): Promise<void> => {
  try {
    const customer = await Customer.findById(req.params.id);
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

// POST /api/customers - Create new customer
export const createCustomer = async (req: Request, res: Response): Promise<void> => {
  try {
    const newCustomer = new Customer(req.body);
    const saved = await newCustomer.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("Error creating customer:", error);
    res.status(500).json({ message: "Failed to create customer." });
  }
};

// PUT /api/customers/:id - Update existing customer
export const updateCustomer = async (req: Request, res: Response): Promise<void> => {
  try {
    const updated = await Customer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updated) {
      res.status(404).json({ message: "Customer not found." });
      return;
    }

    res.status(200).json(updated);
  } catch (error) {
    console.error("Error updating customer:", error);
    res.status(500).json({ message: "Failed to update customer." });
  }
};

// DELETE /api/customers/:id - Remove a customer
export const deleteCustomer = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await Customer.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404).json({ message: "Customer not found." });
      return;
    }
    res.status(200).json({ message: "Customer deleted successfully." });
  } catch (error) {
    console.error("Error deleting customer:", error);
    res.status(500).json({ message: "Failed to delete customer." });
  }
};
