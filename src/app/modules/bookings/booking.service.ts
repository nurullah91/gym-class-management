import { Booking } from "./booking.model";
import { IBooking } from "./booking.interface";
import QueryBuilder from "../../utils/QueryBuilder";

const createBookingIntoDB = async (data: IBooking) => {
  return await Booking.create(data);
};

const getAllBookingsFromDB = async (query: Record<string, unknown>) => {
  const bookingQuery = new QueryBuilder(
    Booking.find().populate("user").populate("schedule"),
    query
  )
    .search(["phone"])
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await bookingQuery.countTotal();
  const result = await bookingQuery.modelQuery;
  return {
    meta,
    result,
  };
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
