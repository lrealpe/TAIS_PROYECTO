"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = (req, res, next) => {
    let start = +new Date();
    let stream = process.stdout;
    res.on('finish', () => {
        let elapsed = +new Date() - start;
        stream.write(`
            ${req.method} ${req.url} - ${elapsed}ms (${req.params.id})
        `);
    });
    // !important
    next();
};
//# sourceMappingURL=logger.js.map