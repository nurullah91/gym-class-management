import { Schedule } from "./schedule.model";
import { ISchedule } from "./schedule.interface";
import QueryBuilder from "../../utils/QueryBuilder";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { User } from "../user/user.model";

const createScheduleIntoDB = async (data: ISchedule) => {
  const { date, startTime, endTime, trainer } = data;

  // 1. Check total schedules for the day
  const existingSchedulesCount = await Schedule.countDocuments({ date });
  if (existingSchedulesCount >= 5) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Daily limit of schedule is over. You cannot create more than 5 schedules per day"
    );
  }

  // 2. Ensure the trainer exists
  const trainerExists = await User.findById(trainer);
  if (!trainerExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Assigned trainer not found.");
  }

  // 4. Check if the trainer is free at the given date and time
  const isTrainerBusy = await Schedule.exists({
    trainer,
    date,
    $or: [
      { startTime: { $lt: endTime }, endTime: { $gt: startTime } }, // Overlapping schedules
    ],
  });

  if (isTrainerBusy) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Trainer is already assigned to another class at this time."
    );
  }

  // 5. Create the schedule
  const result = await Schedule.create(data);

  return result;
};

const getAllSchedulesFromDB = async (query: Record<string, unknown>) => {
  const scheduleQuery = new QueryBuilder(
    Schedule.find().populate("trainer").populate("trainees"),
    query
  )
    .search(["scheduleName"])
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await scheduleQuery.countTotal();
  const result = await scheduleQuery.modelQuery;
  return {
    meta,
    result,
  };
};

// Get specific trainer's schedule
const getTrainersSchedulesFromDB = async (
  query: Record<string, unknown>,
  trainerId: string
) => {
  const scheduleQuery = new QueryBuilder(
    Schedule.find({ trainer: trainerId })
      .populate("trainer")
      .populate("trainees"),
    query
  )
    .search(["scheduleName"])
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await scheduleQuery.countTotal();
  const result = await scheduleQuery.modelQuery;
  return {
    meta,
    result,
  };
};

const getAvailableSchedulesFromDB = async (query: Record<string, unknown>) => {
  // Get only that schedule which booking is less than 10
  const scheduleQuery = new QueryBuilder(
    Schedule.find({ totalBooked: { $lt: 10 } })
      .populate("trainer")
      .populate("trainees"),
    query
  )
    .search(["scheduleName"])
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await scheduleQuery.countTotal();
  const result = await scheduleQuery.modelQuery;
  return {
    meta,
    result,
  };
};

const getSingleSchedule = async (id: string) => {
  return await Schedule.findById(id).populate("trainer trainees");
};

const updateScheduleIntoDB = async (id: string, data: Partial<ISchedule>) => {
  return await Schedule.findByIdAndUpdate(id, data, { new: true });
};

const deleteScheduleIntoDB = async (scheduleId: string) => {
  const result = Schedule.findByIdAndUpdate(
    scheduleId,
    {
      isDeleted: true,
    },
    {
      new: true,
    }
  );

  return result;
};
export const ScheduleServices = {
  createScheduleIntoDB,
  getAvailableSchedulesFromDB,
  getTrainersSchedulesFromDB,
  getAllSchedulesFromDB,
  getSingleSchedule,
  updateScheduleIntoDB,
  deleteScheduleIntoDB,
};
