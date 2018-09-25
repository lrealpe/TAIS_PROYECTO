"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
class Server {
    constructor() {
        this.app = express();
    }
    run() {
        this.app
            .get('/', (req, res, next) => {
            const books = [
                '<h1>NodeJS</h1>',
                'ExpressJS',
                'AngularJS',
            ];
            res.send(books);
        });
        this.app
            .use((req, res) => {
            res.sendStatus(404);
        });
        const server = this.app
            .listen(3000, () => {
            const port = server.address().port;
            console.log(`Express server listening on port ${port}`);
        });
    }
}
const websvr = new Server();
websvr.run();
//# sourceMappingURL=server-2.js.map