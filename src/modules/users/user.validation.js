import Joi from "joi";
import {
  bodyGeneralSchema,
  headersGeneralSchema,
  paramsGeneralSchema,
} from "./../generalRules.js";

export const updateUserSchema = {
  headers: Joi.object({
    ...headersGeneralSchema,
  }).unknown(false),
  body: Joi.object({
    firstName: bodyGeneralSchema.firstName,
    lastName: bodyGeneralSchema.lastName,
    DOB: bodyGeneralSchema.DOB,
    gender: bodyGeneralSchema.gender,
    mobileNumber: bodyGeneralSchema.mobileNumber,
  })
    .unknown(false)
    .or("firstName", "lastName", "DOB", "gender", "mobileNumber"),
};

export const getLoggedUser = {
  headers: Joi.object({
    ...headersGeneralSchema,
  }).unknown(false),
};

export const getUserProfileSchema = {
  params: Joi.object({
    userId: paramsGeneralSchema._id.required(),
  }).unknown(false),
};

export const updatePasswordSchema = {
  headers : Joi.object({
    ...headersGeneralSchema
  }).unknown(false),
  body : Joi.object({
    oldPassword : bodyGeneralSchema.password.required().messages({
      'any.required' : "Old password is required"
    }),
    newPassword : bodyGeneralSchema.password.required().messages({
      'any.required' : "New password is required"
    }),
  }).unknown(false)
}
export const deleteProfilePicSchema = {
  body : Joi.object({
    public_id : paramsGeneralSchema._id.required()
  }).unknown(false),
  headers : Joi.object({
    ...headersGeneralSchema
  }).unknown(false)
}
export const deleteCoverPicSchema = {
  body : Joi.object({
    public_id : paramsGeneralSchema._id.required()
  }).unknown(false),
  headers : Joi.object({
    ...headersGeneralSchema
  }).unknown(false)
}
export const softDeleteUserSchema = {
  headers : Joi.object({
    ...headersGeneralSchema
  }).unknown(false)
}
