import * as path from 'path';
import { Request, Response, NextFunction} from 'express';

export const CLIENT_ROUTES = ['/edit/:id?', '/details/:id?', '/add', '/donate' , '/about'];

export function clientHandler (req: Request, res: Response, next: NextFunction) {
    res.sendFile(path.join(__dirname, '../public/index.html'))
};