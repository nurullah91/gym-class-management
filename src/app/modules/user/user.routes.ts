import express from "express";
import { UserControllers } from "./user.controller";
import { UserValidation } from "./user.validation";
import validateRequest from "../../middleware/validateRequest";

const router = express.Router();
// TODO
// authentication for protected route

router.post(
  "/signup",
  validateRequest(UserValidation.userValidationSchema),
  UserControllers.createUser
);
router.post("/login", UserControllers.loginUser);
router.patch(
  "/update-user/:userId",
  validateRequest(UserValidation.updateUserValidationSchema),
  UserControllers.updateUser
);
router.delete("/users/:userId", UserControllers.deleteUser);

export const UserRoutes = router;
