"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
class Server {
    constructor() {
        this.port = 3000;
        this.app = express();
    }
    run() {
        this.app
            .use(express.static('../../../src/express/0-intro/public'));
        this.app
            .use((req, res) => {
            res.sendStatus(404);
        });
        this.app
            .listen(this.port, () => {
            console.log(`Express server listening on port ${this.port}`);
        });
    }
}
const server = new Server();
server.run();
//# sourceMappingURL=server-static.js.map