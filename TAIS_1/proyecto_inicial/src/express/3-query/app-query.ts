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
                    '../../../src/express/3-query/public'
                )
            );

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