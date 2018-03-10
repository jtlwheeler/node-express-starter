import * as Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { ValidationSchema } from '../config/param-validation';

export let requestValidator = (schemaToValidate: ValidationSchema) => {
    return function (request: Request, response: Response, next: NextFunction) {
        const result = Joi.validate(request, schemaToValidate, { allowUnknown: true, abortEarly: false });
        if (result.error === null) {
            return next();
        }

        if (result.error.details) {
            const errors = getErrorMessages(result);
            response.statusCode = 400;
            return response.send({ errors: errors });
        }

        return next();
    };
};

const getErrorMessages = (result: Joi.ValidationResult<Request>) => {
    return result.error.details.map(detail => { return { message: detail.message }; });
};