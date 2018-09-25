import { 
    NextFunction,
    Router, 
    Request, 
    Response 
} from 'express';

export class Controller {

    private _router: Router;

    constructor() {
        this._router = Router();

        this._router
            .get( 
                '/', 
                (req: Request, res: Response, next: NextFunction) => {
                    const books = [
                        'MongoDB',
                        'ExpressJS', 
                        'AngularJS',
                        'NodeJS',  
                    ];
                    res.send( 
                        books
                    );
                }
            );
        
        this._router
            .get(
                '/:name', 
                (req: Request, res: Response, next: NextFunction) => {
                    const params: any = req.params;

                    res.send(
                        `Hello, ${params.name}!`
                    );
                }
            );
    }

    get router() {
        return this._router;
    }
}