/* eslint-disable no-unused-vars */
import { Model } from "mongoose";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  profilePhoto: string;
  coverPhoto: string;
  enrolledPlan: "basic" | "premium";
  role: "admin" | "trainee" | "trainer";
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserModel extends Model<IUser> {
  // check use exist or not
  isUserExistsByEmail(email: string): Promise<IUser>;

  // check password match or not
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
}

export type TUserLogin = {
  email: string;
  password: string;
};

export const USER_ROLE = {
  admin: "admin",
  trainer: "trainer",
  trainee: "trainee",
} as const;

export type TUserRole = keyof typeof USER_ROLE;
