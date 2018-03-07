import * as Joi from 'joi';

export let ValidationSchema = {
    signUp: {
        body: {
            email: Joi.string().required().email(),
            password: Joi.string().required(),
            confirmPassword: Joi.string().required()
        }
    }
};
