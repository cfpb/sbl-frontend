import { screen } from '@testing-library/react';
import HomePage from 'pages/Filing/FilingApp';
import renderWithProviders from 'testUtils';

describe('<Home />', () => {
  it('renders', async () => {
    window.history.pushState({}, 'Home', '/');
    renderWithProviders(<HomePage />, false);

    expect(
      screen.getAllByText('Small Business Lending')[0],
    ).toBeInTheDocument();
  });
});
