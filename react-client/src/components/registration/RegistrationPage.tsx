import * as React from 'react';
import authService from '../../services/auth/auth.service';
import { responseErrorHandler } from '../shared/responseErrorHandler';
import History from '../shared/History';

export interface RegistrationPageProps {
    history: History;
}

interface State {
    email: string;
    password: string;
    confirmPassword: string;
    error: string;
}

export default class RegistrationPage extends React.Component<RegistrationPageProps, State> {

    constructor(props: RegistrationPageProps) {
        super(props);

        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            error: ''
        };

        this.submit = this.submit.bind(this);
    }

    render() {
        return (
            <div>
                <form className="registration-form" onSubmit={this.submit}>
                    <h1>Sign Up</h1>

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
                        <input
                            className="confirm-password form-control"
                            type="password"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            onChange={(event: any) => {
                                this.setState({confirmPassword: event.target.value});
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
                                Sign up
                            </button>
                        </div>
                        <div>
                            <button
                                type="button"
                                className="login-button btn btn-link"
                                onClick={() => this.props.history.push('/login')}
                            >
                                Login
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }

    private async submit(event: any) {
        event.preventDefault();

        try {
            await authService.registerUser({
                email: this.state.email,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword
            });
            this.props.history.push('/profile');
        } catch (error) {
            this.setState({error: responseErrorHandler(error)});
        }
    }
}