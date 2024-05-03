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
}: FieldProperties): JSX.Element {
  return (
    <div id={id} className={bottomMargin ? 'mb-[3.75rem]' : ''}>
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
