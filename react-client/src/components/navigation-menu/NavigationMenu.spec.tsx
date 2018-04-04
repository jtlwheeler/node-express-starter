import * as React from 'react';
import { shallow, configure } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import NavigationMenu from './NavigationMenu';
import { Navbar } from 'react-bootstrap';

configure({ adapter: new Adapter() });

describe('<NavigationMenu />', function () {
    it('should render one Navbar', function () {
        const wrapper = shallow(<NavigationMenu />);
        expect(wrapper.find(Navbar).length).toBe(1);
    });
});