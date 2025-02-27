import userModel from "../db/models/user.model.js";
import { asyncHandler, verifyToken} from "../utils/index.js";

export const authenticateUser = asyncHandler(async (req, res, next) => {
  const { authorization } = req.headers;
  const [ prefix, token ] = authorization.split(" ");
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
    return next(new Error("Invalid Token", { cause: 498 }));
  }
  const user = await userModel.findById(decoded._id);
  if (!user) {
    return next(new Error("user not found", { cause: 404 }));
  }
  if (user.changeCredentialTime?.getTime() > (decoded.iat * 1000)){
    return next(new Error("Token expired, please log in again.", {cause : 498}))
  }
  if (user.bannedAt || user.deletedAt){
    return next(new Error ("please contact support", {cause : 403}))
  }
  req.user = user;
  next();
});

export const authorizeUser = asyncHandler(async (accessRole) => {
  return (req, res, next) => {
    if (!req.role === accessRole) {
      return next(new Error("Access denied", { cause: 401 }));
    }
    next()
  };
});
