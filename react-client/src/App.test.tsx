import * as React from 'react';
import App from './App';
import { configure, shallow } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import NavigationMenu from './components/navigation-menu/NavigationMenu';

configure({ adapter: new Adapter() });

describe('<App />', function () {
  it('should render <NavigationMenu /> component', function () {
    const wrapper = shallow(<App />);

    expect(wrapper.find(NavigationMenu).length).toBe(1);
  });
});
