"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const controller_1 = require("./controller");
class Server {
    constructor() {
        this.port = 3000;
        this.app = express();
    }
    run() {
        const controller = new controller_1.Controller();
        this.app
            .use('/welcome', controller.router);
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
const websvr = new Server();
websvr.run();
//# sourceMappingURL=server-controller.js.map