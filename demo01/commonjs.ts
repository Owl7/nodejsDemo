import * as http from "http";
import { SimpleDateFormat, DATE_FORMATTER } from 'myjs-common';

const app = http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'text/plan'});
    let date = SimpleDateFormat.formatDate(new Date(), DATE_FORMATTER.SECONDS_FORMAT);
    res.write('Hello World ' + date);
    res.end();
}).listen(8000);