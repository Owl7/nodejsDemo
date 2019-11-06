"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const url = __importStar(require("url"));
const ejs = __importStar(require("ejs"));
const fs = __importStar(require("fs"));
var G = [];
function app(req, res) {
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
            G[pathname](req, res);
        }
        catch (error) {
            G['home'](req, res);
            res.end('路由不存在');
        }
    }
}
exports.app = app;
app.prototype.get = function (path, callback) {
    G[path] = callback;
};
app.prototype.get('login', function (req, res) {
    ejs.renderFile('views/login.ejs', {}, function (err, data) {
        res.end(data);
    });
});
app.prototype.get('dologin', function (req, res) {
    if (req.method == 'GET') {
        console.log('get');
        console.log(url.parse(req.url, true).query);
    }
    else if (req.method == 'POST') {
        var postStr = '';
        req.on('data', function (chunk) {
            postStr += chunk;
        });
        req.on('end', function (err, chunk) {
            console.log(postStr);
            fs.appendFile('login.txt', postStr + '\n', function (err) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log('写入数据成功');
                }
            });
            res.end("<script>alert('登录成功'); history.back();</script>");
        });
    }
});
app.prototype.get('register', function (req, res) {
    ejs.renderFile('views/register.ejs', {}, function (err, data) {
        res.end(data);
    });
});
app.prototype.get('home', function (req, res) {
    var data = '后台数据';
    var list = [1, 2, 3, 4];
    ejs.renderFile('views/index.ejs', { msg: data, l: list }, function (err, data) {
        res.end(data);
    });
});
// // 装饰器
// function get(params: any) {
//     return function (target: any, methodName: any, desc: any) {
//     }
// }
// class HttpClient {
//     constructor() {
//     }
//     @get('/login')
//     getDat() {
//     }
// }
