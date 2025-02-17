import { Schedule } from "./schedule.model";
import { ISchedule } from "./schedule.interface";

const createScheduleIntoDB = async (data: ISchedule) => {
  return await Schedule.create(data);
};

const getAllSchedulesFromDB = async () => {
  return await Schedule.find().populate("trainer trainees");
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
  getAllSchedulesFromDB,
  getSingleSchedule,
  updateScheduleIntoDB,
  deleteScheduleIntoDB,
};
