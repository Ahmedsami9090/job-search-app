import nodemailer from "nodemailer";
import dotenv from 'dotenv'
import { EventEmitter } from "events";
import { customAlphabet } from "nanoid";
import userModel from './../db/models/user.model.js';
import { hashData } from "../utils/index.js";
dotenv.config()

export const eventEmitter = new EventEmitter()
const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASS,
  },
});
eventEmitter.on('sendOtp', async (receiver, expiryInMin = 10, type) => {
  try {
    const otp = customAlphabet('0123456789',4)()
    const hash = await hashData(otp)
    await userModel.updateOne({email : receiver},
       {
        $push : {OTP : {
                code : hash, 
                type : type, 
                expiresIn : Date.now() + expiryInMin * 60 * 1000
            }
        }
      })
    await transporter.sendMail({
      from: '"Job Search app" <zaghloul85@gmail.com>', // sender address
      to: receiver, // list of receivers
      subject: type, // Subject line
      text: "", // plain text body
      html: `<p>Please use this code <b>${otp}</b> to ${type}</p>`
    })
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
})
