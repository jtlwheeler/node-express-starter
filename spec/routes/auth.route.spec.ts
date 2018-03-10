import 'jasmine';
import * as supertest from 'supertest';
import { Chance } from 'chance';
import User, { UserModel } from '../../src/models/User';
import * as HttpStatus from 'http-status-codes';
import * as app from '../../src/app';
import * as jwt from 'jsonwebtoken';
import { insertUser } from '../helpers/insertUser';
const chance = new Chance();

const LOGIN_PATH = '/api/auth/login';

describe(`POST ${LOGIN_PATH}`, function () {
    it('should return 200 when valid email and password are passed', function (done) {
        const email = chance.email();
        const password = 'password';
        const body = {
            email: email,
            password: password,
        };

        insertUser(email, password)
            .then(() => {
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
            })
            .catch((error: any) => {
                done.fail(error);
            });
    });


    it('should return 400 when email and password are missing', function (done) {
        supertest(app).post(LOGIN_PATH)
            .expect(HttpStatus.BAD_REQUEST)
            .end((error: any, response: any) => {
                if (error) {
                    done.fail(error);
                }

                expect(response.body.errors).toBeTruthy();
                done();
            });
    });

    it('should return 400 when incorrect password is entered', function (done) {
        const email = chance.email();
        const password = 'password';

        insertUser(email, password)
            .then((user: UserModel) => {
                const body = {
                    email: email,
                    password: 'wrongPassword'
                };

                supertest(app).post(LOGIN_PATH)
                    .send(body)
                    .expect(400)
                    .end((error: any, response: any) => {
                        if (error) {
                            done.fail(error);
                        }

                        expect(response.body.errors).toBeTruthy();
                        done();
                    });
            })
            .catch((error: any) => {
                done.fail(error);
            });
    });

    it('should return 200 with JWT when valid email and password are passed', function (done) {
        const email = chance.email();
        const password = 'password';

        insertUser(email, password)
            .then((user: UserModel) => {
                const body = {
                    email: email,
                    password: password
                };

                supertest(app).post(LOGIN_PATH)
                    .send(body)
                    .expect(200)
                    .end((error: any, response: any) => {
                        if (error) {
                            done.fail(error);
                        }

                        expect(response.body.token).toBeTruthy();
                        const decodedJwt: any = jwt.decode(response.body.token, { complete: true });
                        expect(decodedJwt).toBeTruthy();
                        expect(decodedJwt.header.alg).toBeTruthy('HS256');
                        expect(decodedJwt.header.typ).toBeTruthy('JWT');
                        expect(decodedJwt.payload).toBeTruthy();
                        expect(decodedJwt.payload.email).toBe(email);
                        expect(decodedJwt.payload.iat).toBeTruthy();

                        done();
                    });
            });
    });
});


describe('GET /api/auth/secret', function () {
    it('should return 401 when invalid JWT is passed in the request', function (done) {
        supertest(app).get('/api/auth/secret')
            .expect(HttpStatus.UNAUTHORIZED)
            .end((error: any) => {
                if (error) {
                    done.fail(error);
                }

                done();
            });
    });
});