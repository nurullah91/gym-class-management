import { Types } from "mongoose";

export interface ISchedule {
  _id: string;
  scheduleName: string;
  trainer: Types.ObjectId;
  trainees: string[];
  totalBooked: number;
  date: string;
  startTime: string;
  endTime: string;
  capacity: number;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
