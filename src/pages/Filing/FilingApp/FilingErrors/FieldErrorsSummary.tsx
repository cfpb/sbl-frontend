import SectionIntro from 'components/SectionIntro';
import FieldErrorsEntry from './FieldErrorsEntry';

interface FieldErrorsProperties {
  errorsArray: unknown[];
  isWarning?: boolean;
  fieldType?: 'multi' | 'register' | 'single';
  bottomMargin?: boolean;
}

function FieldErrorsSummary({
  errorsArray,
  fieldType,
  bottomMargin,
  isWarning,
}: FieldErrorsProperties): JSX.Element {
  return (
    <div
      id={`${
        isWarning
          ? 'single-warning-'
          : fieldType === 'single'
            ? 'single'
            : fieldType === 'multi'
              ? 'multi'
              : 'register'
      }-field-summary`}
      className={bottomMargin ? 'mb-[3.75rem]' : ''}
    >
      <SectionIntro
        heading={`${
          fieldType === 'single'
            ? 'Single-field'
            : fieldType === 'multi'
              ? 'Multi-Field'
              : 'Register-level'
        } errors found: ${errorsArray.length}`}
      >
        {fieldType === 'single' && !isWarning && (
          <>
            Each single-field error pertains to only one specific field in each
            record. These error validations check that the data held in an
            individual field match the values that are expected.
          </>
        )}
        {fieldType === 'multi' && !isWarning && (
          <>
            Multi-field error validations check that the values of certain
            fields make sense in combination with other values in the same
            record.
          </>
        )}
        {fieldType === 'register' && !isWarning && (
          <>
            This validation checks that the register does not contain duplicate
            IDs.
          </>
        )}
        {fieldType === 'single' && isWarning ? (
          <>
            Each single-field validation pertains to only one specific field in
            each record. These validations check that the data held in an
            individual field match the values that are expected.
          </>
        ) : null}
        {fieldType === 'multi' && isWarning ? (
          <>
            Multi-field validations check that the values of certain fields make
            sense in combination with other values in the same record.
          </>
        ) : null}
      </SectionIntro>
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
  fieldType: 'single',
  isWarning: false,
};

export default FieldErrorsSummary;
