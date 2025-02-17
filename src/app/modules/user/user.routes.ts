import express from "express";
import { UserControllers } from "./user.controller";
import { UserValidation } from "./user.validation";
import validateRequest from "../../middleware/validateRequest";
import checkAuth from "../../middleware/checkAuth";

const router = express.Router();

router.get("/users", checkAuth("admin"), UserControllers.getAllUser);
router.get("/users/:userId", UserControllers.getSingleUser);
router.post(
  "/signup",
  validateRequest(UserValidation.userValidationSchema),
  UserControllers.createUser
);
router.post("/login", UserControllers.loginUser);
router.patch(
  "/update-user/:userId",
  checkAuth("admin", "trainee", "trainer"),
  validateRequest(UserValidation.updateUserValidationSchema),
  UserControllers.updateUser
);

router.delete("/users/:userId", checkAuth("admin"), UserControllers.deleteUser);

export const UserRoutes = router;
