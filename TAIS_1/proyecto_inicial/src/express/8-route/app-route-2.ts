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