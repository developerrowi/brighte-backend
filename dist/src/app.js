"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("./config/index");
var cors = require('cors');
const corsOptions = {
    origin: '*',
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200
};
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.env = index_1.NODE_ENV || 'development';
        this.port = index_1.PORT || 3000;
        this.app.use(cors(corsOptions));
        this.app.options('*', (req, res) => {
            res.sendStatus(200);
        });
    }
    listen() {
        this.app.listen(this.port, (err) => {
            if (err) {
                console.error("Server failed to start:", err);
                process.exit(1);
            }
            console.log(`=================================`);
            console.log(`======= ENV: ${this.env} =======`);
            console.log(`🚀 App listening on port ${this.port}`);
            console.log(`=================================`);
        });
    }
}
exports.default = App;
