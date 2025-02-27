import { OtpTypeEnum, providerEnum } from "../../db/enums.js";
import userModel from "../../db/models/user.model.js";
import {
  asyncHandler,
  createToken,
  eventEmitter,
  hashCompare,
  hashData,
} from "../../utils/index.js";

//===============================SIGNUP===============================
export const signup = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password, gender, DOB, mobileNumber } =
    req.body;
  // Check if email already registered.
  let user = await userModel.findOne({ email });
  if (user) {
    return next(new Error("Email already registered", { cause: 401 }));
  }
  user = await userModel.create({
    firstName,
    lastName,
    email,
    gender,
    DOB,
    mobileNumber,
    password,
  });
  res.status(201).json({ message: "success" });
});
//===============================SIGN-IN================================
export const signin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({
    email,
    deletedAt : { $exists: false },
  });
  if (!user || !(await hashCompare(user.password, password))) {
    return next(new Error("Incorrect email or password", {cause : 404}));
  }
  if (user.provider === providerEnum.google) {
    return next(new Error("please login with google", { cause: 409 }));
  }
  const accessToken = await createToken(user._id, user.email, user.role, "1h");
  const refreshToken = await createToken(user._id, user.email, user.role, "7d");
  res.status(200).json({ message: "success", accessToken, refreshToken });
});
//=============================CONFIRM-EMAIL===========================
export const confirmEmail = asyncHandler(async (req, res, next) => {
  if (req.type !== OtpTypeEnum.confirmEmail) {
    return next(new Error("Invalid OTP type"));
  }
  await userModel.updateOne(
    { email: req.user.email },
    {
      isConfirmed: true,
      $pull: { OTP: { type: req.type } },
    }
  );
  res.status(200).json({ message: "confirmed" });
});
//=============================RENEW-OTP===============================
export const renewOtp = asyncHandler(async (req, res, next) => {
  const storedOtp = req.user.OTP.flat().find(
    (otp) => otp.type === "confirm Email"
  );
  if (req.user.isConfirmed || req.user.provider === providerEnum.google) {
    return next(new Error("User confirmed", { cause: 409 }));
  }
  if (storedOtp) {
    return next(new Error("OTP already sent", { cause: 409 }));
  }
  eventEmitter.emit("sendOtp", req.user.email, 10, OtpTypeEnum.confirmEmail);
  res.status(201).json({ message: "success" });
});
//=======================GOOGLE-SIGNUP=================================
export const googleSignup = asyncHandler(async (req, res, next) => {
  const { email, isVerified, firstName, lastName, gender } = req.data;
  await userModel.create({
    firstName,
    lastName,
    email,
    isConfirmed: isVerified,
    provider: providerEnum.google,
    gender,
  });
  res.status(201).json({ message: "success" });
});
//=======================GOOGLE-LOGIN==================================
export const googleLogin = asyncHandler(async (req, res, next) => {
  const { email } = req.data;
  const user = await userModel.findOne({ email });
  if (!user || user.deletedAt) {
    return next(new Error("please signup first"));
  }
  const accessToken = await createToken(user._id, user.email, user.role, "1h");
  const refreshToken = await createToken(user._id, user.email, user.role, "7d");
  res.status(200).json({ message: "success", accessToken, refreshToken });
});
//=======================FORGOT-PASSWORD===============================
export const forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  const user = await userModel.findOne({
    email,
    provider: providerEnum.system,
    deletedAt : { $exists: false },
  });
  if (!user) {
    return next(new Error("Email not found"));
  }
  eventEmitter.emit("sendOtp", user.email, 10, OtpTypeEnum.forgetPassword);
  res.status(200).json({ message: "success" });
});
//=======================RESET-PASSWORD================================
export const resetPassword = asyncHandler(async (req, res, next) => {
  const { newPassword } = req.body;
  await userModel.updateOne(
    { email: req.user.email },
    {
      changeCredentialTime: Date.now(),
      password: await hashData(newPassword),
      $pull: { OTP: { type: req.type } },
    }
  );
  res.status(200).json({ message: "password updated" });
});
//=======================REFRESH-TOKEN=================================
export const refreshAccessToken = asyncHandler(async (req, res, next) => {
  const { _id, email, role } = req.user;
  const accessToken = await createToken(_id, email, role, "1h");
  res.status(201).json({ message: "success", accessToken });
});
