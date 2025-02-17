import { z } from "zod";

const createBookingSchema = z.object({
  user: z.string(),
  schedule: z.string(),
  phone: z.string().max(16),
  paymentStatus: z.enum(["pending", "paid"]).optional(),
  status: z.enum(["pending", "confirmed", "cancelled"]).optional(),
});

const updateBookingSchema = z.object({
  status: z.enum(["pending", "confirmed", "cancelled"]).optional(),
  paymentStatus: z.enum(["pending", "paid"]).optional(),
});

export const BookingSchemas = { createBookingSchema, updateBookingSchema };
