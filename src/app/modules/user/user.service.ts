import httpStatus from "http-status";
import { IUser, TUserLogin } from "./user.interface";
import { User } from "./user.model";
import AppError from "../../errors/AppError";
import { createToken } from "./user.utils";
import config from "../../config";

const createUserIntoDB = async (payload: IUser) => {
  const userInfo = { ...payload, role: "trainee" };
  const result = User.create(userInfo);
  return result;
};

const loginUserWithEmail = async (payload: TUserLogin) => {
  // check user exist or not
  const user = await User.isUserExistsByEmail(payload.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User is not found !");
  }

  const matchPassword = await User.isPasswordMatched(
    payload?.password,
    user?.password
  );

  if (!matchPassword) {
    throw new AppError(httpStatus.FORBIDDEN, "Password wrong");
  }

  const jwtPayload = {
    email: user.email,
    phone: user.phone,
    role: user.role,
    userId: user._id,
  };
  const token = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    "1d"
  );
  // remove password before sent it to front end
  user.password = "";
  const result = {
    token: token,
    data: user,
  };
  return result;
};

const updateUserIntoDB = async (userId: string, payload: Partial<IUser>) => {
  const result = User.findByIdAndUpdate(userId, payload, {
    new: true,
  });

  return result;
};

const deleteUserIntoDB = async (userId: string) => {
  const result = User.findByIdAndUpdate(
    userId,
    {
      isDeleted: true,
    },
    {
      new: true,
    }
  );

  return result;
};
export const UserServices = {
  createUserIntoDB,
  loginUserWithEmail,
  deleteUserIntoDB,
  updateUserIntoDB,
};
