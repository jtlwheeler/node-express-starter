import 'jasmine';
import * as supertest from 'supertest';
import * as app from '../../src/app';

describe('GET /api/hello', () => {
    it('should return 200 OK', (done) => {
        supertest(app).get('/api/hello/')
            .expect(200)
            .end((error: any, response: any) => {
                if (error) {
                    throw error;
                }

                expect(response.text).toBe('Hello World!');
                done();
            });
    });
});