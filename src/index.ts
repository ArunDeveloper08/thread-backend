import express from "express";

import { expressMiddleware } from "@apollo/server/express4";
import createApolloGrapghqlServer from "./graphql";

async function init() {
  const app = express();
  app.use(express.json());
  const PORT = Number(process.env.PORT) || 8000;

  // create graghQL server


  app.get("/", (req, res) => {
    res.json({ message: "server is running" });
  });
  const gqlserver=await createApolloGrapghqlServer();
  app.use("/graphql", expressMiddleware(gqlserver));
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
}

init();
