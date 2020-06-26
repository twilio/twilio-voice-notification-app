describe('Configure', () => {
  const broadcast = {
    name: `test_${new Date().getTime()}`,
    message: 'this is a test message',
    from: '+35625211106',
    to: 'numbers.txt',
  };

  before(() => {
    cy.visit('http://localhost:3000');
  });

  it('should login', () => {
    const input = cy.findByLabelText(/Enter your passcode/);
    const passcode = Cypress.env('PASSCODE');

    input.clear().type(passcode);

    cy.findByTestId(/login-button/).click();
    cy.url().should('contain', '/broadcasts');
  });

  it('should display broadcast page', () => {
    cy.findByText(/My Voice Notifications/i).should('be.visible');
    cy.findByText(/New Voice Notification/i).should('be.visible');
  });

  it('should redirect to create a new broadcast', () => {
    cy.findByRole('button').click();
    cy.url().should('contain', '/create/configure');
  });

  it('should render configure page', () => {
    cy.findByText(/1\. Configure/i).should('be.visible');
  });

  it('should not allow to go the next step if all fields are not fulfilled', () => {
    cy.findByTestId('select-id').parents('.MuiFormControl-root').click();
    cy.findByText(broadcast.from).click({ force: true });
    cy.findByLabelText(/Broadcast Message/i).type(broadcast.message);
    cy.findByText(/Next/).parent().should('be.disabled');
  });

  it('should allow us to click next button when all fileds are fulfilled', () => {
    cy.findByLabelText(/Notification Name/i).type(broadcast.name);
    const nextBtn = cy.findByTestId('next-button');
    nextBtn.should('not.be.disabled');
    nextBtn.click();
    cy.url().should('contain', '/create/recipients');
  });

  it('should display recipients page', () => {
    cy.findByText(/2\. Recipients List/i).should('be.visible');
  });

  it('should have disable the next button', () => {
    cy.findByTestId('next-button').should('be.disabled');
  });

  it('should allow us to upload a file', () => {
    cy.get('[type=file]').attachFile(broadcast.to);
    cy.findByText(/\+34625211107/i).should('be.visible');
    cy.findByText(/The list of recipients is successfully loaded./i).should('be.visible');
    cy.findByTestId('next-button').should('not.be.disabled');
  });

  it('should allow us to navigate to the next page', () => {
    cy.findByTestId('next-button').click();
    cy.url().should('contain', '/create/review');
  });

  it('should render the review page', () => {
    cy.contains(broadcast.name).should('be.visible');
    cy.contains(broadcast.message).should('be.visible');
    cy.contains(broadcast.from).should('be.visible');

    cy.findByText(/\+34625211107/i).should('be.visible');
    cy.findByTestId('send-notification')
      .should('not.be.disabled');
  });

  it('should allow to create the broadcast', () => {
    cy.findByTestId('send-notification')
      .click();

    cy.url().should('contain', '/broadcasts');
  });

  it('should display the broadcast instance page', () => {
    cy.url().should('contain', '/broadcasts');

    cy.contains(broadcast.name).should('be.visible');
    cy.contains(broadcast.message).should('be.visible');
    cy.contains(broadcast.from).should('be.visible');

    cy.findByText(/\+34625211107/i).should('be.visible');

    cy.findByText(/Cancel Notification/i)
      .parent()
      .should('not.be.disabled');

    cy.findByText(/back/i).parent().click();
  });

  it('should display the broadcast list page with one broadcast', () => {
    cy.url().should('contain', '/broadcasts');
    cy.contains(broadcast.name).should('be.visible');
    cy.contains(/in-progress/i).should('be.visible');

    cy.findAllByText(/view report/i)
      .eq(0)
      .parent()
      .click();
  });
});
