import { shallow, configure } from 'enzyme';
import * as React from 'react';
import * as Adapter from 'enzyme-adapter-react-16';
import { ProfilePage } from './ProfilePage';

configure({ adapter: new Adapter() });

describe('<ProfilePage />', function () {
    it('should render profile page', function () {
        const wrapper = shallow(<ProfilePage />);
        expect(wrapper.find('.profile-page').length).toBe(1);
    });
});