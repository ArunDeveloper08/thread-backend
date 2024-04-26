import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { prismaClient } from "./lib/db";

async function init() {
  const app = express();
  app.use(express.json());
  const PORT = Number(process.env.PORT) || 8000;

  // create graghQL server
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

  app.get("/", (req, res) => {
    res.json({ message: "server is running" });
  });
  app.use("/graphql", expressMiddleware(gqlserver));
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
}

init();
