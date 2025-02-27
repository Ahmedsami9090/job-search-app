import mongoose from "mongoose";
import {
  jobLocEnum,
  seniorityLevel,
  softSkillsEnum,
  technicalSkillsEnum,
  workTime,
} from "../enums.js";
import applicationModel from "./application.model.js";

const jobOppSchema = new mongoose.Schema(
  {
    jobTitle: {
      type: String,
      trim: true,
      required: true,
    },
    jobLocation: {
      type: String,
      enum: Object.values(jobLocEnum),
      required: true,
    },
    workingTime: {
      type: String,
      enum: Object.values(workTime),
      required: true,
    },
    seniorityLevel: {
      type: String,
      enum: Object.values(seniorityLevel),
      required: true,
    },
    jobDescription: String,
    technicalSkill: [
      { type: String, enum: Object.values(technicalSkillsEnum) },
    ],
    softSkill: [{ type: String, enum: Object.values(softSkillsEnum) }],
    addedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    companyId: {
      type: mongoose.Types.ObjectId,
      ref: "Company",
    },
    isClosed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
jobOppSchema.virtual('applications', {
  ref : 'Application',
  localField : '_id',
  foreignField : "jobId",
  justOne : false
})
const jobOppModel = mongoose.model("JobOpp", jobOppSchema);

export default jobOppModel;
