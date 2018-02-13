/// <reference path="../../node_modules/@types/jasmine/index.d.ts" />
import * as request from 'supertest';
import * as app from '../../src/app';

describe('GET /api/hello', () => {
    it('should return 200 OK', () => {
        return request(app).get('/api/hello')
        .expect(200)
        .then(response => {
            expect(response.text).toBe('Hello World!');
        });
    });
});