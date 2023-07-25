import { render, screen } from '@testing-library/react';
import type ReactRouterDOM from 'react-router-dom';
import Header from '../Header';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual<typeof ReactRouterDOM>('react-router-dom')),
  useNavigate: (): typeof mockNavigate => mockNavigate
}));

function renderHeader(): void {
  render(<Header />);
}

describe('<Header />', () => {
  it('renders', () => {
    renderHeader();

    expect(screen.getByText('Skip to main content')).toBeInTheDocument();
    expect(screen.getByText('Small Business Lending')).toBeInTheDocument();
  });
});
