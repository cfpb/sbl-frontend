// Don't know why this obviously populated file is being interpreted as "empty" but adding the following rule exemption for my sanity
/* eslint-disable unicorn/no-empty-file */
describe('Basic flow', () => {
  beforeEach(() => {
    cy.viewport('macbook-13');
  });

  it('Should render the homepage', () => {
    cy.visit('/');

    cy.findByText('Get started filing your lending data').should('be.visible');
  });
});

describe('axe-core', () => {

  Cypress.Commands.overwrite('injectAxe', () => {
    cy.task('getAxeSource').then(axeSource =>
      cy.window({ log: false }).then(window => {
        const script = window.document.createElement('script');
        script.innerHTML = axeSource;
        window.document.head.append(script);
      }),
    );
  });

  beforeEach(() => {
    cy.viewport('macbook-13');
  });

  it('Should render the homepage without accessibility errors', () => {
    cy.visit('/');
    cy.injectAxe();

    cy.checkA11y();
  });
});
