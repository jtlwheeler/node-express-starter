import * as Joi from 'joi';

export let ValidationSchema = {
    signUp: {
            email: Joi.string().required().email(),
            password: Joi.string().required(),
            confirmPassword: Joi.string().required()
    }
};
