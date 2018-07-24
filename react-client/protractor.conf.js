const HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');
const jasmineReporters = require('jasmine-reporters');

const screenshotReporter = new HtmlScreenshotReporter({
    dest: 'screenshots',
    filename: 'report.html'
});

let jUnitXmlReporter = new jasmineReporters.JUnitXmlReporter({
    consolidateAll: true,
    filePrefix: 'e2e',
    savePath: 'build/test-results/e2e'
});

exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['e2e/**/*.e2e.js'],
    baseUrl: 'http://localhost:3000',
    onPrepare: async function () {
        jasmine.getEnv().addReporter(screenshotReporter);
        jasmine.getEnv().addReporter(jUnitXmlReporter);
        browser.ignoreSynchronization = true;
        await browser.wait(async () => {
            await browser.get(browser.baseUrl);
            return await element(By.css('#root')).isPresent();
        }, 60 * 1000)
    },
    beforeLaunch: function () {
        return new Promise(function (resolve) {
            screenshotReporter.beforeLaunch(resolve);
        });
    },

    afterLaunch: function (exitCode) {
        return new Promise(function (resolve) {
            screenshotReporter.afterLaunch(resolve.bind(this, exitCode));
        });
    }
};