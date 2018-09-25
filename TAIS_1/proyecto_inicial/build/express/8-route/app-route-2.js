"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("./logger");
const books_1 = require("./routes/books");
const express = require("express");
class Server {
    constructor() {
        this.port = 3000;
        this.app = express();
        this.router = new books_1.Router();
    }
    run() {
        // logger
        this.app
            .use(logger_1.logger);
        //static
        this.app
            .use(express.static('../../../src/express/8-route/public'));
        //books
        this.app
            .get('/books', this.router.routes);
        // pre-condition
        this.app
            .param('category', (req, res, next) => {
            let category = req.params.category;
            if (category) {
                req.params.category = category[0].toUpperCase() + category.slice(1).toLowerCase();
            }
            next();
        });
        this.app
            .listen(this.port, () => {
            console.log(`Express server listening on port ${this.port}`);
        });
    }
}
const server = new Server();
server.run();
//# sourceMappingURL=app-route-2.js.map