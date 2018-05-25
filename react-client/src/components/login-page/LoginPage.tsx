import * as React from 'react';
import { Button, Form, FormControl, FormGroup, Alert } from 'react-bootstrap';
import authService from '../services/auth/auth.service';

type State = {
    email: string;
    password: string;
    error: string;
};

export default class LoginPage extends React.Component<any, State> {

    constructor(props: any) {
        super(props);

        this.state = {
            email: '',
            password: '',
            error: ''
        };

        this.submit = this.submit.bind(this);
    }

    async submit(event: any) {
        event.preventDefault();

        try {
            await authService.login(this.state.email, this.state.password);
            this.props.history.push('/profile');
        } catch (error) {
            
            if (error.response && error.response.data && error.response.data.errors) {
                const errors = error.response.data.errors.map((error: any) => error.message);
                this.setState({ error: errors });
            } else {
                this.setState({ error: error.toString() });
            }
        }
    }

    render() {
        return (
            <Form className="login-page-form" onSubmit={this.submit}>
                <h1>Log In</h1>
                {this.state.error &&
                    <Alert className="error-display">{this.state.error}</Alert>
                }
                <FormGroup
                    controlId="formBasicText"
                >
                    <FormControl
                        className="email"
                        type="text"
                        placeholder="Email"
                        name="email"
                        onChange={(event: any) => { this.setState({ email: event.target.value }); }}
                        required
                    />
                </FormGroup>

                <FormGroup>
                    <FormControl
                        className="password"
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={(event: any) => { this.setState({ password: event.target.value }); }}
                        required
                    />
                </FormGroup>

                <FormGroup>
                    <Button
                        type="submit"
                        className="submit-button btn btn-primary"
                    >
                        Sign in
                    </Button>
                </FormGroup>
            </Form>
        );
    }
}