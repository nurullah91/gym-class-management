import { z } from "zod";

const createScheduleSchema = z.object({
  className: z.string().max(100),
  trainerId: z.string(),
  startTime: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  endTime: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  capacity: z.number().min(1).max(10),
});

const updateScheduleSchema = z.object({
  className: z.string().optional(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  capacity: z.number().min(1).max(10).optional(),
});

export const ScheduleSchemas = {
  createScheduleSchema,
  updateScheduleSchema,
};
