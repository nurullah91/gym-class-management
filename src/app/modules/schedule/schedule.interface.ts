import { Types } from "mongoose";

export interface ISchedule {
  _id: string;
  scheduleName: string;
  trainer: Types.ObjectId;
  trainees: string[];
  totalBooked: number;
  date: Date;
  startTime: Date;
  endTime: Date;
  capacity: number;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
