import { render, screen } from '@testing-library/react';
import SectionIntro from 'components/SectionIntro';

describe('<SectionIntro />', () => {
  it('Renders expected content', async () => {
    render(
      <SectionIntro data-testid='test' id='test'>
        <></>
      </SectionIntro>,
    );
    expect(screen.getByTestId('test')).toBeInTheDocument();
  });
});
