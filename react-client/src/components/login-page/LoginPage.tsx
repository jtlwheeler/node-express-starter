import * as React from 'react';
import authService from '../../services/auth/auth.service';
import { responseErrorHandler } from '../shared/responseErrorHandler';
import History from '../shared/History';
import { Token } from '../../../../../my-app/src/services/authService';

export interface LoginPageProps {
    history: History;
    onSuccessfulLogin: (token: Token) => void;
}

type State = {
    email: string;
    password: string;
    error: string;
};

export default class LoginPage extends React.Component<LoginPageProps, State> {

    constructor(props: LoginPageProps) {
        super(props);

        this.state = {
            email: '',
            password: '',
            error: ''
        };

        this.submit = this.submit.bind(this);
    }

    render() {
        return (
            <form className="login-page-form" onSubmit={this.submit}>
                <h1>Log In</h1>
                {this.state.error &&
                <div className="error-message alert alert-danger">{this.state.error}</div>
                }

                <div className="form-group">
                    <input
                        className="email form-control"
                        type="email"
                        placeholder="Email"
                        name="email"
                        onChange={(event: any) => {
                            this.setState({email: event.target.value});
                        }}
                        required
                    />
                </div>

                <div className="form-group">
                    <input
                        className="password form-control"
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={(event: any) => {
                            this.setState({password: event.target.value});
                        }}
                        required
                    />
                </div>

                <div className="form-group">
                    <div>
                        <button
                            type="submit"
                            className="submit-button btn btn-primary"
                        >
                            Sign in
                        </button>
                    </div>
                    <div>
                        <button
                            type="button"
                            className="create-account-button btn btn-link"
                            onClick={() => this.props.history.push('/register')}
                        >
                            Create account
                        </button>
                    </div>
                </div>
            </form>
        );
    }

    private async submit(event: any) {
        event.preventDefault();

        try {
            const token = await authService.login(this.state.email, this.state.password);
            this.props.onSuccessfulLogin(token);
            this.props.history.push('/profile');
        } catch (error) {
            this.setState({error: responseErrorHandler(error)});
        }
    }
}