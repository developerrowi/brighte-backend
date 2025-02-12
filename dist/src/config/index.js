"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = exports.NODE_ENV = void 0;
require('dotenv').config();
_a = process.env, exports.NODE_ENV = _a.NODE_ENV, exports.PORT = _a.PORT;
