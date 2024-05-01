import SectionIntro from 'components/SectionIntro';

interface MultiErrorsProperties {
  multiErrors: unknown[];
}

function MultiFieldErrorsSummary({
  multiErrors,
}: MultiErrorsProperties): JSX.Element {
  return (
    <div id='single-field-errors-summary'>
      <SectionIntro heading={`Multi-field errors found: ${multiErrors.length}`}>
        Multi-field error validations check that the values of certain fields
        make sense in combination with other values in the same record.
      </SectionIntro>
      {/* {singleErrors.map(singleErrorObject => (
        <SingleFieldErrorsEntry
          key={singleErrorObject.validation.id}
          singleErrorObject={singleErrorObject}
        />
      ))} */}
      {/* <SingleFieldErrorsEntry
        key={singleErrors[0].validation.id}
        singleErrorObject={singleErrors[0]}
      /> */}
    </div>
  );
}

export default MultiFieldErrorsSummary;
