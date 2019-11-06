"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getMime(extname) {
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
exports.getMime = getMime;
