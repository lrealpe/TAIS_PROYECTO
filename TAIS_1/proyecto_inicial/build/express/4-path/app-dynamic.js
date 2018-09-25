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
            .use(express.static('../../../src/express/4-path/public'));
        //books
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
            .get('/books/:category', (req, res) => {
            if (req.params.category) {
                let filtered = data_1.books.filter(function (book) {
                    return book.category === req.params.category;
                });
                if (filtered.length > 0) {
                    res.json(filtered);
                }
                else {
                    res.status(404).json(`No books found for category '${req.params.category}'`);
                }
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
//# sourceMappingURL=app-dynamic.js.map