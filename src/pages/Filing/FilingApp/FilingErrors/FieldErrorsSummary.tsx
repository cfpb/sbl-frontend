import SectionIntro from 'components/SectionIntro';
import FieldErrorsEntry from './FieldErrorsEntry';

interface FieldErrorsProperties {
  errorsArray: unknown[];
  isSingleField?: boolean;
}

function FieldErrorsSummary({
  errorsArray,
  isSingleField = true,
}: FieldErrorsProperties): JSX.Element {
  return (
    <div id={`${isSingleField ? 'single' : 'multi'}-field-errors-summary`}>
      <SectionIntro
        heading={`${isSingleField ? 'Single' : 'Multi'}-field errors found: ${
          errorsArray.length
        }`}
      >
        {isSingleField ? (
          <>
            Each single-field error pertains to only one specific field in each
            record. These error validations check that the data held in an
            individual field match the values that are expected.
          </>
        ) : (
          <>
            Multi-field error validations check that the values of certain
            fields make sense in combination with other values in the same
            record.
          </>
        )}
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

export default FieldErrorsSummary;
