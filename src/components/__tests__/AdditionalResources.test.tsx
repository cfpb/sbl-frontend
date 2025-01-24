import { render, screen } from '@testing-library/react';
import AdditionalResources from 'components/AdditionalResources';
import { ListLink } from 'components/Link';
import { AuthProvider } from 'react-oidc-context';
import { MemoryRouter } from 'react-router-dom';

describe('<AdditionalResources />', () => {
  it('Renders expected content', async () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <AdditionalResources>
            <ListLink href='first-link'>First link</ListLink>
            <ListLink href='second-link'>Second link</ListLink>
          </AdditionalResources>
        </MemoryRouter>
      </AuthProvider>,
    );

    // Heading
    expect(
      screen.getByText('Additional resources', { selector: 'h4' }),
    ).toBeInTheDocument();

    // Links
    for (const link of [
      { name: 'First link', href: '/first-link' },
      { name: 'Second link', href: '/second-link' },
    ]) {
      const element = screen.getByRole('link', { name: link.name });
      expect(element).toBeInTheDocument();
      expect(element).toHaveAttribute('href', link.href);
    }
  });
});
