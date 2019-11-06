"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ejs = __importStar(require("ejs"));
var app = {
    // login
    login: function (req, res) {
        ejs.renderFile('views/login.ejs', {}, function (err, data) {
            res.end(data);
        });
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
// export class App {
//     constructor() {
//     }
//     app = {
//         // login
//         login: function(req: any, res: any) {
//             ejs.renderFile('views/login.ejs', {}, function(err, data) {
//                 res.end(data);
//             });
//         },
//         register: function(req: any, res: any) {
//             ejs.renderFile('views/register.ejs', {}, function(err, data) {
//                 res.end(data);
//             });
//         },
//         home: function(req: any, res: any) {
//             var data = '后台数据';
//             var list:Array<number> = [1, 2, 3, 4];
//             ejs.renderFile('views/index.ejs', {msg: data, l: list}, function(err, data) {
//                 res.end(data);
//             });
//         }
//     }
// }
