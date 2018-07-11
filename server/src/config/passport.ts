import * as passport from 'passport';
import * as passportLocal from 'passport-local';
import User from '../models/User';

const LocalStrategy = passportLocal.Strategy;

passport.use(new LocalStrategy({usernameField: 'email'}, (email: string, password: string, done: Function) => {
        User.findOne({email: email}, (error: any, user: any) => {
            if (error) {
                return done(error);
            }

            if (!user) {
                return done(undefined, false, {message: `Email ${email} is not found.`});
            }

            user.comparePassword(password, (error: any, isMatch: boolean) => {
                if (error) {
                    return done(error);
                }

                if (!isMatch) {
                    return done(undefined, false, {message: 'Invalid email or password.'});
                }

                return done(undefined, user);
            });
        });
    })
);