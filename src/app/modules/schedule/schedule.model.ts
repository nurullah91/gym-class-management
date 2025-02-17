import mongoose, { Schema } from "mongoose";
import { ISchedule } from "./schedule.interface";

const scheduleSchema = new Schema<ISchedule>(
  {
    scheduleName: { type: String, required: true, maxlength: 100 },
    trainer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    trainees: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
    totalBooked: { type: Number, min: 0, max: 10, default: 0 },
    date: { type: Date, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    capacity: { type: Number, required: true, min: 1, max: 10 },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Schedule = mongoose.model<ISchedule>("Schedule", scheduleSchema);
