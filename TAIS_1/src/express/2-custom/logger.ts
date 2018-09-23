export const logger=  function(req:any, res:any, next:any) {
    let start = +new Date();
    let stream = process.stdout;

    res.on('finish', function() {
        let elapsed = +new Date() - start;
        stream.write(`
            ${req.method} ${req.url} - ${elapsed}ms
        `);
    });

    // !important
    next();
};
