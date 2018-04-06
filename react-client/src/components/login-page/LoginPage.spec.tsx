import * as React from 'react';
import { shallow, configure } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import LoginPage from './LoginPage';
import authService from '../services/auth/auth.service';
import * as sinon from 'sinon';

configure({ adapter: new Adapter() });

describe('<LoginPage /> ', function () {
    it('should render page', function () {
        const wrapper = shallow(<LoginPage />);
        expect(wrapper.find('.submit-button').length).toBe(1);
    });

    it('should use auth service to login when submit button is clicked', function () {
        const authServiceStub = sinon.stub(authService, 'login');
        authServiceStub.returns('someToken');

        const wrapper = shallow(<LoginPage />);
        const email = 'email@email.com';
        const password = 'somePassword';
        wrapper.setState({
            email: email,
            password: password
        });

        wrapper.find('.submit-button').simulate('click', {
            preventDefault() {
                // no-op
            }
        });

        expect(wrapper.find('.submit-button').length).toBe(1);        
        sinon.assert.calledWith(authServiceStub, email, password);
        authServiceStub.restore();
    });

    it('should use auth service to login when form is submitted', function () {
        const authServiceStub = sinon.stub(authService, 'login');
        authServiceStub.returns('someToken');

        const wrapper = shallow(<LoginPage />);
        const email = 'email@email.com';
        const password = 'somePassword';
        wrapper.setState({
            email: email,
            password: password
        });

        wrapper.find('.login-page-form').simulate('submit', {
            preventDefault() {
                // no-op
            }
        });

        expect(wrapper.find('.login-page-form').length).toBe(1);        
        sinon.assert.calledWith(authServiceStub, email, password);
        authServiceStub.restore();
        
    });
});