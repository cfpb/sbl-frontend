import { Checkbox, Link, Paragraph } from 'design-system-react';
import FormParagraph from 'components/FormParagraph';
import InputErrorMessage from 'components/InputErrorMessage';
import { sblHelpLink } from 'utils/common';

import type { InstitutionDetailsApiCheckedType } from 'pages/ProfileForm/types';

import useProfileForm from 'store/useProfileForm';

interface AssociatedFinancialInstitutionProperties {
  key: string;
  fiObject: InstitutionDetailsApiCheckedType;
  onCheckHandler: () => void;
  hasError: boolean;
}

function AssociatedFinancialInstitution({
  onCheckHandler,
  fiObject,
  hasError,
  ...rest
}: AssociatedFinancialInstitutionProperties &
  JSX.IntrinsicElements['input']): JSX.Element {
  return (
    <div key={fiObject.lei}>
      <Checkbox
        id={`${fiObject.name} ${fiObject.lei}`}
        className={`${hasError ? 'error-checkbox' : ''}`}
        label={
          <div className=''>
            <Paragraph className='font-medium'>{fiObject.name}</Paragraph>
          </div>
        }
        checked={fiObject.checked}
        name={fiObject.lei}
        onChange={onCheckHandler}
        {...rest}
      />
      <Checkbox
        id={`${fiObject.name} ${fiObject.lei}`}
        labelClassName='invisible'
        label={
          <div className='visible'>
            <Paragraph className='mb-0'>LEI: {fiObject.lei}</Paragraph>
            <Paragraph className='mb-0'>TIN: {fiObject.tax_id}</Paragraph>
            {fiObject.rssd_id ? (
              <Paragraph className='mb-0'>
                RSSD ID: {fiObject.rssd_id}
              </Paragraph>
            ) : null}
          </div>
        }
      />
    </div>
  );
}

interface AssociatedFinancialInstitutionsProperties {
  errors: object;
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
  const enableMultiselect = useProfileForm(state => state.enableMultiselect);

  return (
    <>
      <div className='mb-[0.9375rem]'>
        <FormParagraph>
          The following financial institutions are associated with your email
          domain. Select the financial institutions you are authorized to file
          for.
        </FormParagraph>
      </div>
      <div>
        {checkedListState.map((fiObject: InstitutionDetailsApiCheckedType) => {
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
              fiObject={fiObject}
              onCheckHandler={onCheckHandler}
            />
          );
        })}
      </div>
      {errors.financialInstitutions ? (
        <InputErrorMessage>
          {errors.financialInstitutions.message}
        </InputErrorMessage>
      ) : null}
      {enableMultiselect ? null : (
        <div className='mt-[0.9375rem]'>
          <FormParagraph>
            If you are authorized to file for an institution that is not listed
            above, please{' '}
            <Link href={sblHelpLink}>contact our support staff</Link>.
          </FormParagraph>
        </div>
      )}
    </>
  );
}

export default AssociatedFinancialInstitutions;
