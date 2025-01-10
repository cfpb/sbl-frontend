import { render, screen } from '@testing-library/react';
import SectionIntro from 'components/SectionIntro';

describe('<SectionIntro />', () => {
  it('Renders expected content', async () => {
    render(
      <SectionIntro data-testid='test' id='test'>
        {undefined}
      </SectionIntro>,
    );
    expect(screen.getByTestId('test')).toBeInTheDocument();
  });

  it('Renders expected heading content', async () => {
    render(
      <SectionIntro data-testid='test' id='test' heading='test heading'>
        {undefined}
      </SectionIntro>,
    );
    expect(screen.getByText('test heading')).toBeInTheDocument();
  });

  it('Renders expected child content', async () => {
    render(
      <SectionIntro data-testid='test' id='test'>
        <span>test content</span>
      </SectionIntro>,
    );
    expect(screen.getByText('test content')).toBeInTheDocument();
  });
});
