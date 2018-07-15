import axios, { AxiosRequestConfig } from 'axios';
import Token from './Token';
import * as HttpStatus from 'http-status';

export class AuthService {

    private config: AxiosRequestConfig = {
        baseURL: 'http://localhost:3001'
    };

    public async login(email: string, password: string): Promise<Token> {
        this.config = {};
        this.config.url = '/api/auth/login';
        this.config.method = 'post';
        this.config.data = {
            email: email,
            password: password
        };

        const response = await axios.request(this.config);
        return response.data.token;
    }

    public async registerUser(registerUserRequest: any): Promise<boolean> {
        this.config = {};
        this.config.url = '/api/user/signUp/';
        this.config.method = 'post';
        this.config.data = registerUserRequest;

        try {
            const response = await axios.request(this.config);
            return response.status === HttpStatus.OK;
        } catch (error) {
            throw error;
        }
    }

    public async checkToken(token: Token): Promise<boolean> {
        this.config = {};
        this.config.url = '/api/auth/checkToken/';
        this.config.method = 'get';
        this.config.params = {
            token: token.token
        };
        const response = await axios.request(this.config);
        return response.data.isTokenValid;
    }
}

const authService = new AuthService();
export default authService;