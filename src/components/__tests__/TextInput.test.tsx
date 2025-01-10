import { render, screen } from '@testing-library/react';
import TextInput from 'components/TextInput';

describe('<TextInput />', () => {
  it('Renders expected content', async () => {
    render(<TextInput data-testid='test' id='test' name='test' />);
    expect(screen.getByTestId('test')).toBeInTheDocument();
  });
});
