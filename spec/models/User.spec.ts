import 'jasmine';
import User, { UserModel } from '../../src/models/User';
import * as mongoose from 'mongoose';
import config from '../../src/config/config';
import { Chance } from 'chance';
import * as bluebird from 'bluebird';
const chance = new Chance();

describe('User model', function () {
    beforeEach(function () {
        this.email = chance.email();
        this.password = 'password';

        this.newUser = new User({
            email: this.email,
            password: this.password
        });
    });

    beforeAll(function (done) {
        (<any>mongoose).Promise = bluebird;
        mongoose.connect(config.mongoUri)
            .then(done, done.fail);
    });

    it('save() should add new user to database', function (done) {
        this.newUser.save()
            .then((user: UserModel) => {
                User.findOne({ email: this.email }, (error: any, user: any) => {
                    if (error) {
                        throw error;
                    }

                    expect(user).toBeTruthy();
                    expect(user.email).toBe(this.email);
                });
            })
            .then(done, done.fail);
    });

    it('comparePassword() should return false when wrong password is entered and true if correct password is enter', function (done) {
        this.newUser.save()
            .then((user: UserModel) => {
                User.findOne({ email: this.email }, (error: any, user: any) => {
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

                    user.comparePassword(this.password, (error: Error, isMatch: boolean) => {
                        if (error) {
                            throw error;
                        }

                        expect(isMatch).toBe(true);
                    });
                });
            })
            .then(done, done.fail);
    });
});