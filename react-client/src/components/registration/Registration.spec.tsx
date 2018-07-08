import { shallow, configure } from 'enzyme';
import * as React from 'react';
import RegistrationPage from './Registration';
import * as Adapter from 'enzyme-adapter-react-16';
import { getInputBySelector, setInputValue, simulateSubmit } from '../test-helpers/wrapper.helper';
import authService from '../../services/auth/auth.service';
import * as sinon from 'sinon';

configure({ adapter: new Adapter() });

describe('<Registration />', function () {
    it('should render registration form', function () {
        const wrapper = shallow(<RegistrationPage />);
        expect(wrapper.find('.registration-form').length).toBe(1);
    });

    it('should use auth service to register user', function () {
        const authServiceStub = sinon.stub(authService, 'registerUser')
            .returns(true);

        const wrapper = shallow(<RegistrationPage />);

        const email = 'myEmailAddress@email.com';
        const emailTextField = getInputBySelector(wrapper, '.email');
        setInputValue(emailTextField, email);

        const password = 'myPassword';
        const passwordTextField = getInputBySelector(wrapper, '.password');
        setInputValue(passwordTextField, password);

        const confirmPasswordTextField = getInputBySelector(wrapper, '.confirm-password');
        setInputValue(confirmPasswordTextField, password);

        simulateSubmit(wrapper, '.registration-form');

        sinon.assert.calledWith(authServiceStub, { email, password, confirmPassword: password });

        authServiceStub.restore();
    });

    it('should display error message when error occurs making request', function (done: jest.DoneCallback) {
        const authServiceStub = sinon.stub(authService, 'registerUser')
            .rejects({
                response: {
                    data: {
                        errors: [
                            { message: 'This was a bad thing' },
                            { message: 'Another error' }
                        ]
                    }
                }
            });

        const wrapper = shallow(<RegistrationPage />);

        const email = 'myEmailAddress@email.com';
        const emailTextField = getInputBySelector(wrapper, '.email');
        setInputValue(emailTextField, email);

        const password = 'myPassword';
        const passwordTextField = getInputBySelector(wrapper, '.password');
        setInputValue(passwordTextField, password);

        const confirmPasswordTextField = getInputBySelector(wrapper, '.confirm-password');
        setInputValue(confirmPasswordTextField, password);

        simulateSubmit(wrapper, '.registration-form');
        wrapper.update();

        setTimeout(() => {
            wrapper.update();
            expect(wrapper.find('.error-message').length).toBe(1);
            expect(wrapper.find('.error-message').text()).toContain('This was a bad thing');
            expect(wrapper.find('.error-message').text()).toContain('Another error');
          
            authServiceStub.restore();
            done();
        }, 2000);
    });
});