import FormParagraph from 'components/FormParagraph';
import InputErrorMessage from 'components/InputErrorMessage';
import { Checkbox, Paragraph } from 'design-system-react';
import type { FieldErrors } from 'react-hook-form';
import { Element } from 'react-scroll';

import type {
  InstitutionDetailsApiCheckedType,
  ValidationSchema,
} from 'types/formTypes';

interface AssociatedFinancialInstitutionProperties {
  scrollId: string;
  fiObject: InstitutionDetailsApiCheckedType;
  onCheckHandler: () => void;
  hasError: boolean;
}

function AssociatedFinancialInstitution({
  onCheckHandler,
  scrollId,
  fiObject,
  hasError,
  ...rest
}: AssociatedFinancialInstitutionProperties &
  JSX.IntrinsicElements['input']): JSX.Element {
  return (
    <Element name={scrollId}>
      <Checkbox
        id={scrollId}
        className={`${hasError ? 'm-form-field__checkbox__error' : ''}`}
        label={
          <div>
            <Paragraph className='mb-0 font-medium'>{fiObject.name}</Paragraph>
            <Paragraph className='mb-0'>LEI: {fiObject.lei}</Paragraph>
            <Paragraph className='mb-0'>TIN: {fiObject.tax_id}</Paragraph>
            {fiObject.rssd_id ? (
              <Paragraph className='mb-0'>
                RSSD ID: {fiObject.rssd_id}
              </Paragraph>
            ) : null}
          </div>
        }
        checked={fiObject.checked}
        name={fiObject.lei}
        onChange={onCheckHandler}
        {...rest}
      />
    </Element>
  );
}

interface AssociatedFinancialInstitutionsProperties {
  errors: FieldErrors<ValidationSchema>;
  checkedListState: InstitutionDetailsApiCheckedType[];
  setCheckedListState: (
    callbackFunction: (
      previous: InstitutionDetailsApiCheckedType[],
    ) => InstitutionDetailsApiCheckedType[],
  ) => void;
}

function AssociatedFinancialInstitutions({
  checkedListState,
  errors,
  setCheckedListState,
}: AssociatedFinancialInstitutionsProperties): JSX.Element {
  return (
    <>
      <div className='mb-[0.9375rem]'>
        <FormParagraph>
          The following financial institutions are associated with your email
          domain. Select the financial institutions for which you are authorized
          to file.
        </FormParagraph>
      </div>
      <div>
        {checkedListState.map(
          (fiObject: InstitutionDetailsApiCheckedType, index: number) => {
            // used for react-scroll Element id
            const scrollId = `financialInstitutions-${index}-lei`;
            const onCheckHandler = (): void => {
              setCheckedListState(
                (
                  previous: InstitutionDetailsApiCheckedType[],
                ): InstitutionDetailsApiCheckedType[] =>
                  previous.map((object: InstitutionDetailsApiCheckedType) => {
                    if (object.lei !== fiObject.lei) return object;
                    return { ...fiObject, checked: !fiObject.checked };
                  }),
              );
            };
            return (
              <AssociatedFinancialInstitution
                hasError={Boolean(errors.financialInstitutions)}
                key={fiObject.lei}
                scrollId={scrollId}
                fiObject={fiObject}
                onCheckHandler={onCheckHandler}
              />
            );
          },
        )}
      </div>
      {errors.financialInstitutions ? (
        <InputErrorMessage>
          {errors.financialInstitutions.message}
        </InputErrorMessage>
      ) : null}
    </>
  );
}

export default AssociatedFinancialInstitutions;
