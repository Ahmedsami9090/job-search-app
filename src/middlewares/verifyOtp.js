import userModel from "../db/models/user.model.js";
import { asyncHandler, hashCompare } from "../utils/index.js";

export const verifyOtp = asyncHandler(async (req, res, next) => {
  const { email, otp, type } = req.body;
  const user = await userModel.findOne({email})
  const storedOtp = user.OTP.flat().find((otp) => otp.type === type);
  if (!storedOtp) {
    return next(new Error("no OTP created.", { cause: 404 }));
  }
  if (storedOtp.expiresIn <= Date.now()) {
    // delete expired otp
    await userModel.updateOne(
      { email: user.email },
      {
        $pull: { OTP: { type: type } },
      }
    );
    return next(new Error("Otp expired."));
  }
  if (!(await hashCompare(storedOtp.code, otp))) {
    return next(new Error("Invalid otp. please try again.", { cause: 401 }));
  }
  req.type = type
  req.user = user
  next()
});
