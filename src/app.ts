import express from 'express';
import { NODE_ENV, PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD, DB_HOST } from './config/index';
import cors from 'cors';
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";


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
      this.app.listen(this.port, (err?: any) => {
        console.log(`=================================`);
        console.log(`======= ENV: ${this.env} =======`);
        console.log(`🚀 App listening on port ${this.port}`);
        console.log(`=================================`);
      });
    });
  }
}

export default App;
