import { 
    NextFunction,
    Request, 
    Response 
} from 'express';

export const logger = (req:Request, res:Response, next:NextFunction) => {
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