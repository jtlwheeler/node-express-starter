import * as React from 'react';
import authService from '../../services/auth/auth.service';
import { Token } from '../../../../../my-app/src/services/authService';

export interface ProfilePageProps {
    token: Token;
}

interface State {
    accessedSecret: boolean;
}

export default class ProfilePage extends React.Component<ProfilePageProps, State> {

    constructor(props: ProfilePageProps) {
        super(props);

        this.state = {
            accessedSecret: false
        };
    }

    async componentDidMount() {
        const accessedSecret = await authService.getSecret(this.props.token);
        this.setState({accessedSecret: accessedSecret});
    }

    render() {
        return (
            <div className="profile-page">
                <h1>Profile Page</h1>
                {this.state.accessedSecret &&
                <h2 className="secret-message">You got the secret!</h2>
                }
            </div>
        );
    }
}