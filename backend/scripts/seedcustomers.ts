// scripts/seedCustomers.ts
import mongoose from "mongoose";
import dotenv from "dotenv";
import Customer from "../models/customer.model";
import User from "../models/user.model"; // ✅ Add this

dotenv.config();

const seedCustomers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("✅ Connected to MongoDB");

    // ✅ Get users with role = 'customer'
    const customerUsers = await User.find({ role: "customer" });

    if (customerUsers.length < 2) {
      throw new Error("❌ You must have at least 2 users with role 'customer' in the database.");
    }

    const customers = [
      {
        userId: customerUsers[0]._id,
        companyName: "Fisk og Hav AS",
        companyEmail: "kontakt@fiskoghav.no",
        orgNumber: "987654321",
        zipCode: "5003",
        city: "Bergen",
        address: "Havnegata 12",
        contactPerson: "Kari Nordmann",
        companyPhone: "+47 400 00 000",
        customerType: "Company",
      },
      {
        userId: customerUsers[1]._id,
        companyName: "Nordlys Import",
        companyEmail: "post@nordlysimport.no",
        orgNumber: "876543210",
        zipCode: "9012",
        city: "Tromsø",
        address: "Strandveien 55",
        contactPerson: "Ola Hansen",
        companyPhone: "+47 900 11 111",
        customerType: "Company",
      },
    ];

    await Customer.deleteMany({});
    console.log("🧹 Existing customers removed");

    const inserted = await Customer.insertMany(customers);
    console.log(`✅ Inserted ${inserted.length} customers`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding customers:", error);
    process.exit(1);
  }
};

seedCustomers();
