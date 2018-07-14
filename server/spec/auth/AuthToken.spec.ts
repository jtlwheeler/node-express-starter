import 'jasmine';
import * as jwt from 'jsonwebtoken';
import AuthToken from '../../src/auth/AuthToken';

describe('auth token', function () {
    describe('generateToken()', function () {
        it('should generate valid token', function () {
            const authToken = new AuthToken();
            const email = 'email@email.com';
            const token = authToken.generateToken(email);

            const decodedJwt: any = jwt.decode(token.accessToken, {complete: true});
            expect(decodedJwt).toBeTruthy();
            expect(decodedJwt.header.alg).toBeTruthy('HS256');
            expect(decodedJwt.header.typ).toBeTruthy('JWT');
            expect(decodedJwt.payload).toBeTruthy();
            expect(decodedJwt.payload.email).toBe(email);
            expect(decodedJwt.payload.iat).toBeTruthy();
            expect(decodedJwt.payload.exp).toBeTruthy();
        });
    });

    describe('isTokenValid', function () {
        it('should return false when the token is invalid', function () {
            const authToken = new AuthToken();
            const accessToken = {
                accessToken: 'invalidToken'
            };
            const validToken = authToken.isTokenValid(accessToken);

            expect(validToken).toBe(false);
        });

        it('should return true when the token is valid', function () {
            const authToken = new AuthToken();
            const accessToken = authToken.generateToken('email@email.com');

            const validToken = authToken.isTokenValid(accessToken);

            expect(validToken).toBe(true);
        });
    });
});