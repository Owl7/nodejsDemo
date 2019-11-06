import * as ejs from 'ejs';
import * as url from 'url';
import * as fs from 'fs';

var app: any = {
    // login
    login: function(req: any, res: any) {
        ejs.renderFile('views/login.ejs', {}, function(err, data) {
            res.end(data);
        });
    },
    dologin: function(req: any, res: any) {
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
    },
    register: function(req: any, res: any) {
        ejs.renderFile('views/register.ejs', {}, function(err, data) {
            res.end(data);
        });
    },
    home: function(req: any, res: any) {
        var data = '后台数据';
        var list:Array<number> = [1, 2, 3, 4];

        ejs.renderFile('views/index.ejs', {msg: data, l: list}, function(err, data) {
            res.end(data);
        });
    }
}

export { app };