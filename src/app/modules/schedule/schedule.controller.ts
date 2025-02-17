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

// All schedule
const getAllSchedules = catchAsync(async (req, res) => {
  const result = await ScheduleServices.getAllSchedulesFromDB(req.query);

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "All schedules are retrieved successfully",
    meta: result.meta,
    data: result.meta,
  });
});

// All Available schedule
const getAvailableSchedules = catchAsync(async (req, res) => {
  const result = await ScheduleServices.getAvailableSchedulesFromDB(req.query);

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "All available schedules are retrieved successfully",
    meta: result.meta,
    data: result.result,
  });
});

// Trainer schedule
const getTrainerSchedules = catchAsync(async (req, res) => {
  const { trainerId } = req.params;
  const result = await ScheduleServices.getTrainersSchedulesFromDB(
    req.query,
    trainerId
  );

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "All schedules of the trainer are retrieved successfully",
    meta: result.meta,
    data: result.result,
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
  getTrainerSchedules,
  getAvailableSchedules,
  getSingleSchedule,
  updateSingleSchedule,
  deleteSchedule,
};
