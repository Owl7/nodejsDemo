import * as ejs from 'ejs';

var app: any = {
    // login
    login: function(req: any, res: any) {
        ejs.renderFile('views/login.ejs', {}, function(err, data) {
            res.end(data);
        });
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