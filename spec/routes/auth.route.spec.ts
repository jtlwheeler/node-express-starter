import 'jasmine';
import * as supertest from 'supertest';
import { Chance } from 'chance';
import User, { UserModel } from '../../src/models/User';
import * as HttpStatus from 'http-status-codes';
import * as app from '../../src/app';
import { insertUser } from '../helpers/insertUser';
const chance = new Chance();

const LOGIN_PATH = '/api/auth/login';
describe(`GET ${LOGIN_PATH}`, function () {
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