import 'jasmine';
import User, { UserModel } from '../../src/models/User';
import config from '../../src/config/config';
import { Chance } from 'chance';
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
            .then(done)
            .catch((error: any) => done.fail(error));
    });

    it('comparePassword() should return false when wrong password is entered and true if correct password is enter', function (done) {
        this.newUser.save()
            .then((user: UserModel) => {
                User.findOne({ email: this.email }, (error: any, user: any) => {
                    if (error) {
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
            .then(done)
            .catch((error: any) => done.fail(error));
    });
});