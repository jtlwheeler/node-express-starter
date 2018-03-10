import * as Joi from 'joi';
import { Request } from 'express';
import { ValidationSchema } from '../config/param-validation';

export let requestValidator = (request: Request, schemaToValidate: ValidationSchema): any[] => {
    const result = Joi.validate(request, schemaToValidate, { allowUnknown: true, abortEarly: false });
    if (result.error === null) {
        return undefined;
    }

    if (result.error.details) {
        return result.error.details.map(detail => { return { message: detail.message }; });
    }

    return undefined;
};