import { Router } from "express";
import {authenticateUser, handleFileUpload, validateInput} from './../../middlewares/index.js';
import * as SCHEMA from './job.validation.js'
import * as JB from './job.service.js'
import { fileTypes } from "../../middlewares/multer.js";

const jobRouter=  Router({mergeParams : true})

jobRouter.post(
    '/new',
    validateInput(SCHEMA.addNewJobSchema, ['headers', 'body', 'params']),
    authenticateUser,
    JB.addNewJob
)
jobRouter.put(
    '/update/:jobId',
    validateInput(SCHEMA.updateJobSchema, ['params', 'headers']),
    authenticateUser,
    JB.updateJob
)
jobRouter.delete(
    '/:jobId',
    validateInput(SCHEMA.deleteJobSchema, ['params', 'headers']),
    authenticateUser,
    JB.deleteJob
)
jobRouter.get(
    '/',
    validateInput(SCHEMA.getFilteredJobsSchema, ['body']),
    JB.getFilteredJobs
)
jobRouter.get(
    '/applications',
    validateInput(SCHEMA.getFilteredJobsSchema, ['body']),
    authenticateUser,
    JB.getAllApplications
)
jobRouter.post(
    '/:jobId/apply',
    validateInput(SCHEMA.applyForJobSchema, ['params', 'headers']),
    authenticateUser,
    handleFileUpload(fileTypes.pdf).single('CV'),
    JB.applyFoJob
)
jobRouter.put(
    '/application/:applicationId/status',
    validateInput(SCHEMA.changeApplicationStatus, ['params', 'headers', 'body']),
    authenticateUser,
    JB.changeApplicationStatus
)
export default jobRouter