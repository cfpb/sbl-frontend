import FormParagraph from 'components/FormParagraph';
import { Heading } from 'design-system-react';
import type { ReactNode } from 'react';

export interface SectionIntroProperties {
  // TODO: chore(linting): set react/require-default-props function property to defaultArguments
  // https://github.com/cfpb/sbl-frontend/issues/355
  // eslint-disable-next-line react/require-default-props
  heading?: ReactNode;
  children: ReactNode;
}

function SectionIntro({
  heading = null,
  children = '',
}: SectionIntroProperties): JSX.Element {
  return (
    <div className='mb-[1.875rem] box-border max-w-[41.875rem]'>
      {heading ? <Heading type='2'>{heading}</Heading> : null}
      <FormParagraph>{children}</FormParagraph>
    </div>
  );
}

export default SectionIntro;
