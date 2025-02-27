import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLID,
  GraphQLList,
  GraphQLSchema,
} from "graphql";

const getUsers = new GraphQLObjectType({
  name: "User",
  fields: {
    _id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    provider: { type: GraphQLString },
    gender: { type: GraphQLString },
    DOB: { type: GraphQLString },
    role: { type: GraphQLString },
    isConfirmed: { type: GraphQLBoolean },
    deletedAt: { type: GraphQLString },
    updatedBy: { type: GraphQLID },
    bannedAt : {type: GraphQLString},
    changeCredentialTime: { type: GraphQLString },
    createdQt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  },
});

const getCompanies = new GraphQLObjectType({
  name: "Company",
  fields: {
    _id: { type: GraphQLID },
    companyName: { type: GraphQLString },
    description: { type: GraphQLString },
    industry: { type: GraphQLString },
    address: { type: GraphQLString },
    numberOfEmployees: { type: GraphQLString },
    companyEmail: { type: GraphQLString },
    createdBy: { type: GraphQLString },
    HRs: {
      type: new GraphQLList(
        new GraphQLObjectType({
          name: "HRs",
          fields: {
            _id: { type: GraphQLID },
          },
        })
      ),
    },
    bannedAt: { type: GraphQLString },
    approvedByAdmin: { type: GraphQLBoolean },
    createdQt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  },
});

export const getUsersList = new GraphQLList(getUsers);
export const getCompanyList = new GraphQLList(getCompanies)

