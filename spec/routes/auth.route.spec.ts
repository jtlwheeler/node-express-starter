import 'jasmine';
import * as supertest from 'supertest';
import { Chance } from 'chance';
import User from '../../src/models/User';
import * as HttpStatus from 'http-status-codes';
import * as app from '../../src/app';
const chance = new Chance();

describe('GET /api/auth/login', function () {
    it('should return 200 when valid email and password are passed', function (done) {
        const email = chance.email();
        const password = chance.string();
        const body = {
            email: email,
            password: password,
        };

        const user = new User({ email: email, password: password });
        user.save((errors: any) => {
            if (errors) {
                done.fail(errors);
            }

            supertest(app).post('/api/auth/login')
                .send(body)
                .expect(HttpStatus.OK)
                .end((error: any, response: any) => {
                    if (error) {
                        done.fail(error);
                    }

                    expect(response.body.errors).toBe(undefined);
                    done();
                });
        });
    });

    it('should return 400 when email and password are missing', function (done) {
        supertest(app).post('/api/auth/login')
            .expect(HttpStatus.BAD_REQUEST)
            .end((error: any, response: any) => {
                if (error) {
                    done.fail(error);
                }

                expect(response.body.errors).toBeTruthy();
                done();
            });
    });
});