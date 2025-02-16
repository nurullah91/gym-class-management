import { Router } from "express";

const router = Router();

const allRoutes = [
  {
    path: "/auth",
    route: UserRoutes,
  },
];

allRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
