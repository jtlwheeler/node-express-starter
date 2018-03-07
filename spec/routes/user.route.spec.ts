import 'jasmine';
import * as supertest from 'supertest';
import * as app from '../../src/app';

describe('POST /api/user/signUp', function () {
    it('should return 400 and errors when email address is not passed', function () {
        supertest(app).post('/api/user/signUp/')
            .expect(400)
            .end((error: any, response: any) => {
                if (error) {
                    throw error;
                }

                expect(response.body.errors).toBeTruthy();
                expect(response.body.errors[0].message).toContain('email');
                expect(response.body.errors.length).toBeGreaterThanOrEqual(1);
            });
    });
});