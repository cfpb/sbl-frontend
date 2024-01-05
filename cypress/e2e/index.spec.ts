function get(id: string): ReturnType<typeof cy.get> {
  return cy.findByTestId(id);
}

describe('Basic flow', () => {
  beforeEach(() => {
    cy.viewport('macbook-13');
  });

  it('Should render the homepage', () => {
    cy.visit('/');

    cy.contains('Get started filing your small business lending data').should(
      'be.visible',
    );
  });
});
