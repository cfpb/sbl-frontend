// Don't know why this obviously populated file is being interpreted as "empty" but adding the following rule exemption for my sanity
/* eslint-disable unicorn/no-empty-file */
describe('Basic flow', () => {
  beforeEach(() => {
    cy.viewport('macbook-13');
  });

  it('Should render the homepage', () => {
    cy.visit('/');

    cy.findByText('Get started filing your small business lending data').should(
      'be.visible',
    );
  });
});
