import * as fs from 'fs';
import * as url from 'url';
// path 模块
import * as path from 'path';

// 获取文件类型
function getMime(extname: string): string {
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

export function statics(req: any, res: any, staticpath: string) {

    var pathname: string | undefined = "";
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
        fs.readFile(staticpath + '/' + pathname, function(err, result) {
            if (err) {
                fs.readFile(staticpath + '/404.html', function(err, data404) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.writeHead(404, {'Content-Type': 'text/html'});
                        res.write(data404);
                        res.end();
                    }
                });
            } else {
                res.writeHead(200, {'Content-Type': getMime(extname)});
                res.write(result);
                res.end();
            }
        });
    }
}