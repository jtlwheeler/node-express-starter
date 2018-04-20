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
        expect(wrapper.find('.login-page-form').length).toBe(1);
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

        wrapper.find('.login-page-form').simulate('submit', {
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

    it('should display error when an error occurs on login', function (done: jest.DoneCallback) {
        const authServiceStub = sinon.stub(authService, 'login');
        authServiceStub.rejects({
            response: {
                data: {
                    errors: [
                        { message: '\"email\" is required' },
                        { message: '\"password\" is required' }
                    ]
                }
            }
        });

        const wrapper = shallow(<LoginPage />);
        wrapper.setState({
            email: 'email@email.com',
            password: 'password'
        });

        wrapper.find('.login-page-form').simulate('submit', {
            preventDefault() {
                // no-op
            }
        });

        setTimeout(() => {
            wrapper.update();
            expect(wrapper.find('.error-display').length).toBe(1);
            expect(wrapper.state().error).toEqual([
                '\"email\" is required',
                '\"password\" is required'
            ]
            );
            done();
        }, 2000);
    });
});