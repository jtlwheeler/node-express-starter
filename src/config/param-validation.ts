import * as Joi from 'joi';

export let ValidationSchema = {
    signUp: {
        body: {
            email: Joi.string().required()
        }
    }
};
