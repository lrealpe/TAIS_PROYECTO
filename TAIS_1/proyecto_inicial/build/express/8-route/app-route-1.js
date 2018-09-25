"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("./logger");
const data_1 = require("./data");
const bodyParser = require("body-parser");
const express = require("express");
class Server {
    constructor() {
        this.port = 3000;
        this.parseUrlEncoded = bodyParser.urlencoded({ 'extended': false });
        this.app = express();
    }
    run() {
        // logger
        this.app
            .use(logger_1.logger);
        this.app
            .use(express.static('../../../src/express/8-route/public'));
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
            .route('/books')
            .get((req, res) => {
            if (req.query.limit > 0) {
                res.json(data_1.books.slice(0, req.query.limit));
            }
            else {
                res.json(data_1.books);
            }
        })
            // POST book
            .post(this.parseUrlEncoded, (req, res) => {
            let newBook = req.body;
            newBook.id = data_1.books.length;
            data_1.books.push(newBook);
            res.status(201).send('<a href="/">Book created OK</a>');
        });
        // books by category
        this.app
            .route('/books/:category')
            .get((req, res) => {
            if (req.params.category) {
                let filtered = data_1.books.filter((book) => {
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
        //delete
        this.app
            .get('/delete/:id', (req, res) => {
            if (req.params.id) {
                data_1.books.filter(book => book.id != req.params.id);
                res.status(200).send('<a href="/">Book deleted OK</a>');
            }
            else {
                res.status(400).send('Must specify book id');
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
//# sourceMappingURL=app-route-1.js.map