import userModel from "../../../db/models/user.model.js";
import { verifyToken } from "../../../utils/index.js";

export const authenticateUser = async (args) => {
    const { authentication } = args;
    const [ prefix, token ] = authentication.split(" ");
    let decoded = "";
    if (prefix === "Admin") {
      decoded = await verifyToken(
        token,
        process.env.TOKEN_SECRET_KEY_ADMIN
      );
    } else if (prefix === "Bearer") {
      decoded = await verifyToken(
        token,
        process.env.TOKEN_SECRET_KEY_USER
      );
    } else {
      throw new Error("Invalid Token");
    }
    const user = await userModel.findById(decoded._id);
    if (!user) {
      throw new Error("user not found");
    }
    if (user.changeCredentialTime?.getTime() > (decoded.iat * 1000)){
      throw new Error("Token expired, please log in again.")
    }
    if (user.bannedAt || user.deletedAt){
      throw new Error ("Profile freezed or deleted")
    }
    return user
  }