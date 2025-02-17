import { Types } from "mongoose";

export interface ISchedule {
  _id: string;
  className: string;
  trainer: Types.ObjectId;
  trainees: string[];
  startTime: Date;
  endTime: Date;
  capacity: number;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
