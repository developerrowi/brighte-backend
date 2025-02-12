import express from 'express';
import { NODE_ENV, PORT } from './config/index';


var cors = require('cors')

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}


class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor() {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;
    this.app.use(cors(corsOptions))

    this.app.options('*', (req, res) => {
      res.sendStatus(200);
    });

  }

  public listen() {
    this.app.listen(this.port, (err?: any) => {
      if (err) {
        console.error("Server failed to start:", err);
        process.exit(1);
      }
      console.log(`=================================`)
      console.log(`======= ENV: ${this.env} =======`)
      console.log(`🚀 App listening on port ${this.port}`)
      console.log(`=================================`)
    });
  
  }

}

export default App;
