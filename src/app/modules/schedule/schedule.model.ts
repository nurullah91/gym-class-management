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

// Enforce business rule: Max 5 schedules per day per trainer
scheduleSchema.pre("validate", async function (next) {
  const startOfDay = new Date(this.startTime);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(this.startTime);
  endOfDay.setHours(23, 59, 59, 999);

  const scheduleCount = await Schedule.countDocuments({
    trainerId: this.trainer,
    startTime: { $gte: startOfDay, $lte: endOfDay },
  });

  if (scheduleCount >= 5) {
    return next(
      new Error("Trainer cannot have more than 5 schedules per day.")
    );
  }
  next();
});

export const Schedule = mongoose.model<ISchedule>("Schedule", scheduleSchema);
