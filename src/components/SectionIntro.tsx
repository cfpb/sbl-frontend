import FormParagraph from 'components/FormParagraph';
import { Heading } from 'design-system-react';
import type { ReactNode } from 'react';

interface SectionIntroProperties {
  heading: ReactNode;
  children: ReactNode;
}

function SectionIntro({
  heading = '',
  children = '',
}: SectionIntroProperties): JSX.Element {
  return (
    <div className='mb-[1.875rem] box-border max-w-[41.875rem]'>
      <Heading type='2'>{heading}</Heading>
      <FormParagraph>{children}</FormParagraph>
    </div>
  );
}

export default SectionIntro;
