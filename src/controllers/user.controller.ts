import { ValidationSchema } from '../config/param-validation';
import { Request, Response } from 'express';
import { requestValidator } from './request-validator';

export let signUp = (request: Request, response: Response) => {
    const errors = requestValidator(request, ValidationSchema.signUp);
    if (errors) {
        response.statusCode = 400;
        return response.send({ errors: errors });
    }
};
