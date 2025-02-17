import { Schedule } from "./schedule.model";
import { ISchedule } from "./schedule.interface";
import QueryBuilder from "../../utils/QueryBuilder";

const createScheduleIntoDB = async (data: ISchedule) => {
  return await Schedule.create(data);
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
  getAllSchedulesFromDB,
  getSingleSchedule,
  updateScheduleIntoDB,
  deleteScheduleIntoDB,
};
