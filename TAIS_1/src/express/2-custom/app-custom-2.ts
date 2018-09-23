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
        this.app
        .use(
            logger
        );

        this.app
            .use( 
                express.static(
                    '../../../src/express/2-custom/public'
                )
            );

        this.app
            .get(
                '/books', 
                (req: express.Request, res: express.Response) => {
                    res.json(
                        books
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