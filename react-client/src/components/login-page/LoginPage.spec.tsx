import * as React from 'react';
import { shallow, configure } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import LoginPage from './LoginPage';
import authService from '../../services/auth/auth.service';
import * as sinon from 'sinon';
import { getInputBySelector, setInputValue, simulateSubmit } from '../test-helpers/wrapper.helper';
import { waitUntil } from '../test-helpers/waitUntil.helper';
import History from '../shared/History';

configure({ adapter: new Adapter() });

describe('<LoginPage /> ', function () {

    it('should render page', function () {
        const pushSpy = sinon.spy();
        const history: History = {
            push: pushSpy
        };
        const wrapper = shallow(<LoginPage history={history} />);
        expect(wrapper.find('.login-page-form').length).toBe(1);
    });

    it('should use auth service to login when submit button is clicked', function () {
        const authServiceStub = sinon.stub(authService, 'login')
            .returns('someToken');

        const pushSpy = sinon.spy();
        const history: History = {
            push: pushSpy
        };

        const wrapper = shallow(<LoginPage history={history} />);
        const email = 'email@email.com';
        const password = 'somePassword';

        const emailInput = getInputBySelector(wrapper, '.email');
        setInputValue(emailInput, email);

        const passwordInput = getInputBySelector(wrapper, '.password');
        setInputValue(passwordInput, password);

        simulateSubmit(wrapper, '.login-page-form');

        expect(wrapper.find('.submit-button').length).toBe(1);
        sinon.assert.calledWith(authServiceStub, email, password);
        authServiceStub.restore();
    });

    it('should use auth service to login when form is submitted', function () {
        const authServiceStub = sinon.stub(authService, 'login')
            .returns('someToken');

        const pushSpy = sinon.spy();
        const history: History = {
            push: pushSpy
        };

        const wrapper = shallow(<LoginPage history={history} />);
        const email = 'email@email.com';
        const password = 'somePassword';

        const emailInput = getInputBySelector(wrapper, '.email');
        setInputValue(emailInput, email);

        const passwordInput = getInputBySelector(wrapper, '.password');
        setInputValue(passwordInput, password);
        simulateSubmit(wrapper, '.login-page-form');

        expect(wrapper.find('.login-page-form').length).toBe(1);
        sinon.assert.calledWith(authServiceStub, email, password);
        authServiceStub.restore();
    });

    it('should display error when an error occurs on login', async function () {
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

        const pushSpy = sinon.spy();
        const history: History = {
            push: pushSpy
        };

        const wrapper = shallow(<LoginPage history={history} />);

        const emailInput = getInputBySelector(wrapper, '.email');
        setInputValue(emailInput, 'email@email.com');

        const paswordInput = getInputBySelector(wrapper, '.password');
        setInputValue(paswordInput, 'password');

        simulateSubmit(wrapper, '.login-page-form');

        await waitUntil(() => wrapper.update().find('.error-message').length === 1,
            100,
            'Error message never appeared');

        expect(wrapper.find('.error-message').length).toBe(1);
        expect(wrapper.state().error).toEqual([
            '\"email\" is required',
            '\"password\" is required'
        ]
        );

        authServiceStub.restore();
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

        simulateSubmit(wrapper, '.login-page-form');

        expect(wrapper.find('.submit-button').length).toBe(1);
        expect(authServiceStub.calledWith(email, password)).toBe(true);
        setTimeout(() => {
            expect(historySpy.called).toBe(true);
            authServiceStub.restore();
            done();
        }, 0);
    });
});