import 'jasmine';
import User, { UserModel } from '../../src/models/User';
import * as mongoose from 'mongoose';
import config from '../../src/config/config';
import { Chance } from 'chance';
import * as bluebird from 'bluebird';
const chance = new Chance();

describe('User model', function () {
    let email: string;
    let password: string;
    let newUser: any;

    beforeEach(function () {
        email = chance.email();
        password = chance.string();

        newUser = new User({
            email: email,
            password: password
        });
    });

    beforeAll(function () {
        (<any>mongoose).Promise = bluebird;
        return mongoose.connect(config.mongoUri);
    });

    afterAll(function () {
        return mongoose.disconnect();
    });

    it('save() should add new user to database', function () {
        return newUser.save()
            .then((user: UserModel) => {
                return User.findOne({ email: email }, (error: any, user: any) => {
                    if (error) {
                        throw error;
                    }

                    expect(user).toBeTruthy();
                    expect(user.email).toBe(email);
                });
            });
    });

    it('comparePassword() should return false when wrong password is entered', function () {
        return newUser.save()
            .then((user: UserModel) => {
                return User.findOne({ email: email }, (error: any, user: any) => {
                    if (error) {
                        console.log(error);
                        throw error;
                    }
                    user.comparePassword('wrongPassword', (error: Error, isMatch: boolean) => {
                        if (error) {
                            throw error;
                        }

                        expect(isMatch).toBe(false);
                    });
                });
            });
    });
});