import mongoose from "mongoose";
import { industryEnum, numberOfEmployeesEnum } from "../enums.js";
import jobOppModel from "./jobOpp.model.js";

const companySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
    },
    industry: {
      type: String,
      enum: Object.values(industryEnum),
    },
    address: {
      type: String,
    },
    numberOfEmployees: {
      type: String,
      enum: Object.values(numberOfEmployeesEnum),
    },
    companyEmail: {
      type: String,
      unique: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    logo: {
      secure_url: String,
      public_id: String,
    },
    coverPic: {
      secure_url: String,
      public_id: String,
    },
    HRs: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    deletedAt: {
      type: Date,
    },
    bannedAt: {
      type: Date,
    },
    legalAttachment: {
      secure_url: String,
      public_id: String,
    },
    approvedByAdmin: {
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

companySchema.virtual("jobs").get(async function () {
  return await jobOppModel.find({ companyId: this._id });
});

const companyModel = mongoose.model("Company", companySchema);

export default companyModel;
