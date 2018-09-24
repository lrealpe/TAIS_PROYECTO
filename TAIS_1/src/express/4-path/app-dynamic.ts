import { logger } from './logger';
import { books } from './data';
import express = require( 'express' );

class Server {
    private app: express.Express;
    private port: number = 3000;

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
                    '../../../src/express/4-path/public'
                )
            );
        
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

            this.app
            .get(
                '/books/:category', 
                (req: express.Request, res: express.Response) => {
                    if (req.params.category) {
                        let filtered = books.filter(function(book) {
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
