import { Types } from "mongoose";

export interface IBooking {
  _id: string;
  user: Types.ObjectId;
  schedule: Types.ObjectId;
  phone: string;
  paymentStatus: "paid" | "pending";
  status: "pending" | "confirmed" | "cancelled";
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
