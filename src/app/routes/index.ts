import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { ScheduleRoutes } from "../modules/schedule/schedule.route";

const router = Router();

const allRoutes = [
  {
    path: "/auth",
    route: UserRoutes,
  },
  {
    path: "/schedule",
    route: ScheduleRoutes,
  },
];

allRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
