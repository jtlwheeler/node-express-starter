import { AccessToken } from './AccessToken';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';

export default class AuthToken {
    generateToken(email: string): AccessToken {
        const token = jwt.sign({
                email: email,
            },
            config.jwtSecret,
            {expiresIn: '30d'});

        return {
            accessToken: token
        };
    }
}