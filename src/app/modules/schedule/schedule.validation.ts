import { z } from "zod";

// Time validation schema
const timeStringSchema = z.string().refine(
  (time) => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/; // 00-09 10-19 20-23
    return regex.test(time);
  },
  {
    message: 'Invalid time format , expected "HH:MM" in 24 hours format',
  }
);

const createScheduleSchema = z
  .object({
    scheduleName: z.string().max(100),
    trainer: z.string(),
    date: z
      .string()
      .nonempty({ message: "Date is required" })
      .regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: "Invalid date format, should be YYYY-MM-DD",
      }),
    startTime: timeStringSchema, // HH: MM   00-23: 00-59
    endTime: timeStringSchema, // HH: MM   00-23: 00-59

    capacity: z.number().min(1).max(10),
  })
  .refine(
    (body) => {
      // Convert time to a constant date like this
      // startTime : 10:30  => 1970-01-01T10:30
      //endTime : 12:30  =>  1970-01-01T12:30

      const start = new Date(`1970-01-01T${body.startTime}:00`);
      const end = new Date(`1970-01-01T${body.endTime}:00`);

      return end > start;
    },
    {
      message: "Start time should be before End time !  ",
    }
  )
  .refine(
    (body) => {
      // Check the duration is more than 2 hours or not.
      const start = new Date(`1970-01-01T${body.startTime}:00`);
      const end = new Date(`1970-01-01T${body.endTime}:00`);
      const timeDiff = (end.getTime() - start.getTime()) / (1000 * 60 * 60); // Convert ms to hours

      return timeDiff <= 2; // Ensure duration is not more than 2 hours
    },
    {
      message: "Class duration cannot exceed 2 hours!",
    }
  );

const updateScheduleSchema = z
  .object({
    scheduleName: z.string().optional(),
    trainer: z.string().optional(),
    date: z
      .string()
      .nonempty({ message: "Date is required" })
      .regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: "Invalid date format, should be YYYY-MM-DD",
      })
      .optional(),
    startTime: timeStringSchema.optional(),
    endTime: timeStringSchema.optional(), // HH: MM   00-23: 00-59,
    capacity: z.number().min(1).max(10).optional(),
  })
  .refine(
    (body) => {
      // startTime : 10:30  => 1970-01-01T10:30
      //endTime : 12:30  =>  1970-01-01T12:30

      const start = new Date(`1970-01-01T${body.startTime}:00`);
      const end = new Date(`1970-01-01T${body.endTime}:00`);

      return end > start;
    },
    {
      message: "Start time should be before End time !  ",
    }
  )
  .refine(
    (body) => {
      // Check the duration is more than 2 hours or not.
      const start = new Date(`1970-01-01T${body.startTime}:00`);
      const end = new Date(`1970-01-01T${body.endTime}:00`);
      const timeDiff = (end.getTime() - start.getTime()) / (1000 * 60 * 60); // Convert ms to hours

      return timeDiff <= 2; // Ensure duration is not more than 2 hours
    },
    {
      message: "Class duration cannot exceed 2 hours!",
    }
  );

export const ScheduleSchemas = {
  createScheduleSchema,
  updateScheduleSchema,
};
