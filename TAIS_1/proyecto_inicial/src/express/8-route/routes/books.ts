import { books } from '../data';
import express = require( 'express' );
import bodyParser= require( 'body-parser' );

export class Router {
    private port: number = 3000;
    private router: express.Router;

    private parseUrlEncoded = bodyParser.urlencoded({'extended':false});

    constructor() {
        this.router = express();
    }

    routes() {
        this.router
            .route(
                '/'
                )

    // GET books
            .get((req: express.Request, res: express.Response) => {
                if (req.query.limit > 0) {
                    res.json(books.slice(0, req.query.limit));
                }
                else {
                    res.json(books);
                }
            })

    // POST book
	        .post(this.parseUrlEncoded, (req: express.Request, res: express.Response) => {
                let newBook = req.body;
                newBook.id = books.length;
                books.push(newBook);

                res.status(201).send('<a href="/">Book created OK</a>');
            });

    // books by category
        this.router
            .route('/:category')
            .all((req: express.Request, res: express.Response, next:express.NextFunction) => {
                let category = req.params.category;
                if (category) {
                    req.params.category = category[0].toUpperCase() + category.slice(1).toLowerCase();
                }
                next();
                })
            .get(function(req: express.Request, res: express.Response) {
                if (req.params.category) {
                    let filtered = books.filter((book:any) => {
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
            });

        //delete
        this.router
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
            }
        
        }