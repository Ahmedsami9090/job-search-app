import Joi from "joi";
import { genderEnum } from "../../db/enums.js";
import { bodyGeneralSchema, headersGeneralSchema } from "../generalRules.js";

export const signupSchema = {
  body: Joi.object({
    firstName: bodyGeneralSchema.firstName.required(),
    lastName: bodyGeneralSchema.lastName.required(),
    email: bodyGeneralSchema.email.required(),
    gender: bodyGeneralSchema.gender.required(),
    DOB: bodyGeneralSchema.DOB.required(),
    mobileNumber: bodyGeneralSchema.mobileNumber.required(),
    password: bodyGeneralSchema.password.required(),
    cPassword: Joi.string().valid(Joi.ref("password")).required().messages({
      "any.only": "Confirm password must match the password",
      "any.required": "Confirm password is required",
    }),
  }).unknown(false),
};

export const signinSchema = {
  body: Joi.object({
    email: bodyGeneralSchema.email.required(),
    password: bodyGeneralSchema.password.required(),
  }).unknown(false),
};

export const confirmEmailSchema = {
  body: Joi.object({
    otp: bodyGeneralSchema.otp.required(),
    type: bodyGeneralSchema.type.required(),
    email: bodyGeneralSchema.email.required(),
  }).unknown(false),
};

export const renewOtpSchema = {
  headers: Joi.object({
    ...headersGeneralSchema,
  }).unknown(false),
};

export const googleSignupSchema = {
  headers: Joi.object({
    ...headersGeneralSchema,
  }).unknown(false),
};
export const googleLoginSchema = {
  headers: Joi.object({
    ...headersGeneralSchema,
  }).unknown(false),
};
export const forgotPasswordSchema = {
  body: Joi.object({
    email: bodyGeneralSchema.email.required(),
  }).unknown(false),
};
export const resetPasswordSchema = {
  body: Joi.object({
    otp: bodyGeneralSchema.otp.required(),
    type: bodyGeneralSchema.type.required(),
    email: bodyGeneralSchema.email.required(),
    newPassword: bodyGeneralSchema.password.required(),
  }),
};
export const refreshAccessTokenSchema = {
  headers: Joi.object({
    ...headersGeneralSchema,
  }).unknown(false),
};
