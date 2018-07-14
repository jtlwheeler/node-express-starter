import { Request, Response } from 'express';
import { UserModel } from '../models/User';
import * as passport from 'passport';
import { IVerifyOptions } from 'passport-local';
import { NextFunction } from 'express-serve-static-core';
import * as HttpStatus from 'http-status-codes';
import AuthToken from '../auth/AuthToken';

const authToken = new AuthToken();

export let login = (request: Request, response: Response, next: NextFunction) => {
    passport.authenticate('local', (error: Error, user: UserModel, info: IVerifyOptions) => {
        if (error) {
            return response.sendStatus(HttpStatus.BAD_REQUEST);
        }

        if (!user) {
            response.statusCode = 400;
            return response.send({errors: [{message: info.message}]});
        }

        const token = authToken.generateToken(request.body.email);
        return response.send({token: token.accessToken});
    })(request, response, next);
};

export let secret = (request: Request, response: Response) => {
    return response.send({success: true});
};