import SectionIntro from 'components/SectionIntro';
import SingleFieldErrorsEntry from './SingleFieldErrorsEntry';

interface SingleErrorsProperties {
  singleErrors: unknown[];
}

function SingleFieldErrorsSummary({
  singleErrors,
}: SingleErrorsProperties): JSX.Element | null {
  console.log('singleErrors:', singleErrors);
  if (singleErrors.length === 0) return null;
  return (
    <div id='single-field-errors-summary'>
      <SectionIntro
        heading={`Single-field errors found: ${singleErrors.length}`}
      >
        Each single-field error pertains to only one specific field in each
        record. These error validations check that the data held in an
        individual field match the values that are expected.
      </SectionIntro>
      {singleErrors.map(singleErrorObject => (
        <SingleFieldErrorsEntry
          key={singleErrorObject.validation.id}
          singleErrorObject={singleErrorObject}
        />
      ))}
      {/* <SingleFieldErrorsEntry
        key={singleErrors[0].validation.id}
        singleErrorObject={singleErrors[0]}
      /> */}
    </div>
  );
}

export default SingleFieldErrorsSummary;
