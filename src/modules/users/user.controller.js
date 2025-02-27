import { Router } from "express";
import {validateInput, authenticateUser, handleFileUpload } from "./../../middlewares/index.js";
import * as SCHEMA from "./user.validation.js";
import * as USER from "./user.service.js";
import { fileTypes } from "../../middlewares/multer.js";

const userRouter = Router();
userRouter.put(
  "/update",
  validateInput(SCHEMA.updateUserSchema, ["body", "headers"]),
  authenticateUser,
  USER.updateUser
);

userRouter.get(
    '/profile',
    validateInput(SCHEMA.getLoggedUser, ['headers']),
    authenticateUser,
    USER.getLoggedUser
)
userRouter.get(
  '/profile/:userId',
  validateInput(SCHEMA.getUserProfileSchema, ['params']),
  USER.getUserProfile
)
userRouter.put(
  '/update/password',
  validateInput(SCHEMA.updatePasswordSchema, ['body', 'headers']),
  authenticateUser,
  USER.updatePassword
)
userRouter.post(
  '/upload/profile-pic',
  authenticateUser,
  handleFileUpload(fileTypes.image).single('profilePic'),
  USER.uploadProfilePic
)
userRouter.post(
  '/upload/cover-pic',
  authenticateUser,
  handleFileUpload(fileTypes.image).single('profilePic'),
  USER.uploadProfilePic
)
userRouter.delete(
  '/profile-pic',
  validateInput(SCHEMA.deleteProfilePicSchema, ['body', 'headers']),
  authenticateUser,
  USER.deleteProfilePic
)
userRouter.delete(
  '/cover-pic',
  validateInput(SCHEMA.deleteCoverPicSchema, ['body', 'headers']),
  authenticateUser,
  USER.deleteCoverPic
)
userRouter.delete(
  '/delete',
  validateInput(SCHEMA.softDeleteUserSchema, ['headers']),
  authenticateUser,
  USER.softDeleteUser
)
export default userRouter;
