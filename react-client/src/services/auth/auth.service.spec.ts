import authService from './auth.service';
import axios, { AxiosResponse } from 'axios';
import * as sinon from 'sinon';
import { Token } from '../../../../../my-app/src/services/authService';

describe('auth service', function () {

    describe('login', function () {
        it('should call login', async function (done: jest.DoneCallback) {
            const axiosStub = sinon.stub(axios, 'request');
            const response = {
                data: {
                    token: 'someToken'
                }
            };

            axiosStub.returns(response);

            const token = await authService.login('email@email.com', 'myPassword');

            expect(token).toBe('someToken');
            sinon.assert.calledWith(axiosStub,
                sinon.match({data: {email: 'email@email.com', password: 'myPassword'}}));

            axiosStub.restore();
            done();
        });

    });

    describe('registerUser', function () {
        it('should call registerUser and return success', async function () {
            const axiosStub = sinon.stub(axios, 'request');
            const response: AxiosResponse<any> = {
                data: {},
                status: 200,
                statusText: '',
                headers: {},
                config: {}
            };

            axiosStub.returns(response);

            const registerUserRequest = {
                username: 'someUsername',
                password: 'somePassword',
                confirmPassword: 'somePassword'
            };

            const success = await authService.registerUser(registerUserRequest);
            expect(success).toBeTruthy();

            sinon.assert.calledWith(axiosStub,
                sinon.match({data: registerUserRequest}));
            axiosStub.restore();
        });

        it('should throw exception with errors when a bad request is sent', async function () {
            const axiosStub = sinon.stub(axios, 'request');
            const response: AxiosResponse<any> = {
                data: {
                    errors: [
                        {message: 'You sent bad stuff'}
                    ]
                },
                status: 400,
                statusText: '',
                headers: {},
                config: {}
            };

            axiosStub.rejects(response);

            const registerUserRequest = {
                username: 'someUsername',
                password: 'somePassword',
                confirmPassword: 'somePassword'
            };

            try {
                await authService.registerUser(registerUserRequest);
                fail('This should have thrown an error');
            } catch (error) {
                expect(error.data.errors[0].message).toBe('You sent bad stuff');
            }

            axiosStub.restore();
        });
    });

    describe('checkToken()', function () {
        it('should return false when the token is invalid', async function () {
            const axiosStub = sinon.stub(axios, 'request');
            const response: AxiosResponse<any> = {
                data: {
                    isTokenValid: false
                },
                status: 200,
                statusText: '',
                headers: {},
                config: {}
            };

            axiosStub.returns(response);

            const token: Token = {
                token: 'invalidToken'
            };

            const isTokenValid = await authService.checkToken(token);
            expect(isTokenValid).toBe(false);

            sinon.assert.calledWith(axiosStub,
                sinon.match({params: {token: token.token}}));

            axiosStub.restore();
        });

        it('should return true when the token is valid', async function () {
            const axiosStub = sinon.stub(axios, 'request');
            const response: AxiosResponse<any> = {
                data: {
                    isTokenValid: true
                },
                status: 200,
                statusText: '',
                headers: {},
                config: {}
            };

            axiosStub.returns(response);

            const token: Token = {
                token: 'invalidToken'
            };

            const isTokenValid = await authService.checkToken(token);
            expect(isTokenValid).toBe(true);

            sinon.assert.calledWith(axiosStub,
                sinon.match({params: {token: token.token}}));

            axiosStub.restore();
        });
    });

    describe('getSecret()', function () {
        it('should access /secret endpoint with token', async function () {
            const response: AxiosResponse<any> = {
                data: {
                    success: true
                },
                status: 200,
                statusText: '',
                headers: {},
                config: {}
            };

            const axiosStub = sinon.stub(axios, 'request').returns(Promise.resolve(response));
            const token = {token: 'validToken'};

            const accessedSecret = await authService.getSecret(token);

            expect(accessedSecret).toBe(true);
            sinon.assert.calledWith(axiosStub,
                sinon.match({headers: {Authorization: `Bearer ${token.token}`}}));

            axiosStub.restore();
        });

        it('should return false when accessing /secret with invalid token', async function () {
            const response: AxiosResponse<any> = {
                data: {},
                status: 401,
                statusText: '',
                headers: {},
                config: {}
            };

            const axiosStub = sinon.stub(axios, 'request').returns(Promise.reject(response));
            const token = {token: 'thisTokenIsNotGood'};

            const accessedSecret = await authService.getSecret(token);

            expect(accessedSecret).toBe(false);

            axiosStub.restore();
        });
    });
});