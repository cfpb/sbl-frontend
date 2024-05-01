import SectionIntro from 'components/SectionIntro';
import SingleFieldErrorsEntry from './SingleFieldErrorsEntry';

interface MultiErrorsProperties {
  multiErrors: unknown[];
}

function MultiFieldErrorsSummary({
  multiErrors,
}: MultiErrorsProperties): JSX.Element {
  return (
    <div id='multi-field-errors-summary'>
      <SectionIntro heading={`Multi-field errors found: ${multiErrors.length}`}>
        Multi-field error validations check that the values of certain fields
        make sense in combination with other values in the same record.
      </SectionIntro>
      {multiErrors.map(multiErrorObject => (
        <SingleFieldErrorsEntry
          key={multiErrorObject.validation.id}
          singleErrorObject={multiErrorObject}
        />
      ))}
    </div>
  );
}

export default MultiFieldErrorsSummary;
