import asyncHandler from "../../utils/globalErrorHandler.js";
import userModel from "../../db/models/user.model.js";
import {
  decryptData,
  deleteFile,
  hashCompare,
  uploadFile,
} from "../../utils/index.js";
import { providerEnum } from "../../db/enums.js";

//========================UPDATE-USER===========================
export const updateUser = asyncHandler(async (req, res, next) => {
  const result = await userModel.updateOne({ _id: req.user._id }, req.body);
  res.status(201).json({ message: "success" });
});
//=======================GET-LOGGED-USER========================
export const getLoggedUser = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    message: "success",
    user: {
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
      mobileNumber: await decryptData(req.user.mobileNumber),
      gender: req.user.gender,
      DOB: req.user.DOB,
      id: req.user._id,
    },
  });
});
//=====================GET-PROFILE===============================
export const getUserProfile = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;
  const user = await userModel.findById(userId);
  if (!user) {
    return next(new Error("Profile not found", { cause: 404 }));
  }
  res.status(200).json({
    message: "success",
    user: {
      username: user.username,
      email: user.email,
      mobileNumber: await decryptData(user.mobileNumber),
      profilePic: user.profilePic?.public_id || null,
      coverPic: user.coverPic?.public_id || null,
    },
  });
});
//====================UPDATE-PASSWORD===========================
export const updatePassword = asyncHandler(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  if (!(await hashCompare(req.user.password, oldPassword))) {
    return next(new Error("Incorrect password", { cause: 401 }));
  }
  if (req.user.provider !== providerEnum.system) {
    return next(new Error("Unauthorized", { cause: 409 }));
  }
  await userModel.updateOne(
    { _id: req.user._id },
    {
      password: newPassword,
      changeCredentialTime: Date.now(),
    }
  );
  res.status(201).json({ message: "success" });
});
//=================UPLOAD-PROFILE-PIC==========================
export const uploadProfilePic = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    return next(new Error("file not found", { cause: 404 }));
  }
  const { path } = req.file;
  const result = await uploadFile(path, "profile-pics");
  if ("error" in result) {
    return next(new Error(result.error, { cause: 500 }));
  }
  await userModel.updateOne(
    { _id: req.user._id },
    {
      profilePic: {
        secure_url: result.secure_url,
        public_id: result.public_id,
      },
    }
  );
  res.status(201).json({ message: "success", result });
});
//=================UPLOAD-COVER-PIC============================
export const uploadCoverPic = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    return next(new Error("file not found", { cause: 404 }));
  }
  const { path } = req.file;
  const result = await uploadFile(path, "cover-pics");
  if ("error" in result) {
    return next(new Error(result.error, { cause: 500 }));
  }
  await userModel.updateOne(
    { _id: req.user._id },
    {
      coverPic: {
        secure_url: result.secure_url,
        public_id: result.public_id,
      },
    }
  );
  res.status(201).json({ message: "success", result });
});
//==============DELETE-PROFILE-PIC============================
export const deleteProfilePic = asyncHandler(async (req, res, next) => {
  const { public_id } = req.body;
  if( req.user.profilePic?.public_id !== public_id){
    return next(new Error('Image not found', {cause : 404}))
  }
  const result = await deleteFile(public_id);
  if ("error" in result) {
    return next(new Error(result.error, { cause: 500 }));
  }
  await userModel.updateOne({_id : req.user._id}, {
    $unset : {profilePic : ""}
  })
  res.status(200).json({message : 'success'})
});
//===============DELETE-COVER-PIC=============================
export const deleteCoverPic = asyncHandler(async (req, res, next) => {
  const { public_id } = req.body;
  if( req.user.coverPic?.public_id !== public_id){
    return next(new Error('cover not found', {cause : 404}))
  }
  const result = await deleteFile(public_id);
  if ("error" in result) {
    return next(new Error(result.error, { cause: 500 }));
  }
  await userModel.updateOne({_id : req.user._id}, {
    $unset : {coverPic : ""}
  })
  res.status(200).json({message : 'success'})
});
//===================SOFT-DELETE==============================
export const softDeleteUser = asyncHandler(async (req,res,next)=>{
  await userModel.updateOne({_id : req.user._id}, {
    $set : {deletedAt : Date.now()}
  })
  res.status(200).json({message : "success"})
})