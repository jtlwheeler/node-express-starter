/// <reference path="../../node_modules/@types/jasmine/index.d.ts" />
import * as request from 'supertest';
import * as app from '../../src/app';

describe('GET /api/hello', () => {
    it('should return 200 OK', () => {
        request(app).get('/api/hello')
            .expect(200)
            .expect((res: any) => {
            res.text = 'Hello World!';
        });
    });
});