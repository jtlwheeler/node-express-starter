describe('Home', function () {
    it('title should be "React App"', async function () {
        browser.get('/');

        expect(browser.getTitle()).toEqual('React App');
    });
});