import * as React from 'react';
import { shallow, configure, ShallowWrapper } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import LoginPage from './LoginPage';
import authService from '../../services/auth/auth.service';
import * as sinon from 'sinon';

configure({ adapter: new Adapter() });

function getInputBySelector(wrapper: ShallowWrapper, selector: string) {
    let findResult = wrapper.update().find(selector);
    expect(findResult.length).toBe(1);
    return findResult.first();
}

function setInputValue(input: any, value: string) {
    input.value = value;
    input.simulate('change', { target: input });
}

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

        const emailInput = getInputBySelector(wrapper, '.email');
        setInputValue(emailInput, email);

        const passwordInput = getInputBySelector(wrapper, '.password');
        setInputValue(passwordInput, password);

        submitLoginButtonForm(wrapper);

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

        const emailInput = getInputBySelector(wrapper, '.email');
        setInputValue(emailInput, email);

        const passwordInput = getInputBySelector(wrapper, '.password');
        setInputValue(passwordInput, password);
        submitLoginButtonForm(wrapper);

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

        const emailInput = getInputBySelector(wrapper, '.email');
        setInputValue(emailInput, 'email@email.com');

        const paswordInput = getInputBySelector(wrapper, '.password');
        setInputValue(paswordInput, 'password');

        submitLoginButtonForm(wrapper);

        setTimeout(() => {
            wrapper.update();
            expect(wrapper.find('.error-message').length).toBe(1);
            expect(wrapper.state().error).toEqual([
                '\"email\" is required',
                '\"password\" is required'
            ]
            );
            authServiceStub.restore();
            done();
        }, 2000);
    });

    it('should redirect to the profile page after successful login', function (done: jest.DoneCallback) {
        const historySpy = sinon.spy();
        const authServiceStub = sinon.stub(authService, 'login')
            .resolves('someToken');
        
        const history = {
            push: historySpy
        };

        const wrapper = shallow(<LoginPage history={history} />);
        const email = 'email@email.com';
        const password = 'somePassword';

        const emailInput = getInputBySelector(wrapper, '.email');
        setInputValue(emailInput, email);

        const passwordInput = getInputBySelector(wrapper, '.password');
        setInputValue(passwordInput, password);

        submitLoginButtonForm(wrapper);

        expect(wrapper.find('.submit-button').length).toBe(1);
        expect(authServiceStub.calledWith(email, password)).toBe(true);
        setTimeout(() => {
           expect(historySpy.called).toBe(true); 
           authServiceStub.restore();
           done();
        }, 1000);
        
    });
});

function submitLoginButtonForm(wrapper: ShallowWrapper<any, any>) {
    wrapper.find('.login-page-form').simulate('submit', {
        preventDefault() {
            // no-op
        }
    });
}
