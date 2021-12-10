Feature: Registration for Payback

    @e2e
    Scenario Outline: Verify registration process
        Given Go to Url <Url>
        And User accept all cookies
        When User clicks on register button
        And Selects no payback card radio button
        And Select payback card <paybackCard>
        And User selects next button
        Then Email and Pin text box appears
        When User enter an email id as "xypf@mail.com"
        And User enter Pin as 1234
        And User selects next button
        Then Sign up Label "E-Mail" has value "xypf@mail.com"
        When User selects gender as "Male"
        And User enters first name as "Abhi"
        And User enters last name as "XYz"
        And User enters Dob 23 as date 10 as month and 1990 as year
        And User enters street as "abc"
        And User enters floor <floorIdentifier> as 5
        And User enters zipcode as 12345
        And User enters city as "Munich"
        And User select country <countryIdentifier> as country <countryName>
        And User selects next button
        Then Sign up Label <label> has value "23.10.1990"


        Examples:
            | Url                       | paybackCard          | floorIdentifier | countryIdentifier | countryName   | label             |
            | 'https://www.payback.at/' | 'atBPWelcome'        | 'floor'         | 'country'         | 'Deutschland' | 'Geburtsdatum'    |
            | 'https://www.payback.it/' | 'PBOnlRegSingleCard' | 'houseNumber'   | 'province'        | 'Ancona'      | 'Data di nascita' |

    @e2e
    Scenario Outline: Verify proper error messages are displayed on registration page
        Given Go to Url <Url>
        And User accept all cookies
        When User clicks on register button
        And Selects no payback card radio button
        And Select payback card <paybackCard>
        And User selects next button
        Then Email and Pin text box appears
        And User selects next button
        Then Error message <EmailErrorMsg> is displayed
        And Error message <PinErrorMsg> is displayed
        When User enter an email id as "xypf@mail.com"
        Then Error message <EmailErrorMsg> is not displayed
        When User enter Pin as 1234
        Then Error message <PinErrorMsg> is not displayed


        Examples:
            | Url                       | EmailErrorMsg                                     | PinErrorMsg                                     | GenderErrorMsg                   | paybackCard          |
            | 'https://www.payback.at/' | Bitte geben Sie Ihre E-Mail-Adresse ein (inkl. @) | Bitte geben Sie einen 4-stelligen (0-9) PIN ein | Bitte wählen Sie eine Anrede aus | 'atBPWelcome'        |
            #| 'https://www.payback.it/' | Per favore, controlla l'indirizzo e-mail inserito | Per favore, ricontrolla il PIN inserito         | Bitte wählen Sie eine Anrede aus | 'PBOnlRegSingleCard' |
