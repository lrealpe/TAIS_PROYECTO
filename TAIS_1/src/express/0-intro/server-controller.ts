import express = require( 'express' );
import http = require( 'http' );

import { Controller } from './controller';

class Server {
    private app: express.Express;
    private port: number = 3000;

    constructor() {
        this.app = express();
    }

    run() {

        const controller: Controller = new Controller();

        this.app
            .use( 
                '/welcome', 
                controller.router
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

const websvr: Server =  new Server();
websvr.run();