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
const myjs_common_1 = require("myjs-common");
const app = http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plan' });
    let date = myjs_common_1.SimpleDateFormat.formatDate(new Date(), myjs_common_1.DATE_FORMATTER.SECONDS_FORMAT);
    res.write('Hello World ' + date);
    res.end();
}).listen(8000);
