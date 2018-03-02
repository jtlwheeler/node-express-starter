import 'jasmine';
import User, { UserModel } from '../../src/models/User';
import * as mongoose from 'mongoose';
import config from '../../src/config/config';
import { Chance } from 'chance';
const chance = new Chance();

describe('User model', function () {

    beforeAll(function () {
        return mongoose.connect(config.mongoUri);
    });

    afterAll(function () {
        return mongoose.disconnect();
    });

    it('save() should add new user to database', function () {
        const email = chance.email();
        const password = chance.string();

        const newUser = new User({
            email: email,
            password: password
        });

        return newUser.save()
            .then((user: UserModel) => {
                User.findOne({ email: email }, (error: any, user: any) => {
                    if (error) {
                        console.log(error);
                        throw error;
                    }

                    expect(user).toBeTruthy();
                    expect(user.email).toBe(email);
                    user.comparePassword(password, (error: Error, isMatch: boolean) => {
                        if (error) {
                            throw error;
                        }
                        expect(isMatch).toBe(true);
                    });
                });
            })
            .catch((error: any) => {
                fail(error);
            });
    });
});