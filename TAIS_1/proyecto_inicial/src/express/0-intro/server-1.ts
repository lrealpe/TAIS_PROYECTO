import express = require( 'express' );
import http = require( 'http' );
import net = require( 'net' );

class Server {
    private app: express.Express; //Aplicación en express

    constructor() {
        this.app = express();
    }

    run() {
        this.app
            .get( 
                '/', //Abrir server socket...
                (req: express.Request, res: express.Response, next: express.NextFunction) => {
                    res.send( //Manda contenido
                        '<h1>Express</h1>Welcome to Express' 
                    );
                }
            );

        this.app
            .use( 
                (req: express.Request, res: express.Response) => {
                    res.sendStatus( //Manda un estatus, en este caso Not found
                        404 
                    ); 
                }
            );

        const server: http.Server = this.app //método asíncrono
            .listen( //arrancar el servidor
                3000, //puerto
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