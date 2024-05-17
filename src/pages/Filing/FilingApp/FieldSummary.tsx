import SectionIntro from 'components/SectionIntro';
import FieldEntry from 'pages/Filing/FilingApp/FieldEntry';
import type { ReactNode } from 'react';
import type { Detail } from 'types/filingTypes';

interface FieldProperties {
  fieldArray: Detail[];
  heading: string;
  bottomMargin?: boolean;
  children: ReactNode;
  id: string;
}

function FieldSummary({
  heading,
  fieldArray,
  bottomMargin,
  children,
  id,
  className,
}: FieldProperties & JSX.IntrinsicElements['div']): JSX.Element {
  return (
    <div
      id={id}
      className={`mb-[2.8125rem] ${
        bottomMargin ? 'mb-[3.75rem]' : ''
      } ${className}`}
    >
      <SectionIntro heading={heading}>{children}</SectionIntro>
      {fieldArray.map(fieldObject => (
        <FieldEntry key={fieldObject.validation.id} fieldObject={fieldObject} />
      ))}
    </div>
  );
}

FieldSummary.defaultProps = {
  bottomMargin: false,
};

export default FieldSummary;
