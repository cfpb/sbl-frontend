import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import Uploader from 'components/Uploader';
import type ReactRouterDOM from 'react-router-dom';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual<typeof ReactRouterDOM>('react-router-dom')),
  useNavigate: (): typeof mockNavigate => mockNavigate,
}));

function renderUploader(): void {
  const queryClient = new QueryClient();
  render(
    <QueryClientProvider client={queryClient}>
      <Uploader token='123456' setter={(): void => {}} />
    </QueryClientProvider>,
  );
}

describe('<Uploader />', () => {
  it('renders', () => {
    renderUploader();

    expect(
      screen.getByText('Select one or more CSV files'),
    ).toBeInTheDocument();
  });
});
