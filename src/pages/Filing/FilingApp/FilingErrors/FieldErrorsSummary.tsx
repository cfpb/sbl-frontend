import SectionIntro from 'components/SectionIntro';
import type { ReactNode } from 'react';
import type { Detail } from 'types/filingTypes';
import FieldErrorsEntry from './FieldErrorsEntry';

interface FieldErrorsProperties {
  errorsArray: Detail[];
  heading: string;
  bottomMargin?: boolean;
  children: ReactNode;
  id: string;
}

function FieldErrorsSummary({
  heading,
  errorsArray,
  bottomMargin,
  children,
  id,
}: FieldErrorsProperties): JSX.Element {
  return (
    <div id={id} className={bottomMargin ? 'mb-[3.75rem]' : ''}>
      <SectionIntro heading={heading}>{children}</SectionIntro>
      {errorsArray.map(errorObject => (
        <FieldErrorsEntry
          key={errorObject.validation.id}
          errorObject={errorObject}
        />
      ))}
    </div>
  );
}

FieldErrorsSummary.defaultProps = {
  bottomMargin: false,
};

export default FieldErrorsSummary;
