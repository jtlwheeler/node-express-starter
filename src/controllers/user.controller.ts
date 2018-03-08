import { ParamValidation } from '../config/param-validation';
import { Request, Response } from 'express';
import { requestValidator } from './request-validator';
import User, { UserModel } from '../models/User';
import * as HttpStatus from 'http-status-codes';


export let signUp = (request: Request, response: Response) => {
    const errors = requestValidator(request, ParamValidation.signUp);
    if (errors) {
        response.statusCode = HttpStatus.BAD_REQUEST;
        return response.send({ errors: errors });
    }

    const user = new User({
        email: request.body.email,
        password: request.body.password
    });

    User.findOne({ email: request.body.email }, (err: any, existingUser: UserModel) => {
        if (err) {
            response.statusCode = HttpStatus.BAD_REQUEST;
            return response.send();
        }

        if (existingUser) {
            response.statusCode = HttpStatus.BAD_REQUEST;
            return response.send({ errors: [{ message: 'User already exists' }] });
        }

        user.save((err: any) => {
            if (err) {
                response.statusCode = HttpStatus.BAD_REQUEST;
                return response.send();
            }

            response.send();
        });
    });
};
