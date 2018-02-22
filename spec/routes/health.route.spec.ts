import 'jasmine';
import * as supertest from 'supertest';
import * as app from '../../src/app';

describe('GET /api/health', () => {
    it('should return 200 OK', () => {
        supertest(app).get('/api/health')
            .expect(200)
            .end((error: any, response: any) => {
                if (error) {
                    throw error;
                }

                expect(response.body.apiStatus).toBe('OK');
            });
    });
});