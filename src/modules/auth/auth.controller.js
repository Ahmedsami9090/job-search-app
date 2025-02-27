import { Router } from "express";
import { validateInput, 
  authenticateUser, 
  googleAuth, 
  verifyOtp } from "../../middlewares/index.js";
import * as SCHEMA from "./auth.validation.js";
import * as AUTH from "./auth.service.js";

const authRouter = Router();

authRouter.post(
  "/signup",
  validateInput(SCHEMA.signupSchema, ["body"]),
  AUTH.signup
);
authRouter.post(
  "/confirm",
  validateInput(SCHEMA.confirmEmailSchema, [ "body"]),
  verifyOtp,
  AUTH.confirmEmail
);
authRouter.post(
  "/login",
  validateInput(SCHEMA.signinSchema, ["body"]),
  AUTH.signin
);
authRouter.post(
  "/otp-renew",
  validateInput(SCHEMA.renewOtpSchema, ["headers"]),
  authenticateUser,
  AUTH.renewOtp
);
authRouter.post(
    "/google-signup",
    validateInput(SCHEMA.googleSignupSchema, ['headers']),
    googleAuth,
    AUTH.googleSignup
)
authRouter.post(
    "/google-login",
    validateInput(SCHEMA.googleLoginSchema, ['headers']),
    googleAuth,
    AUTH.googleLogin
)
authRouter.post(
  '/password-forgot',
  validateInput(SCHEMA.forgotPasswordSchema, ['body']),
  AUTH.forgotPassword
)
authRouter.put(
  '/password-reset',
  validateInput(SCHEMA.resetPasswordSchema, ['body']),
  verifyOtp,
  AUTH.resetPassword
)
authRouter.post(
  '/refresh-token',
  validateInput(SCHEMA.refreshAccessTokenSchema, ['headers']),
  authenticateUser,
  AUTH.refreshAccessToken
)

export default authRouter;
