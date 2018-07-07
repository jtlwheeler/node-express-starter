import * as React from 'react';
import authService from '../../services/auth/auth.service';

export interface RegistrationPageProps {
}

interface State {
    email: string;
    password: string;
    confirmPassword: string;
}

export default class RegistrationPage extends React.Component<RegistrationPageProps, State> {

    constructor(props: RegistrationPageProps) {
        super(props);

        this.submit = this.submit.bind(this);
    }

    render() {
        return (
            <div>
                <form className="registration-form" onSubmit={this.submit}>

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
                        <input
                            className="confirm-password form-control"
                            type="password"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            onChange={(event: any) => { this.setState({ confirmPassword: event.target.value }); }}
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
            </div>
        );
    }

    private async submit() {
        await authService.registerUser({
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        });
    }
}