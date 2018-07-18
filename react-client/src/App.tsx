import * as React from 'react';
import NavigationMenu from './components/navigation-menu/NavigationMenu';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import RegistrationPage from './components/registration/RegistrationPage';
import { ProfilePage } from './components/profile-page/ProfilePage';
import LoginPage from './components/login-page/LoginPage';
import authService from './services/auth/auth.service';
import { Token } from '../../../my-app/src/services/authService';

interface State {
    token?: Token;
    isUserLoggedIn: boolean;
}

class App extends React.Component<any, State> {
    constructor(props: any) {
        super(props);

        this.state = {
            token: undefined,
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
                <NavigationMenu/>
                <BrowserRouter>
                    <div className="container">
                        <Switch>
                            <Route path="/login" render={props => this.renderLoginPage(props)}/>
                            <Route path="/register" component={RegistrationPage}/>
                            <Route
                                path="/profile"
                                render={(props) => (
                                    this.state.isUserLoggedIn
                                        ? <ProfilePage history={props.history}/>
                                        : <Redirect to="/login"/>
                                )}
                            />
                            <Redirect to="/login"/>
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        );
    }

    private async isUserLoggedIn(): Promise<boolean> {
        if (this.state.token === undefined) {
            this.setState({isUserLoggedIn: false});
            return false;
        }

        const isUserLoggedIn = await authService.checkToken(this.state.token);
        this.setState({isUserLoggedIn: isUserLoggedIn});
        return isUserLoggedIn;
    }

    private onSuccessfulLogin() {
        this.setState({isUserLoggedIn: true});
    }

    private renderLoginPage(props: any) {
        if (this.state.isUserLoggedIn) {
            return <ProfilePage history={props.history}/>;
        } else {
            return <LoginPage history={props.history} onSuccessfulLogin={this.onSuccessfulLogin}/>;
        }
    }
}

export default App;
