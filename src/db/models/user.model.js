import mongoose from "mongoose";
import { genderEnum, OtpTypeEnum, providerEnum, roleEnum } from "../enums.js";
import { encryptData, hashData, eventEmitter } from "../../utils/index.js";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      set: function (value) {
        return value.charAt(0).toUpperCase() + value.slice(1);
      },
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      set: function (value) {
        return value.charAt(0).toUpperCase() + value.slice(1);
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minLength: 6,
    },
    provider: {
      type: String,
      enum: Object.values(providerEnum),
      default: providerEnum.system,
    },
    gender: {
      type: String,
      enum: Object.values(genderEnum),
    },
    DOB: {
      type: Date,
    },
    mobileNumber: {
      type: String,
    },
    role: {
      type: String,
      enum: Object.values(roleEnum),
      default: roleEnum.user,
    },
    isConfirmed: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
    },
    bannedAt: {
      type: Date,
    },
    updatedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    changeCredentialTime: {
      type: Date,
    },
    profilePic: {
      secure_url: String,
      public_id: String,
    },
    coverPic: {
      secure_url: String,
      public_id: String,
    },
    OTP: [
      {
        code: String,
        type: Object.values(OtpTypeEnum),
        expiresIn: Date,
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.virtual("username").get(function () {
  return `${this.firstName}${this.lastName}`;
});
userSchema.pre("updateOne", async function (next) {
  // encrypt new mobileNumber if exists
  if (this._update.mobileNumber) {
    this._update.mobileNumber = await encryptData(this._update.mobileNumber);
  }
  if(this._update.password){
    this._update.password = await hashData(this._update.password)
  }
  next();
});
userSchema.pre("save", async function (next) {
  // hash password & encrypt mobileNumber for system user only
  if (this.provider === providerEnum.system) {
    this.password = await hashData(this.password);
    this.mobileNumber = await encryptData(this.mobileNumber);
  }
  next();
});

userSchema.post("save", async function (doc, next) {
  // send confirm email OTP
  if (doc.provider === providerEnum.system) {
    eventEmitter.emit("sendOtp", doc.email, 10, OtpTypeEnum.confirmEmail);
  }
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
