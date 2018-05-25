import axios, { AxiosRequestConfig } from 'axios';
import Token from './Token';

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
}

const authService = new AuthService();
export default authService;