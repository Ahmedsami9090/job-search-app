import Joi from "joi";
import {
  bodyGeneralSchema,
  headersGeneralSchema,
  paramsGeneralSchema,
} from "../generalRules.js";

export const addCompanySchema = {
  body: Joi.object({
    companyName: bodyGeneralSchema.companyName.required(),
    industry: bodyGeneralSchema.industry.required(),
    companyEmail: bodyGeneralSchema.email.required(),
  }).unknown(false),
  headers: Joi.object({
    ...headersGeneralSchema,
  }).unknown(false),
};
export const updateCompanySchema = {
  body: Joi.object({
    numberOfEmployees: bodyGeneralSchema.numberOfEmployees,
    address: bodyGeneralSchema.address,
    description: bodyGeneralSchema.description,
  })
    .unknown(false)
    .or("numberOfEmployees", "address", "description"),
  params: Joi.object({
    companyId: paramsGeneralSchema._id.required(),
  }).unknown(false),
  headers: Joi.object({
    ...headersGeneralSchema,
  }).unknown(false),
};
export const softDeleteCompanySchema = {
  params: Joi.object({
    companyId: paramsGeneralSchema._id.required(),
  }).unknown(false),
  headers: Joi.object({
    ...headersGeneralSchema,
  }).unknown(false),
};
export const getCompanyAndJobsSchema = {
  params: Joi.object({
    companyId: paramsGeneralSchema._id.required(),
  }).unknown(false),
};
export const deleteCompanyLogoSchema = {
  params: Joi.object({
    companyId: paramsGeneralSchema._id.required(),
  }).unknown(false),
  headers: Joi.object({
    ...headersGeneralSchema,
  }).unknown(false),
};
export const deleteCoverPicSchema = {
  params: Joi.object({
    companyId: paramsGeneralSchema._id.required(),
  }).unknown(false),
  headers: Joi.object({
    ...headersGeneralSchema,
  }).unknown(false),
};
