import * as React from 'react';
import App from './App';
import { configure, mount} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import NavigationMenu from './components/navigation-menu/NavigationMenu';
import LoginPage from './components/login-page/LoginPage';

configure({ adapter: new Adapter() });

describe('<App />', function () {
    it('should render <NavigationMenu /> and <LoginPage /> components', function () {
        const wrapper = mount(<App />);

        expect(wrapper.find(NavigationMenu).length).toBe(1);
        expect(wrapper.find(LoginPage).length).toBe(1);
    });
});
