import FormParagraph from 'components/FormParagraph';
import { Heading } from 'design-system-react';
import type { ReactNode } from 'react';

export interface SectionIntroProperties {
  heading?: ReactNode;
  children: ReactNode;
}

function SectionIntro({
  heading = null,
  children = '',
  className,
  ...other
}: JSX.IntrinsicElements['div'] & SectionIntroProperties): JSX.Element {
  return (
    <div
      className={`mb-[1.875rem] box-border max-w-[41.875rem] ${className}`}
      {...other}
    >
      {heading ? <Heading type='2'>{heading}</Heading> : null}
      <FormParagraph>{children}</FormParagraph>
    </div>
  );
}

export default SectionIntro;
