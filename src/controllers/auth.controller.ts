import { Request, Response } from 'express';
import User, { UserModel } from '../models/User';
import * as passport from 'passport';
import { IVerifyOptions } from 'passport-local';
import { NextFunction } from 'express-serve-static-core';
import * as HttpStatus from 'http-status-codes';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';

export let login = (request: Request, response: Response, next: NextFunction) => {
    passport.authenticate('local', (error: Error, user: UserModel, info: IVerifyOptions) => {
        if (error) {
            return response.sendStatus(HttpStatus.BAD_REQUEST);
        }

        if (!user) {
            response.statusCode = 400;
            return response.send({ errors: info.message });
        }

        const token = jwt.sign({ email: request.body.email },
            config.jwtSecret);
        return response.send({ token });
    })(request, response, next);
};

export let secret = (request: Request, response: Response) => {
    return response.send({ success: true } );
};