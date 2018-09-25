"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("./logger");
const data_1 = require("./data");
const express = require("express");
class Server {
    constructor() {
        this.port = 3000;
        this.app = express();
    }
    run() {
        // logger
        this.app
            .use(logger_1.logger);
        //static
        this.app
            .use(express.static('../../../src/express/3-query/public'));
        this.app
            .get('/books', (req, res) => {
            if (req.query.limit > 0) {
                res.json(data_1.books.slice(0, req.query.limit));
            }
            else {
                res.json(data_1.books);
            }
        });
        this.app
            .listen(this.port, () => {
            console.log(`Express server listening on port ${this.port}`);
        });
    }
}
const server = new Server();
server.run();
//# sourceMappingURL=app-query.js.map