import { render, screen } from '@testing-library/react';
import WarningErrorIcon from 'components/WarningErrorIcon';

describe('<WarningErrorIcon />', () => {
  it('Renders expected content', async () => {
    render(<WarningErrorIcon />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});
