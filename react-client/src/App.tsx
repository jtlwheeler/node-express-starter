import * as React from 'react';
import NavigationMenu from './components/navigation-menu/NavigationMenu';
import LoginPage from './components/login-page/LoginPage';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import RegistrationPage from './components/registration/Registration';

class App extends React.Component {
    render() {
        return (
            <div>
                <NavigationMenu />
                <BrowserRouter>
                    <div className="container">
                        <Switch>
                            <Route exact path="/" component={LoginPage} />
                            <Route path="/register" component={RegistrationPage} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
