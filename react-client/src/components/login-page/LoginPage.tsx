import * as React from 'react';
import { Button, Form, FormControl, FormGroup, Alert } from 'react-bootstrap';
import authService from '../services/auth/auth.service';

interface State {
    email: string;
    password: string;
    error: string;
}

export default class LoginPage extends React.Component<any, State> {

    constructor(props: any) {
        super(props);

        this.state = {
            email: '',
            password: '',
            error: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    async submit(event: any) {
        event.preventDefault();

        try {
            await authService.login(this.state.email, this.state.password);
            // this.props.history.push('/');
        } catch (error) {

            if (error.response && error.response.data && error.response.data.errors) {
                const errors = error.response.data.errors.map((error: any) => error.message);
                this.setState({ error: errors });
            } else {
                this.setState({ error: error.toString() });
            }
        }
    }

    handleChange(event: any) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
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
                        type="text"
                        placeholder="Email"
                        name="email"
                        onChange={this.handleChange}
                        required
                    />
                </FormGroup>

                <FormGroup>
                    <FormControl
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={this.handleChange}
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