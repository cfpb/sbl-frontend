import { render, screen } from '@testing-library/react';
import ScreenReaderOnly from 'components/ScreenReaderOnly';

describe('<ScreenReaderOnly />', () => {
  it('Renders expected content', async () => {
    render(<ScreenReaderOnly>test children</ScreenReaderOnly>);
    expect(screen.getByText('test children')).toBeInTheDocument();
  });
});
