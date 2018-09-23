"use strict";
module.exports = function (req, res, next) {
    let start = +new Date();
    let stream = process.stdout;
    res.on('finish', function () {
        let elapsed = +new Date() - start;
        stream.write(`
            ${req.method} ${req.url} - ${elapsed}ms
        `);
    });
    // !important
    next();
};
//# sourceMappingURL=logger.js.map