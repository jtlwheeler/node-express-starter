/// <reference path="../../node_modules/@types/jasmine/index.d.ts" />
import * as request from 'supertest';
import * as app from '../../src/app';

describe('GET /api/health', () => {
    it('should return 200 OK', () => {
        request(app).get('/api/health')
            .expect(200)
            .end((error: any, response: any) => {
                if (error)
                    throw error;

                expect(response.body.apiStatus).toBe('OK');
            });
    });
});