import authService from './auth.service';
import axios from 'axios';
import * as sinon from 'sinon';

describe('auth service', function () {
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

        axiosStub.restore();        
        done();
    });
});