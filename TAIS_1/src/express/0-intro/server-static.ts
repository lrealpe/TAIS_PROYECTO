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
                express.static(
                    '../../../src/express/0-intro/public'
                )
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