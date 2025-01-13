import { render, screen } from '@testing-library/react';
import TextInput from 'components/TextInput';
import {
  DefaultInputCharLimit,
  EmailInputCharLimit,
  PhoneInputCharLimit,
  UrlInputCharLimit,
} from 'utils/constants';

describe('<TextInput />', () => {
  it('Renders expected content', async () => {
    render(<TextInput data-testid='test' id='test' name='test' />);
    const input = screen.getByTestId('test');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('maxLength', String(DefaultInputCharLimit));
  });

  it('Renders expected content - empty type', async () => {
    // @ts-expect-error This is a test that exists to test an otherwise unreachable default case
    render(<TextInput data-testid='test' id='test' name='test' type='' />);
    const input = screen.getByTestId('test');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('maxLength', String(DefaultInputCharLimit));
  });

  it('Has correct char limit - positive manual limit', async () => {
    render(
      <TextInput data-testid='test' id='test' name='test' maxLength={261} />,
    );
    const input = screen.getByTestId('test');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('maxLength', '261');
  });

  it('Has correct char limit - negative manual limit', async () => {
    render(
      <TextInput data-testid='test' id='test' name='test' maxLength={-1} />,
    );
    const input = screen.getByTestId('test');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('maxLength', String(DefaultInputCharLimit));
  });

  it('Has correct char limit - url', async () => {
    render(<TextInput data-testid='test' id='test' name='test' type='url' />);
    const input = screen.getByTestId('test');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('maxLength', String(UrlInputCharLimit));
  });

  it('Has correct char limit - tel', async () => {
    render(<TextInput data-testid='test' id='test' name='test' type='tel' />);
    const input = screen.getByTestId('test');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('maxLength', String(PhoneInputCharLimit));
  });

  it('Has correct char limit - email', async () => {
    render(<TextInput data-testid='test' id='test' name='test' type='email' />);
    const input = screen.getByTestId('test');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('maxLength', String(EmailInputCharLimit));
  });

  it('Has correct char limit - number', async () => {
    render(
      <TextInput data-testid='test' id='test' name='test' type='number' />,
    );
    const input = screen.getByTestId('test');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('maxLength', String(DefaultInputCharLimit));
  });

  it('Has correct char limit - password', async () => {
    render(
      <TextInput data-testid='test' id='test' name='test' type='password' />,
    );
    const input = screen.getByTestId('test');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('maxLength', String(DefaultInputCharLimit));
  });

  it('Has correct char limit - search', async () => {
    render(
      <TextInput data-testid='test' id='test' name='test' type='search' />,
    );
    const input = screen.getByTestId('test');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('maxLength', String(DefaultInputCharLimit));
  });

  it('Has correct char limit - text', async () => {
    render(<TextInput data-testid='test' id='test' name='test' type='text' />);
    const input = screen.getByTestId('test');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('maxLength', String(DefaultInputCharLimit));
  });
});
