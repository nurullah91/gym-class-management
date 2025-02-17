import { Booking } from "./booking.model";
import { IBooking } from "./booking.interface";

const createBookingIntoDB = async (data: IBooking) => {
  return await Booking.create(data);
};

const getAllBookingsFromDB = async () => {
  return await Booking.find().populate("user schedule");
};

const getSingleBookingFromDB = async (id: string) => {
  return await Booking.findById(id).populate("user schedule");
};

const updateBookingIntoDB = async (id: string, data: Partial<IBooking>) => {
  return await Booking.findByIdAndUpdate(id, data, { new: true });
};

// Soft delete from db instead of delete document to avoid data inconsistency
const deleteBookingIntoDB = async (id: string) => {
  const result = Booking.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    {
      new: true,
    }
  );

  return result;
};

export const BookingServices = {
  createBookingIntoDB,
  getAllBookingsFromDB,
  getSingleBookingFromDB,
  updateBookingIntoDB,
  deleteBookingIntoDB,
};
