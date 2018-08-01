const Chance = require('chance');
const chance = new Chance();

describe('Create Account', function () {
    it('should create a new user and redirect to the login page', async function () {
        browser.get('/register');

        const email = chance.email();
        const emailInput = element(by.css('input.email'));
        emailInput.sendKeys(email);

        const password = 'superGoodPassword';
        const passwordInput = element(by.css('input.password'));
        passwordInput.sendKeys(password);

        const confirmPasswordInput = element(by.css('input.confirm-password'));
        confirmPasswordInput.sendKeys(password);

        const submitButton = element(by.css('button.submit-button'));
        submitButton.click();

        let expectedUrl = `${browser.baseUrl}/login`;
        await browser.wait(async () =>
            (await browser.getCurrentUrl()) === expectedUrl, 10000);

        const currentUrl = await browser.getCurrentUrl();
        expect(currentUrl).toBe(expectedUrl);
    });
});