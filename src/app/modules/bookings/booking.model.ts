import mongoose, { Schema } from "mongoose";
import { IBooking } from "./booking.interface";

const bookingSchema = new Schema<IBooking>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    schedule: { type: Schema.Types.ObjectId, ref: "Schedule", required: true },
    phone: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["paid", "pending", "cancelled"],
      default: "pending",
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Booking = mongoose.model<IBooking>("Booking", bookingSchema);
