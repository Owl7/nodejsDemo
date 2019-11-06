import * as url from 'url';
import * as ejs from 'ejs';
import * as fs from 'fs';

var G: any = [];

export function app(req: any, res: any) {

    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});

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

app.prototype.get('login', function(req: any, res: any) {
    ejs.renderFile('views/login.ejs', {}, function(err, data) {
        res.end(data);
    });
});

app.prototype.get('dologin', function(req: any, res: any) {
    if (req.method == 'GET') {
        console.log('get');
        console.log(url.parse(req.url, true).query);
    } else if (req.method == 'POST') {
        var postStr = '';
        req.on('data', function(chunk: any) {
            postStr += chunk;
        });
        req.on('end', function(err: any, chunk: any) {
            console.log(postStr);
            fs.appendFile('login.txt', postStr + '\n', function(err: any) {
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

app.prototype.get('register', function(req: any, res: any) {
    ejs.renderFile('views/register.ejs', {}, function(err, data) {
        res.end(data);
    });
});

app.prototype.get('home', function(req: any, res: any) {
    var data = '后台数据';
    var list:Array<number> = [1, 2, 3, 4];

    ejs.renderFile('views/index.ejs', {msg: data, l: list}, function(err, data) {
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