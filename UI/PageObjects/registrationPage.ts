import { element, by, ElementFinder, ElementArrayFinder, browser } from "protractor";
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;
export class RegistrationPage {
    private noCardRdBtn: ElementFinder;
    private nextBtn: ElementArrayFinder;
    private emailTxtBox: ElementFinder;
    private pinTxtBox: ElementFinder;
    private salutationDropDown: ElementFinder;
    private firstNameTxtBox: ElementFinder;
    private lastNameTxtBox: ElementFinder;
    private dobTxtBox: ElementFinder;
    private dobDayTxtBox: ElementFinder;
    private dobMonthTxtBox: ElementFinder;
    private dobYearTxtBox: ElementFinder;
    private streetTxtBox: ElementFinder;
    private floorTxtBox: ElementFinder;
    private zipCodeTxtBox: ElementFinder;
    private cityTxtBox: ElementFinder;
    private countryDropDown: ElementFinder;

    private signUpOverviewLbl: ElementArrayFinder;
    private errorMsgTxt: ElementArrayFinder;

    constructor() {
        this.noCardRdBtn = element.all((by.className('pb-radio__icon'))).last();
        this.nextBtn = element.all(by.className('js__sign-up-continue-btn'));
        this.emailTxtBox = element(by.id('email'));
        this.pinTxtBox = element(by.id('pin'));
        this.salutationDropDown = element(by.id('salutation'));
        this.firstNameTxtBox = element(by.id('firstName'));
        this.lastNameTxtBox = element(by.id('lastName'));
        this.dobTxtBox = element(by.className('js__input-dob-pseudo-input'));
        this.dobDayTxtBox = element(by.className('js__input-dob-day'))
        this.dobMonthTxtBox = element(by.className('js__input-dob-month'))
        this.dobYearTxtBox = element(by.className('js__input-dob-year'))
        this.streetTxtBox = element(by.id('street'));
        this.zipCodeTxtBox = element(by.id('zipCode'));
        this.cityTxtBox = element(by.id('city'));
        this.signUpOverviewLbl = element.all(by.className('pb-sign-up-overview-label'));
        this.errorMsgTxt = element.all(by.className('pb-form-field__error-msg'))
    }
    async selectNoCardRdBtn() {
        await this.noCardRdBtn.click();
    }
    async selectCardById(cardName: string) {
        await element.all(by.css(`[data-id=${cardName}]`)).get(1).click();
    }
    async selectNextBtn() {
        await this.nextBtn.filter(function (elem) {
            return elem.isDisplayed()
        }).first().click();
    }
    async emailAndPinTxtBoxIsDisplayed() {
        expect(await this.emailTxtBox.isDisplayed()).to.be.true;
        expect(await this.pinTxtBox.isDisplayed()).to.be.true;
    }
    async enterEmail(email: string) {
        await this.emailTxtBox.sendKeys(email);
        await browser.sleep(500)
    }
    async enterPin(pin: number) {
        await this.pinTxtBox.sendKeys(pin);
    }
    async selectSalutation(gender: string) {
        await this.salutationDropDown.click();
        if (gender === 'Male') {
            await this.salutationDropDown.all(by.tagName('option')).get(2).click();
        } else {
            await this.salutationDropDown.all(by.tagName('option')).get(1).click();
        }
    }
    async enterFirstName(name: string) {
        await this.firstNameTxtBox.sendKeys(name)
    }
    async enterlastName(name: string) {
        await this.lastNameTxtBox.sendKeys(name)
    }
    async enterDob(date: number, month: number, year: number) {
        await this.dobTxtBox.click();
        await this.dobDayTxtBox.sendKeys(date);
        await this.dobMonthTxtBox.sendKeys(month);
        await this.dobYearTxtBox.sendKeys(year);
    }
    async enterStreet(street: string) {
        await this.streetTxtBox.sendKeys(street)
    }
    async enterFloor(identifier: string, floor: number) {
        this.floorTxtBox = element(by.id(`${identifier}`));
        await this.floorTxtBox.sendKeys(floor);
    }
    async enterZipCode(zipCode: number) {
        await this.zipCodeTxtBox.sendKeys(zipCode)
    }
    async enterCity(city: string) {
        await this.cityTxtBox.sendKeys(city)
    }
    async selectCountry(countryIdentifier: string, country: string) {
        this.countryDropDown = element(by.id(countryIdentifier))
        await this.countryDropDown.click();
        await this.countryDropDown.all(by.tagName('option'))
            .filter(elem => elem.getText()
                .then(text => text.includes(country)))
            .first().click();
    }
    async signUpLblValueVerification(lbl: string, value: string) {
        let element = await this.signUpOverviewLbl.filter(elem => elem.getText()
            .then(text => text.includes(lbl))).first();
        let text = await element.element(by.xpath('following-sibling::div[1]')).getText();
        await expect(text).to.contains(value);
    }

    async errorMsgIsDisplayed(msg: string) {
        const element = await this.errorMsgTxt.filter(elem => elem.getText()
            .then(text => text.includes(msg))).first();
        expect(await element.isDisplayed()).to.be.true;
    }
    async errorMsgIsNotDisplayed(msg: string) {
        // console.log('lebgh is ' + (await this.errorMsgTxt).length);
        // await this.errorMsgTxt.each(function(element, index) {
        //     // Will print 0 First, 1 Second, 2 Third.
        //     element.getText().then(function (text) {
        //       console.log(index, text);
        //     })
        // })
        const element = await this.errorMsgTxt.filter(elem => elem.getText()
            .then(text => text.includes(msg))).first();
        await browser.sleep(500)
        expect(await element.isPresent()).to.be.false;
    }
}