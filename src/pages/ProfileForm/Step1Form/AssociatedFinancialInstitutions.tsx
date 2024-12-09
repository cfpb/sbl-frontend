import FormParagraph from 'components/FormParagraph';
import InputErrorMessage from 'components/InputErrorMessage';
import { Link } from 'components/Link';
import { Checkbox, Paragraph } from 'design-system-react';
import type { FieldErrors } from 'react-hook-form';
import { Element } from 'react-scroll';

import type {
  InstitutionDetailsApiCheckedType,
  ValidationSchema,
} from 'types/formTypes';
import { One } from 'utils/constants';

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
        className={`${
          hasError ? 'm-form-field__checkbox__error' : ''
        } snapshot-ignore`}
        label={
          <div>
            <Paragraph className='mb-0 font-medium'>{fiObject.name}</Paragraph>
            <Paragraph className='mb-0'>LEI: {fiObject.lei}</Paragraph>
            {fiObject.tax_id ? (
              <Paragraph className='mb-0'>TIN: {fiObject.tax_id}</Paragraph>
            ) : null}
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
          We can associate your user profile with the following financial
          institution(s). Only select a financial institution for which you are
          authorized to file.
        </FormParagraph>
      </div>
      <div>
        {checkedListState.map(
          (fiObject: InstitutionDetailsApiCheckedType, index: number) => {
            // used for react-scroll Element id
            // TODO: Discussion - handle instances where financial institutions already in the database -- fail input validations
            // https://github.com/cfpb/sbl-frontend/issues/292
            const scrollId = `financialInstitutions-${index}-lei`;
            const isLast: boolean = index === checkedListState.length - One;
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
              <div
                key={fiObject.lei}
                className={`${isLast ? '' : 'mb-[0.9375rem]'}`}
              >
                <AssociatedFinancialInstitution
                  hasError={Boolean(errors.financialInstitutions)}
                  scrollId={scrollId}
                  fiObject={fiObject}
                  onCheckHandler={onCheckHandler}
                />
              </div>
            );
          },
        )}
      </div>
      {errors.financialInstitutions?.message ? (
        <InputErrorMessage>
          {errors.financialInstitutions.message}
        </InputErrorMessage>
      ) : null}
      <div className='mt-[0.9375rem]'>
        <FormParagraph>
          If you are authorized to file for a financial institution that is not
          listed above,{' '}
          <Link href='mailto:SBLHelp@cfpb.gov?subject=[BETA] Complete your user profile: Add additional financial institutions'>
            email our support staff
          </Link>
          .
        </FormParagraph>
      </div>
    </>
  );
}

export default AssociatedFinancialInstitutions;
