import { shallow, configure } from 'enzyme';
import * as React from 'react';
import RegistrationPage from './Registration';
import * as Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('<Registration />', function () {
    it('should render registration form', function () {
        const wrapper = shallow(<RegistrationPage />);
        expect(wrapper.find('.registration-form').length).toBe(1);
    });
});