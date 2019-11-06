"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ejs = __importStar(require("ejs"));
const url = __importStar(require("url"));
const fs = __importStar(require("fs"));
var app = {
    // login
    login: function (req, res) {
        ejs.renderFile('views/login.ejs', {}, function (err, data) {
            res.end(data);
        });
    },
    dologin: function (req, res) {
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
    },
    register: function (req, res) {
        ejs.renderFile('views/register.ejs', {}, function (err, data) {
            res.end(data);
        });
    },
    home: function (req, res) {
        var data = '后台数据';
        var list = [1, 2, 3, 4];
        ejs.renderFile('views/index.ejs', { msg: data, l: list }, function (err, data) {
            res.end(data);
        });
    }
};
exports.app = app;
