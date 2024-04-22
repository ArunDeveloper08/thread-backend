import express from "express"
import { ApolloServer } from '@apollo/server';
import {expressMiddleware} from "@apollo/server/express4"

async function init(){
    const app = express();
    app.use(express.json());
    const PORT = Number(process.env.PORT) || 8000;
    
    // create graghQL server
    const gqlserver = new ApolloServer({
        typeDefs:`
        type Query {
            hello : String
            say(name:String):String
        }
        `,
        resolvers:{
            Query:{
                hello :()=> `Hey there , I am a graphql server`,
                say:(_,{name}:{name:String})=>`Hey ${name},How are you? `
            }
         }
    })
    //  start GraphQL server 
    await gqlserver.start();
    
    app.get("/",(req,res)=>{
        res.json({message:"server is running"})
    })
    app.use('/graphql',expressMiddleware(gqlserver))
    app.listen(PORT,()=>{
        console.log( `Server is listening on port ${PORT}`)
    })
}

init();