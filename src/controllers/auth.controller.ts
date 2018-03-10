import { Request, Response } from 'express';
import User, { UserModel } from '../models/User';
import * as passport from 'passport';
import { IVerifyOptions } from 'passport-local';
import { NextFunction } from 'express-serve-static-core';
import * as HttpStatus from 'http-status-codes';
import { requestValidator } from './request-validator';
import { ParamValidation } from '../config/param-validation';

export let login = (request: Request, response: Response, next: NextFunction) => {
    const errors = requestValidator(request, ParamValidation.login);
    if (errors) {
        response.statusCode = HttpStatus.BAD_REQUEST;
        return response.send({ errors: errors });
    }

    passport.authenticate('local', (error: Error, user: UserModel, info: IVerifyOptions) => {
        if (error) {
            console.log(error);
            return response.sendStatus(HttpStatus.BAD_REQUEST);
        }

        if (!user) {
            response.statusCode = 400;
            return response.send({ errors: 'No user' });
        }

        return response.send();
    })(request, response, next);
};