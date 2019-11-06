import * as http from 'http';

import * as newRouter from './model/newrouter';
import * as router from './model/test-express-router';

http.createServer(router.app).listen(8000);

// res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});

//     var pathname: string = ""
//     if (req.url != null) {
//         var originalPath = url.parse(req.url).pathname;
//         if (originalPath != null) { 
//             pathname = originalPath.replace('/', '');
//         }
//     }

//     if (pathname != 'favicon.ico') {
//         try {
//             newRouter.app[pathname](req, res);
//         } catch (error) {
//             console.log(error);
//             newRouter.app['home'](req, res);
//         }
//     }