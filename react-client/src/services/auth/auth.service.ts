import axios, { AxiosRequestConfig } from 'axios';
import Token from './Token';
import * as HttpStatus from 'http-status';

export class AuthService {

    public async login(email: string, password: string): Promise<Token> {
        const config: AxiosRequestConfig = {
            url: '/api/auth/login',
            method: 'post',
            data: {
                email: email,
                password: password
            }
        };

        const response = await axios.request(config);
        return {token: response.data.token};
    }

    public async registerUser(registerUserRequest: any): Promise<boolean> {
        const config: AxiosRequestConfig = {
            url: '/api/user/signUp/',
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
            url: '/api/auth/checkToken/',
            method: 'get',
            params: {
                token: token.token
            }
        };

        const response = await axios.request(config);
        return response.data.isTokenValid;
    }

    public async getSecret(token: Token): Promise<boolean> {
        const config: AxiosRequestConfig = {
            url: '/api/auth/secret/',
            method: 'get',
            headers: {
                Authorization: `Bearer ${token.token}`
            }
        };

        try {
            const response = await axios.request(config);
            return response.data.success;
        } catch (error) {
            return false;
        }
    }
}

const authService = new AuthService();
export default authService;