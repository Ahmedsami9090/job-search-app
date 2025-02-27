import Joi from "joi";
import {
  bodyGeneralSchema,
  headersGeneralSchema,
  paramsGeneralSchema,
} from "../generalRules.js";

export const addNewJobSchema = {
  headers: Joi.object({
    ...headersGeneralSchema,
  }).unknown(false),
  body: Joi.object({
    jobTitle: bodyGeneralSchema.jobTitle.required(),
    jobLocation: bodyGeneralSchema.jobLocation.required(),
    workingTime: bodyGeneralSchema.workingTime.required(),
    seniorityLevel: bodyGeneralSchema.seniorityLevel.required(),
    jobDescription: bodyGeneralSchema.jobDescription.required(),
    technicalSkill: bodyGeneralSchema.technicalSkill,
    softSkill: bodyGeneralSchema.softSkill,
  }).unknown(false),
  params: Joi.object({
    companyId: paramsGeneralSchema._id.required(),
  }).unknown(false),
};

export const updateJobSchema = {
  params: Joi.object({
    jobId: paramsGeneralSchema._id.required(),
  }).unknown(false),
  headers: Joi.object({
    ...headersGeneralSchema,
  }).unknown(false),
};

export const deleteJobSchema = {
  params: Joi.object({
    jobId: paramsGeneralSchema._id.required(),
  }).unknown(false),
  headers: Joi.object({
    ...headersGeneralSchema,
  }).unknown(false),
};

export const getFilteredJobsSchema = {
  body: Joi.object({
    jobTitle: Joi.string(),
    jobLocation: Joi.string(),
    seniorityLevel: Joi.string(),
    workingTime: Joi.string(),
    technicalSkill: Joi.string(),
  })
    .or(
      "jobTitle",
      "jobLocation",
      "seniorityLevel",
      "workingTime",
      "technicalSkill"
    )
    .allow({}),
};

export const applyForJobSchema = {
  params: Joi.object({
    jobId: paramsGeneralSchema._id.required(),
  }).unknown(false),
  headers: Joi.object({
    ...headersGeneralSchema,
  }).unknown(false),
};

export const getAllApplicationsSchema = {
  headers: Joi.object({
    ...headersGeneralSchema,
  }).unknown(false),
};

export const changeApplicationStatus = {
  body : Joi.object({
    status : bodyGeneralSchema.status.required(),
  }).unknown(false),
  params : Joi.object({
    applicationId : paramsGeneralSchema._id
  }).unknown(false),
  headers : Joi.object({
    ...headersGeneralSchema
  }).unknown(false)
}
