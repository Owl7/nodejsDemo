import *as http from 'http';
import *as fs from 'fs';

const app = http.createServer(function(req, res) {

    var pathname = req.url;
    console.log(pathname);
    if (pathname == "/") {
        pathname = 'index.html';
    }

    if (pathname != '/favicon.ico') {
        fs.readFile('html/' + pathname, function(err, result) {
            if (err) {
                console.log('404');
            } else {
                
            }
        });
    }

    res.writeHead(200, {'Content-Type': 'text/plan'});
    res.write('Hello HAHAHAAHA');
    res.end();
}).listen(8000);