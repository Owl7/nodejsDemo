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
const MongoClient = __importStar(require("mongodb"));
var G = [];
var dburl = 'mongodb://localhost:27017/';
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
app.prototype.get('user', function (req, res) {
    ejs.renderFile('views/user.ejs', {}, function (err, data) {
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
app.prototype.get('add', function (req, res) {
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
            var param = {};
            postStr.split("&").forEach(element => {
                var key = element.split("=")[0];
                var value = element.split("=")[1];
                param[key] = value;
            });
            MongoClient.connect(dburl, { useNewUrlParser: true }, function (err, db) {
                if (err)
                    throw err;
                var dbo = db.db("test");
                var myobj = { name: param['username'], age: param['age'], sex: param['sex'] };
                dbo.collection("user").insertOne(myobj, function (err, result) {
                    if (err)
                        throw err;
                    console.log("文档插入成功");
                    res.end("<script>alert('文档插入成功'); history.back();</script>");
                    // dbo.collection("user").find().toArray(function (err, result) {
                    //     if (err) throw err;
                    //     console.log(result);
                    //     ejs.renderFile('views/userlist.ejs', { list: result }, function (err, data) {
                    //         res.end(data);
                    //     });
                    //     db.close();
                    // });
                    db.close();
                });
            });
            // res.end("<script>alert('创建成功');</script>"); history.back();
        });
    }
});
app.prototype.get('getuser', function (req, res) {
    MongoClient.connect(dburl, { useNewUrlParser: true }, function (err, db) {
        if (err)
            throw err;
        var dbo = db.db("test");
        dbo.collection("user").find().toArray(function (err, result) {
            if (err)
                throw err;
            console.log(result);
            ejs.renderFile('views/userlist.ejs', { list: result }, function (err, data) {
                res.end(data);
            });
            db.close();
        });
    });
});
app.prototype.get('del', function (req, res) {
    var postStr = '';
    req.on('data', function (chunk) {
        postStr += chunk;
    });
    req.on('end', function (err, chunk) {
        console.log(postStr);
    });
    res.end();
    // MongoClient.connect(dburl, { useNewUrlParser: true }, function (err, db) {
    //     if (err) throw err;
    //     var dbo = db.db("test");
    //     var whereStr = { "name": '菜鸟教程' };  // 查询条件
    //     dbo.collection("site").deleteOne(whereStr, function (err, obj) {
    //         if (err) throw err;
    //         console.log("文档删除成功");
    //         db.close();
    //     });
    // });
});
app.prototype.get('edit', function (req, res) {
    MongoClient.connect(dburl, { useNewUrlParser: true }, function (err, db) {
        if (err)
            throw err;
        var dbo = db.db("test");
        dbo.collection("user").find().toArray(function (err, result) {
            if (err)
                throw err;
            console.log(result);
            ejs.renderFile('views/userlist.ejs', { list: result }, function (err, data) {
                res.end(data);
            });
            db.close();
        });
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
