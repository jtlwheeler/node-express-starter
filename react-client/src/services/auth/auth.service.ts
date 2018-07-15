import axios, { AxiosRequestConfig } from 'axios';
import Token from './Token';
import * as HttpStatus from 'http-status';

export class AuthService {

    private baseURL = 'http://localhost:3001';

    public async login(email: string, password: string): Promise<Token> {
        const config: AxiosRequestConfig = {
            baseURL: this.baseURL,
            url: '/api/auth/login',
            method: 'post',
            data: {
                email: email,
                password: password
            }
        };

        const response = await axios.request(config);
        return response.data.token;
    }

    public async registerUser(registerUserRequest: any): Promise<boolean> {
        const config: AxiosRequestConfig = {
            baseURL: this.baseURL,
            url:  '/api/user/signUp/',
            method: 'post',
            data: registerUserRequest
        };

        try {
            const response = await axios.request(config);
            return response.status === HttpStatus.OK;
        } catch (error) {
            throw error;
        }
    }

    public async checkToken(token: Token): Promise<boolean> {
        const config: AxiosRequestConfig = {
            baseURL: this.baseURL,
            url:  '/api/auth/checkToken/',
            method: 'get',
            params: {
                token: token.token

            }
        };

        const response = await axios.request(config);
        return response.data.isTokenValid;
    }
}

const authService = new AuthService();
export default authService;