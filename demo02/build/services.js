"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const http = __importStar(require("http"));
const app = http.createServer(function (req, res) {
    var pathname = req.url;
    console.log(pathname);
    res.writeHead(200, { 'Content-Type': 'text/plan' });
    res.write('Hello HAHAHAAHA');
    res.end();
}).listen(8000);