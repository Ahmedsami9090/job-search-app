import userModel from "./../db/models/user.model.js";

async function deleteExpiredOtps() {
  try {
    
    
    const now = Date.now();
    const result = await userModel.updateMany(
      {},
      { $pull: { OTP: { expiresIn: { $lt: now } } } }
    );
    console.log(`Deleted expired OTPs for users.`);
  } catch (error) {
    console.error("Error deleting expired OTPs:", error);
  }
}

export default deleteExpiredOtps;
