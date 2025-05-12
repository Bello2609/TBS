import { Types } from "mongoose";

export interface PopulatedCustomer {
  _id: Types.ObjectId; // بدل string
  companyName: string;
}

export interface PopulatedSender {
  _id: Types.ObjectId; // بدل string
  name: string;
}
