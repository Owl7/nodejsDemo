"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var http = __importStar(require("http"));
var url = __importStar(require("url"));
var newRouter = __importStar(require("./model/newrouter"));
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    var pathname = "";
    if (req.url != null) {
        var originalPath = url.parse(req.url).pathname;
        if (originalPath != null) {
            pathname = originalPath.replace('/', '');
        }
    }
    if (pathname != 'favicon.ico') {
        try {
            newRouter.app[pathname](req, res);
        }
        catch (error) {
            console.log(error);
            newRouter.app['home'](req, res);
        }
    }
}).listen(8000);
