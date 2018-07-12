import * as React from 'react';
import NavigationMenu from './components/navigation-menu/NavigationMenu';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import RegistrationPage from './components/registration/RegistrationPage';
import { ProfilePage } from './components/profile-page/ProfilePage';
import LoginPage from './components/login-page/LoginPage';

class App extends React.Component {
    render() {
        return (
            <div>
                <NavigationMenu/>
                <BrowserRouter>
                    <div className="container">
                        <Switch>
                            <Route exact path="/" component={LoginPage}/>
                            <Route path="/login" component={LoginPage}/>
                            <Route path="/register" component={RegistrationPage}/>
                            <Route path="/profile" component={ProfilePage}/>
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
