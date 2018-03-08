import 'jasmine';
import * as supertest from 'supertest';
import * as app from '../../src/app';
import { Chance } from 'chance';
const chance = new Chance();

const SIGN_UP_PATH = '/api/user/signUp/';

describe(`POST ${SIGN_UP_PATH}`, function () {
    it('should return 400 and errors when email address is not passed', function (done) {
        supertest(app).post(SIGN_UP_PATH)
            .expect(400)
            .end((error: any, response: any) => {
                if (error) {
                    throw error;
                }

                expect(response.body.errors).toBeTruthy();
                expect(response.body.errors[0].message).toContain('email');
                expect(response.body.errors.length).toBeGreaterThanOrEqual(1);
                done();
            });
    });

    it('should return 400 and errors with messages when required fields are not passed', function (done) {
        supertest(app).post(SIGN_UP_PATH)
            .expect(400)
            .end((error: any, response: any) => {
                if (error) {
                    throw error;
                }

                expect(response.body.errors).toBeTruthy();
                expect(response.body.errors.length).toBeGreaterThanOrEqual(3);
                done();
            });
    });

    it('should return 200 when required fields are passed', function (done) {
        const password = chance.string();
        const body = {
            email: chance.email(),
            password: password,
            confirmPassword: password
        };

        supertest(app).post(SIGN_UP_PATH)
            .send(body)
            .expect(200)
            .end((error: any, response: any) => {
                if (error) {
                    throw error;
                }

                done();
            });
    });
});