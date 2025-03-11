import { render, screen } from '@testing-library/react';
import AlertApiUnavailable from 'components/AlertApiUnavailable';
import { AuthProvider } from 'react-oidc-context';
import { MemoryRouter } from 'react-router-dom';
import { sblHelpMail } from 'utils/common';

describe('<AlertApiUnavailable />', () => {
  it('Renders default content', async () => {
    const message = 'Unable to connect at the moment';
    const href = sblHelpMail;

    render(
      <AuthProvider>
        <MemoryRouter>
          <AlertApiUnavailable />,
        </MemoryRouter>
      </AuthProvider>,
    );

    expect(screen.getByText(message)).toBeInTheDocument();

    expect(
      screen.getByRole('link', { name: 'email our support staff' }),
    ).toHaveAttribute('href', href);
  });

  it('Renders custom message and link target', async () => {
    const message = 'test alert message';
    const href = '/bad/url/';

    render(
      <AuthProvider>
        <MemoryRouter>
          <AlertApiUnavailable message={message} href={href} />,
        </MemoryRouter>
      </AuthProvider>,
    );

    expect(screen.getByText(message)).toBeInTheDocument();

    expect(
      screen.getByRole('link', { name: 'email our support staff' }),
    ).toHaveAttribute('href', href);
  });
});
