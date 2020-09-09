import { browser, $ } from 'protractor';

export class AppPage {
  navigateToLandingPage() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  navigateToAddContact() {
    return browser.get(browser.baseUrl + 'addContact');
  }

  // function to get app-contact element
  getAppContact() {
    return $('app-contact');
  }

  // function to get navbar
  getNavbar() {
    return $('nav');
  }

  // function to get card-deck
  getCardDeck() {
    return this.getAppContact().$('div[class="container"]').$$('div').first();
  }

  // function to get card-body
  getCardBody() {
    return this.getCardDeck().$$('div[class="card-body"]').first();
  }

  // function to get card-footer
  getCardFooter() {
    return this.getCardDeck().$$('div[class="card-footer"]').first();
  }

  // function to get form element
  getForm() {
    return $('form');
  }

}
