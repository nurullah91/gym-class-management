import { z } from "zod";

const createScheduleSchema = z.object({
  scheduleName: z.string().max(100),
  trainerId: z.string(),
  date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  startTime: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  endTime: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  capacity: z.number().min(1).max(10),
});

const updateScheduleSchema = z.object({
  scheduleName: z.string().optional(),
  date: z.string().optional(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  capacity: z.number().min(1).max(10).optional(),
});

export const ScheduleSchemas = {
  createScheduleSchema,
  updateScheduleSchema,
};
