const Chance = require('chance');
const chance = new Chance();

describe('Create Account', function () {
    it('should create a new user and redirect to the login page and then log new user in', async function () {
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

        const expectedUrl = `${browser.baseUrl}/login`;
        await browser.wait(async () =>
            (await browser.getCurrentUrl()) === expectedUrl, 10000);

        const currentUrl = await browser.getCurrentUrl();
        expect(currentUrl).toBe(expectedUrl);

        const loginEmailInput = element(by.css('input.email'));
        loginEmailInput.sendKeys(email);

        const loginPasswordInput = element(by.css('input.password'));
        loginPasswordInput.sendKeys(password);

        const loginSubmitButton = element(by.css('button.submit-button'));
        loginSubmitButton.click();

        const profileUrl = `${browser.baseUrl}/profile`;
        await browser.wait(async () =>
            (await browser.getCurrentUrl()) === profileUrl, 10000);

        const secretText = element(by.css('.secret-message'));
        expect(secretText.getText()).toBe('You got the secret!')
    });
});