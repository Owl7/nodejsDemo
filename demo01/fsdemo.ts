import * as fs from 'fs';

// fs.stat('package.json', function(err, stats){
//     if (err) {
//         console.log(err);
//         return false;
//     }

//     console.log(stats.isFile());
//     console.log(stats.isDirectory());
// });

// fs.mkdir('css', function(err){
//     if (err) {
//         console.log(err);
//         return false;
//     }
//     console.log('创建文件成功')
// });

// // 写入文件
// fs.writeFile('t.txt', 'Hahahahah', 'utf8', function(err) {
//     if (err) {
//         console.log(err);
//         return false;
//     }
//     console.log('写入文件成功')
// });

// // 追加文件
// fs.appendFile('t1.txt', '写入的内容', function(err) {
//     if (err) {
//         console.log(err);
//         return false;
//     }
//     console.log('写入成功')
// });

// // 读取文件
// fs.readFile('index.txt', function(err, data) {
//     if (err) {
//         console.log(err);
//         return;
//     }
//     console.log('读取文件成功 ' + data.toString());
// });

// // 读取目录
// fs.readdir('html', function(err, data) {
//     if (err) {
//         console.log(err);
//         return false;
//     }
//     console.log('写入目录成功' + data);
// });

// // 重命名
// fs.rename('html/index.html', 'html/news.html', function(err) {
//     if (err) {
//         console.log(err);
//         return false;
//     }
//     console.log('修改成功');
// });

// // 删除目录
// fs.rmdir('t', function(err) {
//     if (err) {
//         console.log(err);
//         return false;
//     }
//     console.log('删除成功');
// });

// // 删除文件
// fs.unlink('t', function(err) {
//     if (err) {
//         console.log(err);
//         return false;
//     }
//     console.log('删除成功');
// });

// // 判断服务器上有没有uploadmul，没有就创建
// fs.stat('upload', function(err, stats) {
//     if (err) { /* 没有这个目录 */
//         fs.mkdir('upload', function(err1) {
//             if (err1) {
//                 console.log(err1);
//                 return false;
//             }
//             console.log('创建成功');
//         });
//     } else {
//         console.log('目录存在');
//     }
// });

// // 找到文件夹下所有目录
// var filesArrs: Array<String> = [];
// fs.readdir('html', function(err, files) {
//     if (err) {
//         console.log(err);
//     } else { /* 判断是目录还是文件夹 */
//         (function getFile(i) {
//             if (i == files.length) {
//                 console.log('目录 ');
//                 console.log(filesArrs);
//                 return false;
//             }

//             fs.stat('html/' + files[i], function(err, stats) {
//                 if (err) {
//                     console.log(err);
//                 } else {
//                     if (stats.isDirectory()) {
//                         filesArrs.push(files[i]);
//                     }
//                 }
//                 getFile(++i);
//             });
//         })(0);
//     }
// });

// 读取流
// var readStream = fs.createReadStream('package.json');

// var str: string = '' // 保存数据
// var count = 0; // 次数
// readStream.on('data', function(chunk) {
//     str += chunk;
//     count ++;
// });

// // 读取完成
// readStream.on('end', function(chunk) {
//     console.log(str);
//     console.log(count);
// });

// // 读取失败
// readStream.on('error', function(err) {
//     console.log(err);
// });

// // 写入流
// let data = 'var writerStream = fs.createWriteStreamvar writerStream = fs.createWriteStream';
// var writerStream = fs.createWriteStream('output.txt');

// writerStream.write(data, 'utf8');

// // 标记写入完成
// writerStream.end();

// writerStream.on('finish', function() {
//     console.log('写入完成');
// });

// writerStream.on('error', function() {
//     console.log('写入失败');
// });

// 管道流

// 读流
let readerStream = fs.createReadStream('input.txt');

// 写流
let writerStream = fs.createWriteStream('output.txt');

// 管道操作
readerStream.pipe(writerStream);

console.log('执行完毕');