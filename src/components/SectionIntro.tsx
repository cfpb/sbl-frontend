import { Heading } from 'design-system-react';
import FormParagraph from 'components/FormParagraph';

interface SectionIntroProperties {
  heading: ReactNode;
  children: ReactNode;
}

function SectionIntro({
  heading = '',
  children = '',
}: SectionIntroProperties): JSX.Element {
  return (
    <div className='mb-[1.625rem] max-w-[48.125rem]'>
      <Heading type='2'>{heading}</Heading>
      <FormParagraph>{children}</FormParagraph>
    </div>
  );
}

export default SectionIntro;
