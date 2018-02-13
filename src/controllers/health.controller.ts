import { Request, Response } from 'express';

export let healthCheck = (req: Request, res: Response) => {
    res.send('OK');
};