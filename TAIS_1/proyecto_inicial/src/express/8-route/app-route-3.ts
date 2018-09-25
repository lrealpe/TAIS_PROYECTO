import { logger } from './logger';
import { Router } from './routes/books';
import express = require( 'express' );

class Server {
    private app: express.Express;
    private port: number = 3000;
    private router: Router;

    constructor() {
        this.app = express();
        this.router = new Router();
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
                    '../../../src/express/8-route/public'
                )
            );
        
        //books
        this.app
            .get(
                '/books', 
                this.router.routes
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
