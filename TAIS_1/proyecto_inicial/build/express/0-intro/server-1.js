"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
class Server {
    constructor() {
        this.app = express();
    }
    run() {
        this.app
            .get('/', //Abrir server socket...
        (req, res, next) => {
            res.send(//Manda contenido
            '<h1>Express</h1>Welcome to Express');
        });
        this.app
            .use((req, res) => {
            res.sendStatus(//Manda un estatus, en este caso Not found
            404);
        });
        const server = this.app //método asíncrono
            .listen(//arrancar el servidor
        3000, //puerto
        () => {
            const port = server.address().port;
            console.log(`Express server listening on port ${port}`);
        });
    }
}
const websvr = new Server();
websvr.run();
//# sourceMappingURL=server-1.js.map