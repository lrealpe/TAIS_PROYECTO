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
        this.app
            .use(logger_1.logger);
        this.app
            .use(express.static('../../../src/express/2-custom/public'));
        this.app
            .get('/books', (req, res) => {
            res.json(data_1.books);
        });
        this.app
            .listen(this.port, () => {
            console.log(`Express server listening on port ${this.port}`);
        });
    }
}
const server = new Server();
server.run();
//# sourceMappingURL=app-custom-2.js.map