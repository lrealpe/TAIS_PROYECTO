"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class Controller {
    constructor() {
        this._router = express_1.Router();
        this._router
            .get('/', (req, res, next) => {
            const books = [
                'MongoDB',
                'ExpressJS',
                'AngularJS',
                'NodeJS',
            ];
            res.send(books);
        });
        this._router
            .get('/:name', (req, res, next) => {
            const params = req.params;
            res.send(`Hello, ${params.name}!`);
        });
    }
    get router() {
        return this._router;
    }
}
exports.Controller = Controller;
//# sourceMappingURL=controller.js.map