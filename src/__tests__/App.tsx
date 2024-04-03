import { screen, waitFor } from '@testing-library/react';
import App from 'App';
import renderWithProviders from 'testUtils';

describe('<App />', () => {
  it('renders', async () => {
    window.history.pushState({}, 'Home', '/');
    renderWithProviders(<App />, false);

    await waitFor(() => {
      expect(
        screen.getAllByText('Get started filing your lending data')[0],
      ).toBeInTheDocument();
    });
  });
});
