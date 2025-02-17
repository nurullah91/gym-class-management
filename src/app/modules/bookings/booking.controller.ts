import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { BookingServices } from "./booking.service";

const createBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.createBookingIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Booking created successfully",
    data: result,
  });
});

const getAllBookings = catchAsync(async (req, res) => {
  const result = await BookingServices.getAllBookingsFromDB();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All bookings are retrieved successfully",
    data: result,
  });
});

const getSingleBooking = catchAsync(async (req, res) => {
  const { bookingId } = req.params;
  const result = await BookingServices.getSingleBookingFromDB(bookingId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Booking is retrieved successfully",
    data: result,
  });
});

const updateBooking = catchAsync(async (req, res) => {
  const { bookingId } = req.params;
  const result = await BookingServices.updateBookingIntoDB(bookingId, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Booking updated successfully",
    data: result,
  });
});

const deleteBooking = catchAsync(async (req, res) => {
  const { bookingId } = req.params;
  const result = await BookingServices.deleteBookingIntoDB(bookingId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Booking deleted successfully",
    data: result,
  });
});

export const BookingControllers = {
  createBooking,
  getAllBookings,
  getSingleBooking,
  updateBooking,
  deleteBooking,
};
