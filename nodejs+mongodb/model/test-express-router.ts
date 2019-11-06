import * as url from 'url';
import * as ejs from 'ejs';
import * as fs from 'fs';
import * as MongoClient from 'mongodb'

var G: any = [];

var dburl = 'mongodb://localhost:27017/';

export function app(req: any, res: any) {

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

    var pathname: string = ""
    if (req.url != null) {
        var originalPath = url.parse(req.url).pathname;
        if (originalPath != null) {
            pathname = originalPath.replace('/', '');
        }
    }

    if (pathname != 'favicon.ico') {
        try {
            G[pathname](req, res);
        } catch (error) {
            G['home'](req, res);
            res.end('路由不存在');
        }
    }
}

app.prototype.get = function (path: string, callback: Function) {
    G[path] = callback;
}

app.prototype.get('login', function (req: any, res: any) {
    ejs.renderFile('views/login.ejs', {}, function (err, data) {
        res.end(data);
    });
});

app.prototype.get('user', function (req: any, res: any) {
    ejs.renderFile('views/user.ejs', {}, function (err, data) {
        res.end(data);
    });
});

app.prototype.get('dologin', function (req: any, res: any) {
    if (req.method == 'GET') {
        console.log('get');
        console.log(url.parse(req.url, true).query);
    } else if (req.method == 'POST') {
        var postStr = '';
        req.on('data', function (chunk: any) {
            postStr += chunk;
        });
        req.on('end', function (err: any, chunk: any) {
            console.log(postStr);
            fs.appendFile('login.txt', postStr + '\n', function (err: any) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('写入数据成功');
                }
            });
            res.end("<script>alert('登录成功'); history.back();</script>");
        });
    }
});

app.prototype.get('register', function (req: any, res: any) {
    ejs.renderFile('views/register.ejs', {}, function (err, data) {
        res.end(data);
    });
});

app.prototype.get('home', function (req: any, res: any) {
    var data = '后台数据';
    var list: Array<number> = [1, 2, 3, 4];

    ejs.renderFile('views/index.ejs', { msg: data, l: list }, function (err, data) {
        res.end(data);
    });
});

app.prototype.get('add', function (req: any, res: any) {
    if (req.method == 'GET') {
        console.log('get');
        console.log(url.parse(req.url, true).query);
    } else if (req.method == 'POST') {
        var postStr = '';
        req.on('data', function (chunk: any) {
            postStr += chunk;
        });
        req.on('end', function (err: any, chunk: any) {
            var param: any = {};
            postStr.split("&").forEach(element => {
                var key: string = element.split("=")[0];
                var value = element.split("=")[1];
                param[key] = value;
            });

            MongoClient.connect(dburl, { useNewUrlParser: true }, function (err, db) {
                if (err) throw err;
                var dbo = db.db("test");
                var myobj = { name: param['username'], age: param['age'], sex: param['sex'] };
                dbo.collection("user").insertOne(myobj, function (err, result) {
                    if (err) throw err;
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

app.prototype.get('getuser', function (req: any, res: any) {
    MongoClient.connect(dburl, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("test");
        dbo.collection("user").find().toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            ejs.renderFile('views/userlist.ejs', { list: result }, function (err, data) {
                res.end(data);
            });
            db.close();
        });
    });
});

app.prototype.get('del', function (req: any, res: any) {
    var postStr = '';
    req.on('data', function (chunk: any) {
        postStr += chunk;
    });
    req.on('end', function (err: any, chunk: any) {
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

app.prototype.get('edit', function (req: any, res: any) {
    MongoClient.connect(dburl, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("test");
        dbo.collection("user").find().toArray(function (err, result) {
            if (err) throw err;
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