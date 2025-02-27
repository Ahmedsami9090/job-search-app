import mongoose from "mongoose";
import { applicationStatusEnum } from "../enums.js";
import jobOppModel from "./jobOpp.model.js";

const applicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    jobId: {
      type: mongoose.Types.ObjectId,
      ref: "JobOpp",
    },
    userCv: {
      secure_url: String,
      public_id: String,
    },
    status: {
      type: String,
      enum: Object.values(applicationStatusEnum),
      default: applicationStatusEnum.pending,
    },
  },
  { 
    timestamps: true,
    toJSON : {virtuals : true},
    toObject : {virtuals : true}
  }
);
applicationSchema.virtual('company', {
  ref : 'JobOpp',
  localField : "jobId",
  foreignField : "_id",
  justOne : true
})

applicationSchema.pre('save', async function (next) {
  const job = await jobOppModel.findOne({_id : this.jobId, isClosed : false})
  if(!job){
    return next(new Error('Job not found', {cause : 404}))
  }
  next()
})


const applicationModel = mongoose.model("Application", applicationSchema);

export default applicationModel;
