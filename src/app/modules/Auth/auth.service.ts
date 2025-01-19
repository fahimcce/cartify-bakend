import * as bcrypt from "bcrypt";
import prisma from "../../../shared/prisma";
import { UserStatus } from "@prisma/client";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../config";
import { Secret } from "jsonwebtoken";
import emailSender from "./emailSender";
import ApiError from "../../errors/ApiError";

const loginUserToDb = async (payload: { email: string; password: string }) => {
  //   console.log("logging in... user...", payload);
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
    include: {
      admin: true,
      vendor: true,
      customer: true,
    },
  });
  let validUser: any = null;

  // Check which property is not null and assign it to validUser
  if (userData.admin) {
    validUser = userData.admin;
  } else if (userData.vendor) {
    validUser = userData.vendor;
  } else if (userData.customer) {
    validUser = userData.customer;
  }

  const isPasswordValid: boolean = await bcrypt.compare(
    payload.password,
    userData.password
  );

  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  const accessToken = jwtHelpers.tokenGenerator(
    {
      email: payload.email,
      role: userData.role,
      name: validUser.name,
      id: validUser.id,
      profilePhoto: validUser?.profilePhoto,
      userId: userData.id,
    },
    config.jwt_access_token as Secret,
    config.jwt_expires_in as string
  );
  const refreshToken = jwtHelpers.tokenGenerator(
    {
      email: payload.email,
      role: userData.role,
    },
    config.jwt_refresh_token as Secret,
    config.jwt_refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

const refreshTokenfromCookies = async (token: string) => {
  let decodedData;
  try {
    decodedData = jwtHelpers.verifyToken(
      token,
      config.jwt_refresh_token as Secret
    );
  } catch (err) {
    throw new Error("Invalid token,So you're not authorized");
  }

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData?.email,
      status: UserStatus.ACTIVE,
    },
  });

  const accessToken = jwtHelpers.tokenGenerator(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt_access_token as Secret,
    config.jwt_expires_in as string
  );

  return {
    accessToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

const changePassword = async (user: any, payload: any) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      status: UserStatus.ACTIVE,
    },
  });

  const isPasswordValid: boolean = await bcrypt.compare(
    payload.oldPassword,
    userData.password
  );
  if (!isPasswordValid) {
    throw new Error("Wrong password");
  }

  const hashedPassword: string = await bcrypt.hash(payload.newPassword, 12);

  await prisma.user.update({
    where: {
      email: userData.email,
    },
    data: {
      password: hashedPassword,
      needPasswordChange: false,
    },
  });

  return {
    message: "password changed !!",
  };
};

const forgetPassword = async (payload: { email: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });

  const resetToken = jwtHelpers.tokenGenerator(
    { email: userData.email, role: userData.role },
    config.reset_token as Secret,
    config.reset_expires_in as string
  );

  const resetUrl =
    config.reset_link + `?userId=${userData.id}&token=${resetToken}`;
  // console.log(resetUrl);

  await emailSender(
    userData.email,
    `
    <div>
    <p>Dear User ,</p>
    <p>Your password reset link is below :</p>
    <a href=${resetUrl}>
     <button>Reset password</button>
    
    </a>
    </div>
    `
  );

  // console.log(resetToken);
};

const resetPassword = async (
  token: string,
  payload: { id: string; password: string }
) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      id: payload.id,
      status: UserStatus.ACTIVE,
    },
  });
  // console.log(token);

  const validToken = jwtHelpers.verifyToken(
    token,
    config.reset_token as Secret
  );
  // console.log(validToken);
  if (!validToken) {
    throw new ApiError(401, "forbidden Link");
  }
  const hashedPassword: string = await bcrypt.hash(payload.password, 12);
  await prisma.user.update({
    where: {
      id: payload.id,
    },
    data: {
      password: hashedPassword,
    },
  });
};

export const AuthServices = {
  loginUserToDb,
  refreshTokenfromCookies,
  changePassword,
  forgetPassword,
  resetPassword,
};
