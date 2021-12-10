import { Given, When, After, Then, Before, Status } from '@cucumber/cucumber';
import { LandingPage } from '../UI/PageObjects/home';
import { RegistrationPage } from '../UI/PageObjects/registrationPage';
import { browser, element, by, ElementFinder, ExpectedConditions } from 'protractor';
const prot = require('protractor')
let landingPage: LandingPage;
let registrationPage: RegistrationPage;
var { setDefaultTimeout } = require('@cucumber/cucumber');
setDefaultTimeout(60 * 1000);

Before(() => {
    landingPage = new LandingPage();
    registrationPage = new RegistrationPage();
})

After(async function (scenarioResult) {
    if (scenarioResult.result.status === Status.FAILED) {
        let self = this;
        return browser.takeScreenshot().then(function (base64png: any) {
            self.attach(Buffer.from(base64png, 'base64'), 'image/png')
        })
    }
    browser.quit();
});

Given('Go to Url {string}', async (url: string) => {
    browser.waitForAngularEnabled(false);
    await browser.get(url);
});
Given('User accept all cookies', async () => {
    await landingPage.acceptCookies();
    await browser.sleep(1000);
});
When('User clicks on register button', async () => {
    await landingPage.openRegistrationPage();
});
When('Selects no payback card radio button', async () => {
    await registrationPage.selectNoCardRdBtn();
    await browser.sleep(1000);
});
Then('Select payback card {string}', async (cardName: string) => {
    await registrationPage.selectCardById(cardName);
});
Then('User selects next button', async () => {
    await registrationPage.selectNextBtn();
    await browser.sleep(1000);
});
Then('Email and Pin text box appears', async () => {
    await registrationPage.emailAndPinTxtBoxIsDisplayed();
});
When('User enter an email id as {string}', async (mailId: string) => {
    await registrationPage.enterEmail(mailId);
});
Then('User enter Pin as {int}', async (pin: number) => {
    await registrationPage.enterPin(pin);
});
Then('User selects gender as {string}', async (gender: string) => {
    await registrationPage.selectSalutation(gender);
});
Then('User enters first name as {string}', async (firstName: string) => {
    await registrationPage.enterFirstName(firstName);
});
Then('User enters last name as {string}', async (lastName: string) => {
    await registrationPage.enterlastName(lastName);
});
Then('User enters Dob {int} as date {int} as month and {int} as year', async (day: number, month: number, year: number) => {
    await registrationPage.enterDob(day, month, year);
});
Then('User enters street as {string}', async (street: string) => {
    await registrationPage.enterStreet(street);
});
Then('User enters floor {string} as {int}', async (identifier: string, floorNumber: number) => {
    await registrationPage.enterFloor(identifier, floorNumber);
});
Then('User enters zipcode as {int}', async (zipCode: number) => {
    await registrationPage.enterZipCode(zipCode);
});
Then('User enters city as {string}', async (city: string) => {
    await registrationPage.enterCity(city);
});
Then('User select country {string} as country {string}', async (countryIdentifier: string, country: string) => {
    await registrationPage.selectCountry(countryIdentifier, country);
});
Then('Sign up Label {string} has value {string}', async (label: string, value: string) => {
    await registrationPage.signUpLblValueVerification(label, value);
});
Then(/^Error message (.*) is displayed$/, async (errorMsg: string) => {
    await registrationPage.errorMsgIsDisplayed(errorMsg);
});
Then(/^Error message (.*) is not displayed$/, async (errorMsg: string) => {
    await registrationPage.errorMsgIsNotDisplayed(errorMsg);
});