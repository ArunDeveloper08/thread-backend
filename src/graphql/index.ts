import { ApolloServer } from "@apollo/server";
import { prismaClient } from "../lib/db";
async function createApolloGrapghqlServer(){
    const gqlserver = new ApolloServer({
        typeDefs: `
            type Query {
                hello : String
                say(name:String):String
            }
            type Mutation {
             createUser(firstName:String! , lastName:String! , password:String! ,email:String!): Boolean
            }
            `,
        resolvers: {
          Query: {
            hello: () => `Hey there , I am a graphql server`,
            say: (_, { name }: { name: String }) => `Hey ${name},How are you? `,
          },
          Mutation: {
            createUser: async (
              _,
              {
                firstName,
                lastName,
                email,
                password,
              }: {
                firstName: string;
                lastName: string;
                email: string;
                password: string;
              }
            ) => {
      await prismaClient.user.create({
        data : {
            email,
            firstName,
            lastName,
            password,
            salt:'random_salt'
        }
      })
      return true;
    
            },
          },
        },
      });
      //  start GraphQL server
      await gqlserver.start();
      return  gqlserver;
}
export default createApolloGrapghqlServer;