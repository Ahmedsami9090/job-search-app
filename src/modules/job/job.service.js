import applicationModel from "../../db/models/application.model.js";
import companyModel from "../../db/models/company.model.js";
import jobOppModel from "../../db/models/jobOpp.model.js";
import { asyncHandler, uploadFile } from "./../../utils/index.js";

//=========================ADD-NEW-JOB=============================
export const addNewJob = asyncHandler(async (req, res, next) => {
  const { companyId } = req.params;
  const company = await companyModel.findById(companyId);
  if (
    !company ||
    (!company.createdBy.equals(req.user._id) &&
      !company.HRs?.includes(req.user._id)) ||
    company.deletedAt
  ) {
    return next(new Error("Company not found or unauthorized"));
  }
  const job = await jobOppModel.create({
    ...req.body,
    addedBy: req.user._id,
    companyId: company._id,
  });
  res.status(201).json({ message: "success", job });
});
//=====================UPDATE-JOB================================
export const updateJob = asyncHandler(async (req, res, next) => {
  const { jobId } = req.params;
  const job = await jobOppModel.findOneAndUpdate(
    { _id: jobId, addedBy: req.user._id, deletedAt },
    [{ $set: { isClosed: { $not: "$isClosed" } } }],
    { new: true }
  );
  if (!job) {
    return next(new Error("Job not found or unauthorized"));
  }
  res.status(200).json({ message: "success", job });
});
//===================DELETE-JOB=================================
export const deleteJob = asyncHandler(async (req, res, next) => {
  const { jobId } = req.params;
  const job = await jobOppModel.deleteOne({
    _id: jobId,
    addedBy: req.user._id,
  });
  if (!job.deletedCount) {
    return next(new Error("Job not found or unauthorized"));
  }
  res.status(200).json({ message: "success", job });
});
//=================GET-FILTERED-JOBS================================
export const getFilteredJobs = asyncHandler(async (req, res, next) => {
  const { page = 1, limit = 5 } = req.query;
  const { jobTitle, jobLocation, seniorityLevel, workingTime, technicalSkill } =
    req.body;
  const skip = +limit * (+page - 1);
  const query = {};
  if (jobTitle) {
    query.jobTitle = { $regex: new RegExp(jobTitle, "i") };
  }
  if (jobLocation) {
    query.jobLocation = { $regex: new RegExp(jobLocation, "i") };
  }
  if (seniorityLevel) {
    query.seniorityLevel = { $regex: new RegExp(seniorityLevel, "i") };
  }
  if (workingTime) {
    query.workingTime = { $regex: new RegExp(workingTime, "i") };
  }
  if (technicalSkill) {
    query.technicalSkill = {
      $elemMatch: { $regex: new RegExp(technicalSkill, "i") },
    };
  }
  const jobs = await jobOppModel
    .find(query)
    .skip(skip)
    .limit(+limit)
    .sort({ createdAt: -1 });
  if (!jobs.length) {
    return next(new Error("Jobs not found", { cause: 404 }));
  }
  const documentCount = await jobOppModel.countDocuments(query);
  const totalPages = Math.ceil(documentCount / limit);
  res.status(200).json({
    message: "success",
    jobs,
    pagination: {
      totalPages,
      totalJobs: documentCount,
      currentPage: page,
      jobsPerPage: limit,
    },
  });
});
//======================GET-ALL-APPLICATIONS===========================
export const getAllApplications = asyncHandler(async (req, res, next) => {
  const job = await jobOppModel
    .find({ addedBy: req.user._id })
    .populate("applications");
  res.status(200).json({ job });
});
//=========================APPLY-FOR-JOB===============================
export const applyFoJob = asyncHandler(async (req, res, next) => {
  const { jobId } = req.params;
  if (!req.file) {
    return next(new Error("CV not found", { cause: 404 }));
  }
  const application = new applicationModel({
    userId: req.user._id,
    jobId,
  });
  await application.save();
  const upload = await uploadFile(req.file.path, "CV");
  if ("error" in upload) {
    return next(new Error(upload.error));
  }
  (application.userCv = {
    secure_url: upload.secure_url,
    public_id: upload.public_id,
  }),
    await application.save();

  res.status(201).json({ message: "success", application });
});
//======================ACCEPT/REJECT-APPLICATION======================
export const changeApplicationStatus =  asyncHandler(async (req,res,next)=>{
  const {status} = req.body
  const {applicationId} = req.params
  let application = await applicationModel.findById(applicationId).populate('company')
  if(!application.company.addedBy.equals(req.user._id) || !application){
    return next(new Error('application not found or unauthorized'))
  }
  application = await applicationModel.findOneAndUpdate({_id : application._id}, {
    status : status
  }, {new : true})
  res.status(200).json({message : 'success', application})
})