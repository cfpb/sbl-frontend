import { screen } from '@testing-library/react';
import App from 'App';
import renderWithProviders from 'testUtils';

describe('<App />', () => {
  it('renders', async () => {
    window.history.pushState({}, 'Home', '/');
    renderWithProviders(<App />, false);

    expect(
      screen.getAllByText('Small Business Lending')[0]
    ).toBeInTheDocument();
  });
});
