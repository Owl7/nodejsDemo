"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const url = __importStar(require("url"));
// path 模块
const path = __importStar(require("path"));
// 获取文件类型
function getMime(extname) {
    switch (extname) {
        case '.html':
            return 'text/html';
        case '.css':
            return 'text/css';
        case '.js':
            return 'text/javascript';
        default:
            return 'text/html';
    }
}
function statics(req, res, staticpath) {
    var pathname = "";
    if (req.url != null) {
        pathname = url.parse(req.url).pathname;
    }
    console.log(pathname);
    if (pathname == "/") {
        pathname = 'index.html';
    }
    // 获取文件名后缀名
    var extname = "";
    if (pathname != null) {
        extname = path.extname(pathname);
    }
    if (pathname != '/favicon.ico') {
        fs.readFile(staticpath + '/' + pathname, function (err, result) {
            if (err) {
                fs.readFile(staticpath + '/404.html', function (err, data404) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        res.writeHead(404, { 'Content-Type': 'text/html' });
                        res.write(data404);
                        res.end();
                    }
                });
            }
            else {
                res.writeHead(200, { 'Content-Type': getMime(extname) });
                res.write(result);
                res.end();
            }
        });
    }
}
exports.statics = statics;
