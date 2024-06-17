import SectionIntro from 'components/SectionIntro';
import FieldEntry from 'pages/Filing/FilingApp/FieldEntry';
import type { ReactNode } from 'react';
import type { Detail, FilingPeriodType } from 'types/filingTypes';

interface FieldProperties {
  fieldArray: Detail[];
  heading: string;
  bottomMargin?: boolean;
  children: ReactNode;
  id: string;
  lei: string;
  submissionId: number;
  filingPeriod: FilingPeriodType;
  isWarning?: boolean;
}

function FieldSummary({
  heading,
  fieldArray,
  bottomMargin,
  children,
  id,
  className = '',
  lei,
  submissionId,
  filingPeriod,
  isWarning,
}: FieldProperties & JSX.IntrinsicElements['div']): JSX.Element {
  return (
    <div
      id={id}
      className={`${bottomMargin ? 'mb-[3.75rem]' : ''} ${className}`}
    >
      <SectionIntro className='mb-[2.8125rem]' heading={heading}>
        {children}
      </SectionIntro>
      {fieldArray.map(fieldObject => (
        <FieldEntry
          key={fieldObject.validation.id}
          fieldObject={fieldObject}
          {...{ isWarning, lei, submissionId, filingPeriod }}
        />
      ))}
    </div>
  );
}

FieldSummary.defaultProps = {
  bottomMargin: false,
  isWarning: false,
};

export default FieldSummary;
