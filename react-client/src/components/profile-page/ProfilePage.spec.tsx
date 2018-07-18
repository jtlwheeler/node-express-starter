import { shallow, configure } from 'enzyme';
import * as React from 'react';
import * as Adapter from 'enzyme-adapter-react-16';
import authService from '../../services/auth/auth.service';
import * as sinon from 'sinon';
import { waitUntil } from '../test-helpers/waitUntil.helper';
import ProfilePage from './ProfilePage';

configure({adapter: new Adapter()});

describe('<ProfilePage />', function () {
    it('should render profile page', function () {
        const token = {
            token: 'theAccessToken'
        };
        const wrapper = shallow(<ProfilePage token={token}/>);
        expect(wrapper.find('.profile-page').length).toBe(1);
    });

    fit('should call getSecret when page loads and render success on UI', async function () {
        const authServiceStub = sinon.stub(authService, 'getSecret')
            .returns(Promise.resolve(true));

        const token = {
            token: 'theAccessToken'
        };

        const wrapper = shallow(<ProfilePage token={token}/>);

        await waitUntil(() => authServiceStub.called,
            10,
            'getSecret was never called');

        sinon.assert.calledWith(authServiceStub, token);

        await waitUntil(() => wrapper.update().find('.secret-message').length === 1,
            100,
            'secret message was never shown');
        expect(wrapper.update().find('.secret-message').length).toBe(1);

        authServiceStub.restore();
    });
});