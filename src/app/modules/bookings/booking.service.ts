import { Booking } from "./booking.model";
import { IBooking } from "./booking.interface";
import QueryBuilder from "../../utils/QueryBuilder";
import { Schedule } from "../schedule/schedule.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { User } from "../user/user.model";

const createBookingIntoDB = async (bookingData: IBooking) => {
  const { user, schedule } = bookingData;

  // Step 1: Check if the schedule exists
  const isUserExist = await User.findById(user);
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found.");
  }

  // Step 2: Check if the schedule exists
  const isScheduleExist = await Schedule.findById(schedule);
  if (!isScheduleExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Schedule not found.");
  }

  // Step 3: Check if the schedule has available slots (max 10 trainees)
  if (isScheduleExist.totalBooked >= 10) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "There is no free slots in that Schedule."
    );
  }

  // Step 3: Prevent duplicate booking for the same schedule
  if (
    isScheduleExist.trainees.some((id) => id.toString() === user.toString())
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You have already booked this class"
    );
  }

  // Step 4: Check if the trainee is already booked for another schedule at the same time
  const overlappingBooking = await Booking.findOne({
    user,
  }).populate({
    path: "schedule",
    match: {
      date: isScheduleExist.date, // Same date
      startTime: { $lt: isScheduleExist.endTime }, // Overlapping start time
      endTime: { $gt: isScheduleExist.startTime }, // Overlapping end time
    },
  });

  if (overlappingBooking && overlappingBooking.schedule) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You have another class at this time"
    );
  }

  // Step 5: Create the booking
  const booking = await Booking.create(bookingData);

  // Step 6: Update the Schedule's trainees array and totalBooked count
  await Schedule.findByIdAndUpdate(schedule, {
    $push: { trainees: user },
    $inc: { totalBooked: 1 },
  });

  return booking;
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
