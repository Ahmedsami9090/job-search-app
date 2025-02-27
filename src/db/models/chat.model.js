import mongoose from "mongoose";
import { required } from 'joi';

const chatSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required:  true
  },
  receiverId : {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required:  true
  },
  message : {
    type : String,
    required : true
  }
},{timestamps : true});

const chatModel = mongoose.model('Chat', chatSchema)
export default chatModel
