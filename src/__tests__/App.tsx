import { screen, waitFor } from '@testing-library/react';
import App from 'App';
import renderWithProviders from 'testUtils';

describe('<App />', () => {
  it('renders', async () => {
    window.history.pushState({}, 'Home', '/');
    renderWithProviders(<App />, false);

    await waitFor(() => {
      expect(
        screen.getAllByText(
          'Get started filing your mortgage or small business lending data',
        )[0],
      ).toBeInTheDocument();
    });
  });
});
