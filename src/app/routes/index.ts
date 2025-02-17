import { Router } from "express";
import { UserRoutes } from "../modules/user/user.routes";
import { ScheduleRoutes } from "../modules/schedule/schedule.routes";
import { BookingRoutes } from "../modules/bookings/booking.routes";

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
  {
    path: "/bookings",
    route: BookingRoutes,
  },
];

allRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
