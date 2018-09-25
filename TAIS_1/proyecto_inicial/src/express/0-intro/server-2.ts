import express = require( 'express' );
import http = require( 'http' );
import net = require( 'net' );

class Server {
    private app: express.Express;

    constructor() {
        this.app = express();
    }

    run() {
        this.app
            .get( 
                '/', 
                (req: express.Request, res: express.Response, next: express.NextFunction) => {
                    const books = [
                        '<h1>NodeJS</h1>',  
                        'ExpressJS', 
                        'AngularJS',
                    ];
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

        const server: http.Server = this.app
            .listen( 
                3000, 
                () => {
                    const port: number = (server.address() as net.AddressInfo).port;
                    console.log( 
                        `Express server listening on port ${port}`
                    );
                }
            );
    }
}

const websvr: Server =  new Server();
websvr.run();