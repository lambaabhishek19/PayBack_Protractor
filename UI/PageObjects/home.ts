import { element, by, ElementFinder, browser } from "protractor";

export class LandingPage {
    private registerBtn: ElementFinder;
    private acceptCookiesBtn: ElementFinder;

    constructor() {
        this.acceptCookiesBtn = element(by.id('onetrust-accept-btn-handler'));
        this.registerBtn = element(by.className('pb-navigation__menu_register'));
    }

    async openRegistrationPage() {
        await this.registerBtn.click();
    }
    async acceptCookies() {
        await browser.sleep(500)
        await this.acceptCookiesBtn.click();
    }
}