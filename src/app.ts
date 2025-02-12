import express from 'express';
import { NODE_ENV, PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD, DB_HOST } from './config/index';
import cors from 'cors';
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import prisma from "./prisma"; // Import the shared Prisma instance


const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;
  private server: ApolloServer;

  constructor() {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;
    this.app.use(cors(corsOptions));

    this.app.options('*', (req, res) => {
      res.sendStatus(200);
    });

    this.server = new ApolloServer({
      typeDefs,
      resolvers,
      plugins: [ApolloServerPluginLandingPageGraphQLPlayground()]
    });
  }

  public async connectDB() {
    await this.server.start();
    this.server.applyMiddleware({ app: this.app });
  }

  public listen() {
    this.connectDB().then(() => {
      const expressInstance = this.app.listen(this.port, (err?: any) => {
        console.log(`=================================`);
        console.log(`======= ENV: ${this.env} =======`);
        console.log(`🚀 App listening on port ${this.port}`);
        console.log(`=================================`);
      });
    
      process.on("SIGINT", async () => {
        await this.closeDB();
        console.log('Closing db session')
      });

      process.on("SIGTERM", async () => {
        await this.closeDB();
        console.log('Closing db session')
      });

    });
  }

  public async closeDB() {
    await prisma.$disconnect();
    console.log("Database connection closed");
  }
}

export default App;
