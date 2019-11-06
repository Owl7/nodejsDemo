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
const router = __importStar(require("./model/test-express-router"));
http.createServer(router.app).listen(8000);
// res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
//     var pathname: string = ""
//     if (req.url != null) {
//         var originalPath = url.parse(req.url).pathname;
//         if (originalPath != null) { 
//             pathname = originalPath.replace('/', '');
//         }
//     }
//     if (pathname != 'favicon.ico') {
//         try {
//             newRouter.app[pathname](req, res);
//         } catch (error) {
//             console.log(error);
//             newRouter.app['home'](req, res);
//         }
//     }
