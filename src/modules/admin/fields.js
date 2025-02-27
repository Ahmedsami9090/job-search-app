import * as TP from "./types.js";
import * as RV from "./resolve.js";
import { GraphQLBoolean, GraphQLNonNull, GraphQLString } from "graphql";

export const userQuery = {
  getUsers: {
    type: TP.getUsersList, 
    args : {
      authentication : {type : new GraphQLNonNull(GraphQLString)}
    },
    resolve: RV.getAllUsers, 
  },
};
export const companyQuery = {
  getCompanies : {
    type : TP.getCompanyList,
    args : {
      authentication : {type : new GraphQLNonNull(GraphQLString)}
    },
    resolve : RV.getAllCompanies
  }
}
export const userMutation = {
  banUser : {
    type : GraphQLString,
    args : {
      authentication : {type : new GraphQLNonNull(GraphQLString)},
      userId : {type : new GraphQLNonNull(GraphQLString)},
    },
    resolve : RV.banUser
  },
  unBanUser : {
    type : GraphQLString,
    args : {
      authentication : {type : new GraphQLNonNull(GraphQLString)},
      userId : {type : new GraphQLNonNull(GraphQLString)},
    },
    resolve : RV.unbanUser
  }
}

export const companyMutation = {
  banCompany : {
    type : GraphQLString,
    args : {
      authentication : {type : new GraphQLNonNull(GraphQLString)},
      companyId : {type : new GraphQLNonNull(GraphQLString)},
    },
    resolve : RV.banCompany
  },
  unBanCompany : {
    type : GraphQLString,
    args : {
      authentication : {type : new GraphQLNonNull(GraphQLString)},
      companyId : {type : new GraphQLNonNull(GraphQLString)},
    },
    resolve : RV.unbanCompany
  },
  approveCompany : {
    type : GraphQLString,
    args : {
      authentication : {type : new GraphQLNonNull(GraphQLString)},
      companyId : {type : new GraphQLNonNull(GraphQLString)},
    },
    resolve : RV.approveCompany
  }
}
