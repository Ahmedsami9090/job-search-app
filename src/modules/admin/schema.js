import { GraphQLObjectType, GraphQLSchema } from "graphql";
import * as FD from "./fields.js";

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      ...FD.userQuery,
      ...FD.companyQuery,
    },
  }),
  mutation: new GraphQLObjectType({
    name: "Mutation",
    fields: {
      ...FD.userMutation,
      ...FD.companyMutation
    },
  }),
});

export default schema;
