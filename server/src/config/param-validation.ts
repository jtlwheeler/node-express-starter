import * as Joi from 'joi';

export interface ValidationSchema {
    body?: { };
}

export const ParamValidation = {
    signUp: {
        body: {
            email: Joi.string().required().email(),
            password: Joi.string().required(),
            confirmPassword: Joi.string().valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: 'must match \"password\"' } } })
        }
    },
    login: {
        body: {
            email: Joi.string().required().email(),
            password: Joi.string().required()
        }
    }
};
