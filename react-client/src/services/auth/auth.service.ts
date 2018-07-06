import axios, { AxiosRequestConfig } from 'axios';
import Token from './Token';
import * as HttpStatus from 'http-status';

class AuthService {

    private config: AxiosRequestConfig = {
        baseURL: 'http://localhost:3001'
    };

    public async login(email: string, password: string): Promise<Token> {
        this.config.url = '/api/auth/login';
        this.config.method = 'post';
        this.config.data = {
            email: email,
            password: password
        };

        const response = await axios.request(this.config);
        const token = response.data.token;

        return token;
    }

    public async registerUser(registerUserRequest: any): Promise<Boolean> {
        this.config.url = '/api/user/signUp/';
        this.config.method = 'post';
        this.config.data = registerUserRequest;
        const response = await axios.request(this.config);

        if (response.status === HttpStatus.OK) {
            return true;
        }

        return false;
    }
}

const authService = new AuthService();
export default authService;