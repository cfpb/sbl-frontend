import { Heading } from 'design-system-react';
import FormParagraph from 'components/FormParagraph';

interface SectionIntroProperties {
  heading: ReactNode;
  text: ReactNode;
}

function SectionIntro({
  heading = '',
  text = '',
}: SectionIntroProperties): JSX.Element {
  return (
    <div className='mb-[1.625rem] max-w-[48.125rem]'>
      <Heading type='2'>{heading}</Heading>
      <FormParagraph>{text}</FormParagraph>
    </div>
  );
}

export default SectionIntro;
