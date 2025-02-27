import { roleEnum } from "../../db/enums.js";
import companyModel from "../../db/models/company.model.js";
import userModel from "../../db/models/user.model.js";
import { authenticateUser } from "./auth/auth.js";

//-------------------------GET-ALL-USERS----------------------------
export const getAllUsers = async (parent, args) => {
  try {
    const user = await authenticateUser(args);
    if (user.role !== roleEnum.admin) {
      throw new Error("unauthorized");
    }
    const users = await userModel.find();
    return users;
  } catch (error) {
    throw new Error(`Error getting users: ${error.message}`);
  }
};
//-----------------------GET-ALL-COMPANIES-------------------------
export const getAllCompanies = async (parent, args) => {
  try {
    const user = await authenticateUser(args);
    if (user.role !== roleEnum.admin) {
      throw new Error("unauthorized");
    }
    const companies = await companyModel.find();
    return companies;
  } catch (error) {
    throw new Error(`Error getting companies: ${error.message}`);
  }
};
//---------------------BAN-USER-----------------------------
export const banUser = async (parent, args) => {
  try {
    const user = await authenticateUser(args);
    if (user.role !== roleEnum.admin) {
      throw new Error("unauthorized");
    }
    const result = await userModel.findOneAndUpdate(
      { _id: args.userId },
      {
        bannedAt: Date.now(),
      }
    );
    if (!result || result.bannedAt) {
      throw new Error(`user not found or banned already`);
    }
    return "success";
  } catch (error) {
    throw new Error(`Error banning user: ${error.message}`);
  }
};
//------------------UNBAN-USER----------------------------
export const unbanUser = async (parent, args) => {
  try {
    const user = await authenticateUser(args);
    if (user.role !== roleEnum.admin) {
      throw new Error("unauthorized");
    }
    const result = await userModel.findOneAndUpdate(
      { _id: args.userId },
      {
        $unset: { bannedAt: "" },
      }
    );
    if (!result || !result.bannedAt) {
      throw new Error(`user not found or not banned`);
    }
    return "success";
  } catch (error) {
    throw new Error(`Error unbanning user: ${error.message}`);
  }
};
//----------------------------BAN-COMPANY------------------------
export const banCompany = async (parent, args) => {
  try {
    const user = await authenticateUser(args);
    if (user.role !== roleEnum.admin) {
      throw new Error("unauthorized");
    }
    const result = await companyModel.findOneAndUpdate(
      { _id: args.companyId },
      {
        bannedAt: Date.now(),
      }
    );
    if (!result || result.bannedAt) {
      throw new Error(`company not found or banned already`);
    }
    return "success";
  } catch (error) {
    throw new Error(`Error banning company: ${error.message}`);
  }
};
//------------------UNBAN-USER----------------------------
export const unbanCompany = async (parent, args) => {
  try {
    const user = await authenticateUser(args);
    if (user.role !== roleEnum.admin) {
      throw new Error("unauthorized");
    }
    const result = await companyModel.findOneAndUpdate(
      { _id: args.companyId },
      {
        $unset: { bannedAt: "" },
      }
    );
    if (!result || !result.bannedAt) {
      throw new Error(`Company not found or not banned`);
    }
    return "success";
  } catch (error) {
    throw new Error(`Error unbanning company: ${error.message}`);
  }
};
//-----------------APPROVE-COMPANY------------------------
export const approveCompany = async (parent, args) => {
  try {
    const user = await authenticateUser(args);
    if (user.role !== roleEnum.admin) {
      throw new Error("unauthorized");
    }
    const company = await companyModel.findByIdAndUpdate(
      { _id: args.companyId },
      {
        approvedByAdmin: true,
      }
    );
    if (!company) {
      throw new Error(`Company not found`);
    }
    return "approved"
  } catch (error) {
    throw new Error(`Error approving company: ${error.message}`);
  }
};
