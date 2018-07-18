import * as React from 'react';
import NavigationMenu from './components/navigation-menu/NavigationMenu';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import RegistrationPage from './components/registration/RegistrationPage';
import LoginPage from './components/login-page/LoginPage';
import authService from './services/auth/auth.service';
import {Token} from '../../../my-app/src/services/authService';
import ProfilePage from './components/profile-page/ProfilePage';

interface State {
    token: Token;
    isUserLoggedIn: boolean;
}

class App extends React.Component<any, State> {
    constructor(props: any) {
        super(props);

        this.state = {
            token: {token: ''},
            isUserLoggedIn: false
        };

        this.isUserLoggedIn = this.isUserLoggedIn.bind(this);
        this.onSuccessfulLogin = this.onSuccessfulLogin.bind(this);
    }

    async componentDidMount() {
        this.setState({isUserLoggedIn: await this.isUserLoggedIn()});
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <NavigationMenu/>
                        <div className="container">
                            <Switch>
                                <Route path="/login" render={props => this.renderLoginPage(props)}/>
                                <Route path="/register" component={RegistrationPage}/>
                                <Route
                                    path="/profile"
                                    render={() => (
                                        this.state.isUserLoggedIn
                                            ? <ProfilePage token={this.state.token}/>
                                            : <Redirect to="/login"/>
                                    )}
                                />
                                <Redirect to="/login"/>
                            </Switch>
                        </div>
                    </div>
                </BrowserRouter>
            </div>
        );
    }

    private async isUserLoggedIn(): Promise<boolean> {
        if (this.state.token === undefined || this.state.token.token === '') {
            this.setState({isUserLoggedIn: false});
            return false;
        }

        const isUserLoggedIn = await authService.checkToken(this.state.token);
        this.setState({isUserLoggedIn: isUserLoggedIn});
        return isUserLoggedIn;
    }

    private onSuccessfulLogin(token: Token) {
        this.setState({
            isUserLoggedIn: true,
            token: token
        });
    }

    private renderLoginPage(props: any) {
        if (this.state.isUserLoggedIn) {
            return <Redirect to="/profile"/>;
        } else {
            return <LoginPage history={props.history} onSuccessfulLogin={this.onSuccessfulLogin}/>;
        }
    }
}

export default App;
