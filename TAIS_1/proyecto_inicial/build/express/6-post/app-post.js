"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("./logger");
const data_1 = require("./data");
const bodyParser = require("body-parser");
const express = require("express");
class Server {
    constructor() {
        this.port = 3000;
        this.parseUrlEncoded = bodyParser.urlencoded({ 'extended': true });
        this.app = express();
    }
    run() {
        // logger
        this.app
            .use(logger_1.logger);
        //static
        this.app
            .use(express.static('../../../src/express/6-post/public'));
        // pre-condition
        this.app
            .param('category', (req, res, next) => {
            let category = req.params.category;
            if (category) {
                req.params.category = category[0].toUpperCase() + category.slice(1).toLowerCase();
            }
            next();
        });
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
        // POST book
        this.app
            .post('/books', this.parseUrlEncoded, (req, res) => {
            let newBook = req.body;
            data_1.books.push(newBook);
            res.status(201).send('<a href="/">Book created OK</a>');
        });
        //Books by category 
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
//# sourceMappingURL=app-post.js.map