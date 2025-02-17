import express from "express";
import checkAuth from "../../middleware/checkAuth";
import validateRequest from "../../middleware/validateRequest";
import { BookingSchemas } from "./booking.validation";
import { BookingControllers } from "./booking.controller";

const router = express.Router();

// Only Admin can delete and update a booking, Every authenticated user can create booking

router.post(
  "/",
  checkAuth("admin", "trainer", "trainee"),
  validateRequest(BookingSchemas.createBookingSchema),
  BookingControllers.createBooking
);

router.get(
  "/",
  checkAuth("admin", "trainer", "trainee"),
  BookingControllers.getAllBookings
);

router.get(
  "/:bookingId",
  checkAuth("admin", "trainer", "trainee"),
  BookingControllers.getSingleBooking
);

router.patch(
  "/:bookingId",
  checkAuth("admin"),
  validateRequest(BookingSchemas.updateBookingSchema),
  BookingControllers.updateBooking
);

router.delete(
  "/:bookingId",
  checkAuth("admin"),
  BookingControllers.deleteBooking
);

export const BookingRoutes = router;
