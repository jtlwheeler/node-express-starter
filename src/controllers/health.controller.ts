import { Request, Response } from 'express';

export let healthCheck = (req: Request, res: Response) => {
    res.json({ 'apiStatus': 'OK' });
};