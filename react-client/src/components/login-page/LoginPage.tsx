import * as React from 'react';
import authService from '../../services/auth/auth.service';
import { responseErrorHandler } from '../shared/responseErrorHandler';
import History from '../shared/History';

export interface LoginPageProps {
    history: History;
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
                        onChange={(event: any) => { this.setState({ email: event.target.value }); }}
                        required
                    />
                </div>

                <div className="form-group">
                    <input
                        className="password form-control"
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={(event: any) => { this.setState({ password: event.target.value }); }}
                        required
                    />
                </div>

                <div className="form-group">
                    <button
                        type="submit"
                        className="submit-button btn btn-primary"
                    >
                        Sign in
                    </button>
                </div>
            </form>
        );
    }

    private async submit(event: any) {
        event.preventDefault();

        try {
            await authService.login(this.state.email, this.state.password);
            this.props.history.push('/profile');
        } catch (error) {
            this.setState({ error: responseErrorHandler(error) });
        }
    }
}