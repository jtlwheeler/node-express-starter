import * as passport from 'passport';
import * as passportLocal from 'passport-local';
import User from '../models/User';
import { logger } from './logger';

const LocalStrategy = passportLocal.Strategy;

passport.use(new LocalStrategy({usernameField: 'email'}, (email: string, password: string, done: Function) => {
        User.findOne({email: email}, (error: any, user: any) => {
            if (error) {
                logger.error(`Finding user ${email}: ${error}`);
                return done(error);
            }

            if (!user) {
                return done(undefined, false, {message: `Email ${email} is not found.`});
            }

            user.comparePassword(password, (error: any, isMatch: boolean) => {
                if (error) {
                    logger.error(`Comparing password ${error}`);
                    return done(error);
                }

                if (!isMatch) {
                    const message = 'Invalid email or password.';
                    logger.info(message);
                    return done(undefined, false, {message: message});
                }

                return done(undefined, user);
            });
        });
    })
);