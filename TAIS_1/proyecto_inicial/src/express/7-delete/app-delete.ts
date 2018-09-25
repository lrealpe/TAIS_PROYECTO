import { logger } from './logger';
import { books } from './data';
import bodyParser= require( 'body-parser' );
import express = require( 'express' );

class Server {
    private app: express.Express;
    private port: number = 3000;
    private parseUrlEncoded = bodyParser.urlencoded({'extended':false});

    constructor() {
        this.app = express();
    }

    run() {
        // logger
        this.app
            .use(
                logger
                );
        
        //static
        this.app
            .use( 
                express.static(
                    '../../../src/express/7-delete/public'
                )
            );

        // pre-condition
        this.app
            .param('category', 
            (req: express.Request, res: express.Response, next: express.NextFunction) => {
                let category = req.params.category;
                if (category) {
                    req.params.category = category[0].toUpperCase() + category.slice(1).toLowerCase();
            }
            next(); 
        });

                
        //books
        this.app
            .get(
                '/books', 
                (req: express.Request, res: express.Response) => {
                    if (req.query.limit > 0) {
                        res.json(books.slice(0, req.query.limit));
                    }
                    else {
                        res.json(books);
                    }
                }
            );


        // POST book
        this.app
            .post('/books', this.parseUrlEncoded, (req: express.Request, res: express.Response) => {
                let newBook = req.body;
                newBook.id = books.length;
                books.push(newBook);
                res.status(201).send('<a href="/">Book created OK</a>');
            });

        //Books by category 
        this.app
            .get(
                '/books/:category', 
                (req: express.Request, res: express.Response) => {
                    if (req.params.category) {
                        let filtered = books.filter((book) => {
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
                        res.json(books);
                        }
                    }
        );

        //delete
        this.app
            .get(
                '/delete/:id',
                (req: express.Request, res: express.Response) => {
                    if (req.params.id) {
                        books.filter(book => book.id != req.params.id);
                        res.status(200).send('<a href="/">Book deleted OK</a>');
                    }
                    else {
                        res.status(400).send('Must specify book id');
                    }
                });

        this.app
            .listen( 
                this.port, 
                   () => {
                    console.log( 
                    `Express server listening on port ${this.port}`
                    );
                }                
            );
        }
    }
    const server: Server =  new Server();
    server.run();