import * as Joi from 'joi';
import { Request } from 'express';

export let requestValidator = (req: Request, schema: any): any[] => {
    const result = Joi.validate(req, schema, { allowUnknown: true, abortEarly: false });
    if (result.error === null) {
        return undefined;
    }

    if (result.error.details) {
        return result.error.details.map(detail => { return { message: detail.message }; });
    }

    return undefined;
};