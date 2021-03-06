import { Request, Response } from 'express';
import User, { UserModel } from '../models/User';
import * as HttpStatus from 'http-status-codes';
import { logger } from '../config/logger';

export let signUp = async (request: Request, response: Response) => {
    const user = new User({
        email: request.body.email,
        password: request.body.password
    });

    User.findOne({email: request.body.email}, async (err: any, existingUser: UserModel) => {
        if (err) {
            logger.error(err);
            response.statusCode = HttpStatus.BAD_REQUEST;
            return response.send();
        }

        if (existingUser) {
            const message = `User ${request.body.email} already exists`;
            logger.info(message);
            response.statusCode = HttpStatus.BAD_REQUEST;
            return response.send({errors: [{message: message}]});
        }

        try {
            await user.save();
            response.send();
        } catch (error) {
            logger.error(`Error saving user ${request.body.email}: ${err}`);
            response.statusCode = HttpStatus.BAD_REQUEST;
            return response.send();
        }
    });
};
