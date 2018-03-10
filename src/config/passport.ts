import * as passport from 'passport';
import * as passportLocal from 'passport-local';
import User from '../models/User';
import config from './config';

const LocalStrategy = passportLocal.Strategy;

passport.use(new LocalStrategy({ usernameField: 'email' }, (email: string, password: string, done: Function) => {
    User.findOne({ email: email }, (err: any, user: any) => {
        if (err) {
            return done(err);
        }

        if (!user) {
            return done(undefined, false, { message: 'Email is not found.' });
        }

        user.comparePassword(password, (err: any, isMatch: boolean) => {
            if (err) {
                return done(err);
            }

            if (!isMatch) {
                return done(undefined, false);
            }

            return done(undefined, user);
        });
    });
})
);