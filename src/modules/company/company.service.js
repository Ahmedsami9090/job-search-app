import { roleEnum } from "../../db/enums.js";
import companyModel from "../../db/models/company.model.js";
import { asyncHandler, deleteFile, uploadFile } from "./../../utils/index.js";

//====================ADD-COMPANY==========================
export const addCompany = asyncHandler(async (req, res, next) => {
  const { companyName, industry, companyEmail } = req.body;
  const company = await companyModel.create({
    companyName,
    industry,
    companyEmail,
    createdBy: req.user._id,
  });
  res.status(201).json({ message: "success", company });
});
//=================UPDATE-COMPANY=========================
export const updateCompany = asyncHandler(async (req, res, next) => {
  const { companyId } = req.params;
  const company = await companyModel.findOneAndUpdate(
    { _id: companyId, createdBy: req.user._id, deletedAt: { $exists: false } },
    req.body,
    { new: true }
  );
  if (!company) {
    return next(new Error("Company not found or unauthorized"));
  }
  res.status(200).json({ message: "success", company });
});
//===============SOFT-DELETE-COMPANY======================
export const softDeleteCompany = asyncHandler(async (req, res, next) => {
  const { companyId } = req.params;
  const company = await companyModel.findById(companyId);
  if (
    !company.createdBy.equals(req.user._id) &&
    req.user.role !== roleEnum.admin
  ) {
    return next(new Error("Unauthorized", { cause: 401 }));
  }
  await companyModel.updateOne(
    { _id: companyId },
    {
      deletedAt: Date.now(),
    }
  );
  res.status(200).json({ message: "success" });
});
//=============GET-COMPANY-&-JOBS=======================
export const getCompanyAndJobs = asyncHandler(async (req, res, next) => {
  const { companyId } = req.params;
  const company = await companyModel.findById(companyId);
  if (!company) {
    return next(new Error("Company not found", { cause: 404 }));
  }
  res.status(200).json({ message: "success", company });
});
//============SEARCH-BY-NAME============================
export const searchByName = asyncHandler(async (req, res, next) => {
  const { name } = req.query;
  const company = await companyModel.find({ companyName: { $regex: name } });
  res.status(200).json({ company });
});
//===========================UPLOAD-LOGO==========================
export const uploadCompanyLogo = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    return next(new Error("file not found", { cause: 404 }));
  }
  const { path } = req.file;
  const result = await uploadFile(path, "company-logos");
  if ("error" in result) {
    return next(new Error(result.error, { cause: 500 }));
  }
  await companyModel.updateOne(
    { createdBy: req.user._id },
    {
      logo: {
        secure_url: result.secure_url,
        public_id: result.public_id,
      },
    }
  );
  res.status(201).json({ message: "success", result });
});
//======================UPLOAD-COVER-PIC============================
export const uploadCoverPic = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    return next(new Error("file not found", { cause: 404 }));
  }
  const { path } = req.file;
  const result = await uploadFile(path, "cover-pics");
  if ("error" in result) {
    return next(new Error(result.error, { cause: 500 }));
  }
  await companyModel.updateOne(
    { createdBy: req.user._id },
    {
      coverPic: {
        secure_url: result.secure_url,
        public_id: result.public_id,
      },
    }
  );
  res.status(201).json({ message: "success", result });
});
//=========================DELETE-LOGO============================
export const deleteCompanyLogo = asyncHandler(async (req, res, next) => {
  const { companyId } = req.params;
  const company = await companyModel.findOne({
    _id: companyId,
    createdBy: req.user._id,
  });
  if (!company) {
    return next(new Error("Logo not found or unauthorized", { cause: 500 }));
  }
  const result = await deleteFile(company.logo.public_id);
  if ("error" in result) {
    return next(new Error(result.error, { cause: 500 }));
  }
  await companyModel.updateOne(
    { _id: company._id },
    {
      $unset: { logo: "" },
    }
  );
  res.status(200).json({ message: "success" });
});
//===============DELETE-COVER-PIC=============================
export const deleteCoverPic = asyncHandler(async (req, res, next) => {
  const { companyId } = req.params;
  const company = await companyModel.findOne({
    _id: companyId,
    createdBy: req.user._id,
  });
  if (!company) {
    return next(
      new Error("Cover Picture not found or unauthorized", { cause: 500 })
    );
  }
  const result = await deleteFile(company.coverPic.public_id);
  if ("error" in result) {
    return next(new Error(result.error, { cause: 500 }));
  }
  await companyModel.updateOne(
    { _id: company._id },
    {
      $unset: { coverPic: "" },
    }
  );
  res.status(200).json({ message: "success" });
});
