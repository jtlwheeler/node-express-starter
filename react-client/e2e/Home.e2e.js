describe('Sign up', function () {
    it('should sign user up and navigate to the profile page', async function () {
        browser.get('/');

        expect(browser.getTitle()).toEqual('React App');
    });
});