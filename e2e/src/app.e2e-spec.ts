import { AppPage } from './app.po';
import { browser, logging, $, $$ } from 'protractor';

describe('contact-book App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should have a nav element with bootstrap class "navbar"', () => {
    page.navigateToLandingPage();
    expect(page.getNavbar().getAttribute('class')).toContain('navbar');
  });

  it('should have navbar with anchor element with bootstrap class "navbar-brand"', () => {
    expect(page.getNavbar().$$('a').first().getText()).toEqual('ContactBook');
  });

  it('should have navbar which is collapsable', () => {
    expect(page.getNavbar().$('div[id="navbarSupportedContent"]').getAttribute('class')).toContain('collapse navbar-collapse');
  });

  it('should have navbar with anchor element that routes to "addContact"', () => {
    expect(page.getNavbar().$('a[class="nav-link"]').getAttribute('routerlink')).toEqual('addContact');
    expect(page.getNavbar().$('a[class="nav-link"]').getText()).toEqual('Add Contact');
  });

  it('should have navbar with input element that searches through all contacts using angular pipe', () => {
    expect(page.getNavbar().$('input[placeholder="Contact search"]')).toBeTruthy();
  });

  it('should have a boostrap card deck with cards', () => {
    expect(page.getCardDeck().$$('div[class="card"]').first()).toBeTruthy();
  });

  it('should have a boostrap card with edit icon button', () => {
    expect(page.getCardBody().$('button[class="btn float-right"]').getAttribute('data-toggle')).toEqual('modal');
    expect(page.getCardBody().$('span').getAttribute('class')).toContain('fa fa-pencil-square-o fa-2x');
  });

  it('should have a boostrap card with delete button in footer', () => {
    expect(page.getCardFooter().$('button[class="btn btn-danger float-right"]').getText()).toEqual('Delete');
  });

  it('should have a boostrap card with name, email, contact number and complete address', () => {
    expect(page.getCardBody().$('#name').getAttribute('class')).toEqual('card-title');
    expect(page.getCardBody().$('#address').getAttribute('class')).toEqual('card-text');
    expect(page.getCardBody().$('#address').getTagName()).toEqual('p');
    expect(page.getCardBody().$('#number').getTagName()).toEqual('h5');
    expect(page.getCardBody().$('#email').getTagName()).toEqual('h5');
  });

  it('should have open boostrap modal when edit icon button is clicked', () => {
    page.getCardBody().$('button[class="btn float-right"]').click();
    expect($('body').getAttribute('class')).toEqual('modal-open');
    expect($('div[class="modal-body"]').isPresent()).toBeTruthy();
    expect(page.getForm().isPresent()).toBeTruthy();
  });

  it('should have a boostrap form to add contact with validators', () => {
    page.navigateToAddContact();
    expect($('#inputName').getAttribute('formcontrolname')).toEqual('name');
    expect($('#inputEmail').getAttribute('formcontrolname')).toEqual('email');
    expect($('#inputContactNumber').getAttribute('formcontrolname')).toEqual('contactNumber');
    expect($('#inputBuildingNumber').getAttribute('formcontrolname')).toEqual('buildingNumber');
    expect($('#inputStreet').getAttribute('formcontrolname')).toEqual('street');
    expect($('#inputArea').getAttribute('formcontrolname')).toEqual('area');
    expect($('#inputCity').getAttribute('formcontrolname')).toEqual('city');
    expect($('#inputState').getAttribute('formcontrolname')).toEqual('state');
    expect($('#inputZip').getAttribute('formcontrolname')).toEqual('zip');
  });


  it('should have a boostrap form inputs that throw required validation error', () => {
    $('#inputName').click();
    $('body').click();
    expect($('div[class="invalid-feedback"]').getText()).toEqual('name is required');
    $('#inputEmail').click();
    $('body').click();
    expect($$('div[class="invalid-feedback"]').get(1).getText()).toEqual('email is required');
    $('#inputContactNumber').click();
    $('body').click();
    expect($$('div[class="invalid-feedback"]').get(2).getText()).toEqual('contact number is required');
    $('#inputBuildingNumber').click();
    $('body').click();
    expect($$('div[class="invalid-feedback"]').get(3).getText()).toEqual('building number is required');
    $('#inputStreet').click();
    $('body').click();
    expect($$('div[class="invalid-feedback"]').get(4).getText()).toEqual('street is required');
    $('#inputArea').click();
    $('body').click();
    expect($$('div[class="invalid-feedback"]').get(5).getText()).toEqual('area is required');
    $('#inputCity').click();
    $('body').click();
    expect($$('div[class="invalid-feedback"]').get(6).getText()).toEqual('city is required');
    $('#inputState').click();
    $('body').click();
    expect($$('div[class="invalid-feedback"]').get(7).getText()).toEqual('state is required');
    $('#inputZip').click();
    $('body').click();
    expect($$('div[class="invalid-feedback"]').get(8).getText()).toEqual('zip is required');
  });

  it('should have a boostrap form email input that throw email validation error', () => {
    $('#inputEmail').sendKeys('john');
    $('body').click();
    expect($$('div[class="invalid-feedback"]').get(1).getText()).toEqual('email must be a valid email Address');
    $('#inputEmail').clear();
    $('#inputEmail').sendKeys('john@');
    $('body').click();
    expect($$('div[class="invalid-feedback"]').get(1).getText()).toEqual('email must be a valid email Address');
    $('#inputEmail').clear();
    $('#inputEmail').sendKeys('john@email.');
    $('body').click();
    expect($$('div[class="invalid-feedback"]').get(1).getText()).toEqual('email must be a valid email Address');
  });

  it('should have a boostrap form contact number input that throw minlength and maxlength validation error', () => {
    $('#inputContactNumber').sendKeys('1234567');
    $('body').click();
    expect($$('div[class="invalid-feedback"]').get(2).getText()).toEqual('contact number contains less than 10 digits');
    $('#inputContactNumber').sendKeys('3456');
    $('body').click();
    expect($$('div[class="invalid-feedback"]').get(2).getText()).toEqual('contact number contains more than 10 digits');
  });

  it('should have a boostrap form inputs that throw number pattern validation error', () => {
    $('#inputContactNumber').clear();
    $('#inputContactNumber').sendKeys('123456789m');
    $('body').click();
    expect($$('div[class="invalid-feedback"]').get(2).getText()).toEqual('contact number is not valid');
    $('#inputBuildingNumber').clear();
    $('#inputBuildingNumber').sendKeys('p234');
    $('body').click();
    expect($$('div[class="invalid-feedback"]').get(3).getText()).toEqual('building number is not valid');
    $('#inputZip').clear();
    $('#inputZip').sendKeys('p2345');
    $('body').click();
    expect($$('div[class="invalid-feedback"]').get(8).getText()).toEqual('zip is not valid');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE,
      } as logging.Entry)
    );
  });

});
