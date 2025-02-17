import express from "express";
import checkAuth from "../../middleware/checkAuth";
import validateRequest from "../../middleware/validateRequest";
import { ScheduleSchemas } from "./schedule.validation";
import { ScheduleControllers } from "./schedule.controller";

const router = express.Router();

router.post(
  "/",
  checkAuth("admin"),
  validateRequest(ScheduleSchemas.createScheduleSchema),
  ScheduleControllers.createSchedule
);

router.get(
  "/",
  checkAuth("admin", "trainee", "trainer"),
  ScheduleControllers.getAllSchedules
);

router.get(
  "/all-schedule/available",
  checkAuth("admin", "trainee", "trainer"),
  ScheduleControllers.getAvailableSchedules
);

router.get(
  "/trainer-schedule/:trainerId",
  checkAuth("admin", "trainee", "trainer"),
  ScheduleControllers.getTrainerSchedules
);

router.get(
  "/:scheduleId",
  checkAuth("admin", "trainee", "trainer"),
  ScheduleControllers.getSingleSchedule
);

router.patch(
  "/:scheduleId",
  checkAuth("admin"),
  validateRequest(ScheduleSchemas.updateScheduleSchema),
  ScheduleControllers.updateSingleSchedule
);
router.delete(
  "/:scheduleId",
  checkAuth("admin"),
  ScheduleControllers.deleteSchedule
);

export const ScheduleRoutes = router;
