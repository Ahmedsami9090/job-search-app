import { Router } from "express";
import {
  validateInput,
  authenticateUser,
  handleFileUpload,
} from "./../../middlewares/index.js";
import * as SCHEMA from "./company.validation.js";
import * as COMP from "./company.service.js";
import { fileTypes } from "../../middlewares/multer.js";
import jobRouter from "../job/job.controller.js";


const companyRouter = Router({mergeParams : true});
companyRouter.use('/:companyId/jobs', jobRouter)
companyRouter.post(
  "/new",
  validateInput(SCHEMA.addCompanySchema, ["body", "headers"]),
  authenticateUser,
  COMP.addCompany
);
companyRouter.patch(
  "/update/:companyId",
  validateInput(SCHEMA.updateCompanySchema, ["body", "params", "headers"]),
  authenticateUser,
  COMP.updateCompany
);
companyRouter.delete(
  "/delete/:companyId",
  validateInput(SCHEMA.softDeleteCompanySchema, ["body", "params", "headers"]),
  authenticateUser,
  COMP.softDeleteCompany
);
companyRouter.get(
  "/:companyId",
  validateInput(SCHEMA.getCompanyAndJobsSchema, ["params"]),
  COMP.getCompanyAndJobs
);
companyRouter.get("/", COMP.searchByName);
companyRouter.put(
  "/upload/logo",
  authenticateUser,
  handleFileUpload(fileTypes.image).single("logo"),
  COMP.uploadCompanyLogo
);
companyRouter.put(
  "/upload/cover-pic",
  authenticateUser,
  handleFileUpload(fileTypes.image).single("coverPic"),
  COMP.uploadCoverPic
);
companyRouter.delete(
  "/:companyId/logo",
  validateInput(SCHEMA.deleteCompanyLogoSchema, ["params", "headers"]),
  authenticateUser,
  COMP.deleteCompanyLogo
);
companyRouter.delete(
  "/:companyId/cover-pic",
  validateInput(SCHEMA.deleteCoverPicSchema, ["params", "headers"]),
  authenticateUser,
  COMP.deleteCoverPic
);
export default companyRouter;
