import { browser, Config } from "protractor";
export const config: Config = {

  allScriptsTimeout: 100000,

  multiCapabilities: [{
    'browserName': 'chrome',
    chromeOptions: {
      args: ['--headless', '--window-size=1920,1080']
    }
  }, {
    'browserName': 'chrome',
    chromeOptions: {
      args: ['incognito']
    }
  }],
  maxSessions: 2,
  // set to "custom" instead of cucumber.
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),

  // require feature files
  specs: [
    '../featurefiles/*.feature'
  ],

  restartBrowserBetweenTests: true,
  onPrepare: () => {
    browser.manage().deleteAllCookies();
    browser.manage().window().maximize();
  },


  cucumberOpts: {
    // require step definitions
    require: [
      '../transpiled/StepDef/*.js'
    ],
    tags: ['@e2e']
  },
};