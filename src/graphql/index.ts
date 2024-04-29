import { ApolloServer } from "@apollo/server";
import { prismaClient } from "../lib/db";
import { User } from "./user";
async function createApolloGrapghqlServer(){
    const gqlserver = new ApolloServer({
        typeDefs: `
            type Query {
             ${User.queries}
            }
            type Mutation {
            ${User.mutations}
            }
            `,
        resolvers: {
          Query: {
            ...User.resolvers.queries,
          },
      Mutation:{
        ...User.resolvers.mutations,
      }
        },
      });
      //  start GraphQL server
      await gqlserver.start();
      return  gqlserver;
}
export default createApolloGrapghqlServer;