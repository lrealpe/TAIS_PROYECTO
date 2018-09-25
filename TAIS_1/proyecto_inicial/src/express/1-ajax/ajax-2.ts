import express = require( 'express' );
import { books } from './data';

class Server {
    private app: express.Express;
    private port: number = 3000;

    constructor() {
        this.app = express();
    }

    run() {
        this.app
            .use( 
                express.static(
                    '../../../src/express/1-ajax/public'
                )
            );

        this.app
            .get(
                '/books', 
                (req: express.Request, res: express.Response) => {
                    res.send(
                        books
                    );
                }
            );
            
        this.app
            .use( 
                (req: express.Request, res: express.Response) => {
                    res.sendStatus( 
                        404 
                    ); 
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