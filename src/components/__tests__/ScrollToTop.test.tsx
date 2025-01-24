import { vi } from 'vitest';
import { render } from '@testing-library/react';
import ScrollToTop from 'components/ScrollToTop';
import type { Location } from 'react-router';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as ReactRouter from 'react-router';
import { useLocation } from 'react-router-dom';

const location: Location = {
  state: null,
  key: 'default',
  pathname: '/test',
  search: '',
  hash: '',
};

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return {
    // @ts-expect-error This is standard testing methodology
    ...actual,
    useLocation: vi.fn().mockImplementation(() => location),
  };
});

describe('<ScrollToTop />', () => {
  it('Renders expected content', async () => {
    const oldLocation: Location = {
      state: null,
      key: 'default',
      pathname: '/test',
      search: '',
      hash: '',
    };
    const newLocation: Location = {
      state: null,
      key: 'default',
      pathname: '/test-new',
      search: '',
      hash: '',
    };

    const scrollToMock = vi.spyOn(window, 'scrollTo');
    const useLocationMock = vi.spyOn(ReactRouter, 'useLocation');
    // @ts-expect-error This is standard testing methodology
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    useLocation.mockImplementation(() => oldLocation);
    useLocationMock.mockImplementation(() => oldLocation);

    expect(window.scrollTo).not.toHaveBeenCalled();
    const { rerender } = render(<ScrollToTop />);
    expect(window.scrollTo).toHaveBeenCalled();
    scrollToMock.mockReset();

    expect(window.scrollTo).not.toHaveBeenCalled();
    // @ts-expect-error This is standard testing methodology
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    useLocation.mockClear();
    // @ts-expect-error This is standard testing methodology
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    useLocation.mockImplementation(() => newLocation);
    useLocationMock.mockClear();
    useLocationMock.mockImplementation(() => newLocation);

    rerender(<ScrollToTop />);
    expect(window.scrollTo).toHaveBeenCalled();
  });
});
