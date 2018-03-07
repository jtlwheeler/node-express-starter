import { ValidationSchema } from '../config/param-validation';
import { Request, Response } from 'express';
import * as Joi from 'joi';

export let signUp = (request: Request, response: Response) => {
    const result = Joi.validate(request.body, ValidationSchema.signUp, { allowUnknown: true, abortEarly: false });
    if (result.error && result.error.details) {
        response.statusCode = 400;
        const errors = result.error.details.map(detail => { return { message: detail.message }; });
        return response.send({ errors: errors });
    }
};
