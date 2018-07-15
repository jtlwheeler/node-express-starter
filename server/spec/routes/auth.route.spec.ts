import 'jasmine';
import { Chance } from 'chance';
import User, { UserModel } from '../../src/models/User';
import * as HttpStatus from 'http-status-codes';
import * as app from '../../src/app';

const supertest = require('supertest')(app);
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
                supertest.post('/api/auth/login')
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
        supertest.post(LOGIN_PATH)
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

                supertest.post(LOGIN_PATH)
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

                supertest.post(LOGIN_PATH)
                    .send(body)
                    .expect(200)
                    .end((error: any, response: any) => {
                        if (error) {
                            done.fail(error);
                        }

                        expect(response.body.token).toBeTruthy();
                        const decodedJwt: any = jwt.decode(response.body.token, {complete: true});
                        expect(decodedJwt).toBeTruthy();
                        expect(decodedJwt.header.alg).toBeTruthy('HS256');
                        expect(decodedJwt.header.typ).toBeTruthy('JWT');
                        expect(decodedJwt.payload).toBeTruthy();
                        expect(decodedJwt.payload.email).toBe(email);
                        expect(decodedJwt.payload.iat).toBeTruthy();
                        expect(decodedJwt.payload.exp).toBeTruthy();

                        done();
                    });
            });
    });
});

const SECRET_PATH = '/api/auth/secret';
describe(`GET ${SECRET_PATH}`, function () {
    it('should return 401 when invalid JWT is passed in the request', function (done) {
        supertest.get(SECRET_PATH)
            .expect(HttpStatus.UNAUTHORIZED)
            .end((error: any) => {
                if (error) {
                    done.fail(error);
                }

                done();
            });
    });

    it('should return 200 when valid JWT is passed in the request', function (done) {
        const email = chance.email();
        const password = 'password';

        insertUser(email, password)
            .then(() => {
                const body = {
                    email: email,
                    password: password
                };

                supertest.post(LOGIN_PATH)
                    .send(body)
                    .expect(200)
                    .end((error: any, response: any) => {
                        if (error) {
                            done.fail(error);
                        }

                        const token = response.body.token;

                        supertest.get(SECRET_PATH)
                            .set('Authorization', 'Bearer ' + token)
                            .expect(200)
                            .end((error: any, response: any) => {
                                if (error) {
                                    done.fail(error);
                                }

                                expect(response.body.success).toBe(true);
                                done();
                            });
                    });
            })
            .catch(() => done.fail());
    });
});


describe('GET /api/auth/checkToken', function () {
    it('should return false when the token is invalid', function (done) {
        supertest.get('/api/auth/checkToken')
            .query({'token': 'invalidToken'})
            .expect(200)
            .end((error: any, response: any) => {
                console.log('here');
                if (error) {
                    done.fail(error);
                }

                expect(response.body.isTokenValid).toBe(false);
                done();
            });
    });

    it('should return true when the token is valid', function (done) {
        const email = chance.email();
        const password = 'password';

        insertUser(email, password)
            .then(() => {
                const body = {
                    email: email,
                    password: password
                };

                supertest.post(LOGIN_PATH)
                    .send(body)
                    .expect(200)
                    .end((error: any, response: any) => {
                        if (error) {
                            done.fail(error);
                        }

                        const token = response.body.token;

                        supertest.get('/api/auth/checkToken')
                            .query({'token': token})
                            .expect(200)
                            .end((error: any, response: any) => {
                                console.log('here');
                                if (error) {
                                    done.fail(error);
                                }

                                expect(response.body.isTokenValid).toBe(false);
                                done();
                            });
                    });
            })
            .catch(() => done.fail());
    });
});