import * as React from 'react';
import NavigationMenu from './components/navigation-menu/NavigationMenu';
import LoginPage from './components/login-page/LoginPage';

class App extends React.Component {
    render() {
        return (
            <div>
                <NavigationMenu />
                <div className="container">
                    <LoginPage />
                </div>
            </div>
        );
    }
}

export default App;
