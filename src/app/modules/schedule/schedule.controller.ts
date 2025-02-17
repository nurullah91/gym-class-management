import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

import httpStatus from "http-status";
import { ScheduleServices } from "./schedule.service";

const createSchedule = catchAsync(async (req, res) => {
  const result = await ScheduleServices.createScheduleIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Schedule created successfully",
    data: result,
  });
});

const getAllSchedules = catchAsync(async (req, res) => {
  const result = await ScheduleServices.getAllSchedulesFromDB();

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "All schedules are retrieved successfully",
    data: result,
  });
});

const getSingleSchedule = catchAsync(async (req, res) => {
  const { scheduleId } = req.params;
  const result = await ScheduleServices.getSingleSchedule(scheduleId);

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "Schedule retrieved successfully",
    data: result,
  });
});

const updateSingleSchedule = catchAsync(async (req, res) => {
  const { scheduleId } = req.params;
  const result = await ScheduleServices.updateScheduleIntoDB(
    scheduleId,
    req.body
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Schedule updated successfully",
    data: result,
  });
});
const deleteSchedule = catchAsync(async (req, res) => {
  const { scheduleId } = req.params;
  const result = await ScheduleServices.deleteScheduleIntoDB(scheduleId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Schedule deleted successfully",
    data: result,
  });
});

export const ScheduleControllers = {
  createSchedule,
  getAllSchedules,
  getSingleSchedule,
  updateSingleSchedule,
  deleteSchedule,
};
