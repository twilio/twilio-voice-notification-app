describe('Login', () => {
  before(() => {
    cy.visit('http://localhost:3000');
  });

  it('does render the page', () => {
    cy.findByText(/Send notifications to your customers over the phone/i).should(
      'be.visible'
    );
  });

  it('should be disabled the authenticated button', () => {
    cy.findByTestId(/login-button/).should('be.disabled');
  });

  it('should be enabled the authentication button when the input is not empty', () => {
    const input = cy.findByTestId(/passcode-input/);
    input.type('test');
    cy.findByTestId(/login-button/).should('not.be.disabled');
  });

  it('should fail when the passcode is incorrect', () => {
    cy.findByTestId(/login-button/).click();
    cy.findByText(/Invalid passcode/).should('be.visible');
  });

  it('should redirect to /broadcasts page when the login is sucessful', () => {
    const input = cy.findByLabelText(/Enter your passcode/);
    const passcode = Cypress.env('PASSCODE');
    input.clear().type(passcode);
    cy.findByTestId(/login-button/).click();
    cy.url().should('contain', '/broadcasts');
  });
});
