import Joi from "joi";
import {
  applicationStatusEnum,
  genderEnum,
  industryEnum,
  jobLocEnum,
  numberOfEmployeesEnum,
  OtpTypeEnum,
  seniorityLevel,
  softSkillsEnum,
  technicalSkillsEnum,
  workTime,
} from "../db/enums.js";

export const headersGeneralSchema = {
  connection: Joi.string(),
  "accept-encoding": Joi.string(),
  accept: Joi.string(),
  "user-agent": Joi.string(),
  host: Joi.string(),
  "content-length": Joi.string(),
  "content-type": Joi.string(),
  authorization: Joi.string().required().messages({
    "any.required": "Authorization is required",
  }),
  ...(process.env.MODE === "DEV" && { "postman-token": Joi.string() }),
};

export const bodyGeneralSchema = {
  otp: Joi.string().length(4).required().messages({
    "any.length": "Invalid otp format",
    "any.required": "Otp is required",
  }),
  type: Joi.string()
    .valid(...Object.values(OtpTypeEnum))
    .messages({
      "any.required": "OTP type is required",
    }),
  email: Joi.string()
    .email({ tlds: ["com", "org"], minDomainSegments: 2 })
    .messages({
      "string.email": "Email must be a valid email address",
      "any.required": "Email is required",
    }),
  password: Joi.string()
    .min(6)
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_]).+$/)
    .messages({
      "string.min": "Password must be at least 6 characters long",
      "string.pattern.base":
        "Password must contain at least one letter, one number, and one special character",
      "any.required": "Password is required",
    }),
  firstName: Joi.string()
    .min(3)
    .max(50)
    .pattern(/^[a-zA-Z]+$/)
    .messages({
      "string.pattern.base": "First name must contain only letters",
      "string.min": "First name must be at least 3 characters long",
      "string.max": "First name cannot exceed 50 characters",
      "any.required": "First name is required",
    }),
  lastName: Joi.string()
    .min(3)
    .max(50)
    .pattern(/^[a-zA-Z]+$/)
    .messages({
      "string.pattern.base": "Last name must contain only letters",
      "string.min": "Last name must be at least 3 characters long",
      "string.max": "Last name cannot exceed 50 characters",
      "any.required": "Last name is required",
    }),
  gender: Joi.string()
    .valid(...Object.values(genderEnum))
    .messages({
      "any.only": "Gender must be one of {{#valids}}",
      "any.required": "Gender is required",
    }),
  DOB: Joi.date()
    .less("now")
    .max(new Date(new Date().setFullYear(new Date().getFullYear() - 18)))
    .messages({
      "date.less": "Date of birth must be in the past",
      "date.max": "User must be at least 18 years old",
      "any.required": "Date of birth is required",
    }),
  mobileNumber: Joi.string()
    .pattern(/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}/)
    .messages({
      "string.pattern.base": "Only Egyptian numbers allowed",
    }),
  companyName: Joi.string().min(2).max(100).messages({
    "any.required": "Company Name is required",
    "string.min": "Name cannot be less than 2 characters",
    "string.max": "Name cannot exceed 100 characters",
  }),
  industry: Joi.string()
    .valid(...Object.values(industryEnum))
    .messages({
      "any.only": "Industry must be one of {{#valids}}",
      "any.required": "Industry is required",
    }),
  numberOfEmployees: Joi.string()
    .valid(...Object.values(numberOfEmployeesEnum))
    .messages({
      "any.only": "Number of employments format must be one of {{#valids}}",
      "any.required": "Number of Employments is required",
    }),
  address: Joi.string().max(300).messages({
    "any.max": "Maximum length of Address is 300 characters",
    "any.required": "Address is required",
  }),
  description: Joi.string().max(500).messages({
    "any.max": "Maximum length of Description is 500 characters",
    "any.required": "Description is required",
  }),

  jobTitle: Joi.string().trim().messages({
    "string.base": "Job title must be a string",
    "string.empty": "Job title is required",
    "any.required": "Job title is required",
  }),

  jobLocation: Joi.string()
    .valid(...Object.values(jobLocEnum))
    .messages({
      "string.base": "Job location must be a string",
      "any.only": "Invalid job location",
      "any.required": "Job location is required",
    }),

  workingTime: Joi.string()
    .valid(...Object.values(workTime))
    .messages({
      "string.base": "Working time must be a string",
      "any.only": "Invalid working time",
      "any.required": "Working time is required",
    }),

  seniorityLevel: Joi.string()
    .valid(...Object.values(seniorityLevel))
    .messages({
      "string.base": "Seniority level must be a string",
      "any.only": "Invalid seniority level",
      "any.required": "Seniority level is required",
    }),

  jobDescription: Joi.string().max(500).messages({
    "string.base": "Job description must be a string",
    "string.max": "Job description must not exceed 500 characters",
  }),

  technicalSkill: Joi.array()
    .items(Joi.string().valid(...Object.values(technicalSkillsEnum)))
    .messages({
      "array.base": "Technical skills must be an array",
      "any.only": "Invalid technical skill",
    }),

  softSkill: Joi.array()
    .items(Joi.string().valid(...Object.values(softSkillsEnum)))
    .messages({
      "array.base": "Soft skills must be an array",
      "any.only": "Invalid soft skill",
    }),
    status: Joi.string()
    .valid(...Object.values(applicationStatusEnum))
    .messages({
      "string.base": "Status must be a string",
      "any.only": "Invalid status input",
      "any.required": "status is required",
    }),

};

export const paramsGeneralSchema = {
  _id: Joi.string().length(24).messages({
    "any.required": "Id is required",
    "string.length": "Id is not valid",
  }),
};
