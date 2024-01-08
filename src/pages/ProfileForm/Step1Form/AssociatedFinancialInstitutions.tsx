import { Checkbox, Link, Paragraph, Heading } from 'design-system-react';
import FormParagraph from 'components/FormParagraph';
import { sblHelpLink } from 'utils/common';

import type { InstitutionDetailsApiCheckedType } from 'pages/ProfileForm/types';

import useProfileForm from 'store/useProfileForm';

interface AssociatedFinancialInstitutionProperties {
  key: string;
  isFirst: boolean;
  fiObject: InstitutionDetailsApiCheckedType;
  onCheckHandler: () => void;
  hasError: boolean;
}

function AssociatedFinancialInstitution({
  onCheckHandler,
  fiObject,
  isFirst,
  hasError,
  ...rest
}: AssociatedFinancialInstitutionProperties &
  JSX.IntrinsicElements['input']): JSX.Element {
  return (
    <div
      className={`flex flex-row gap-1 ${isFirst ? 'mt-[0.9375em]' : ''}`}
      key={fiObject.lei}
    >
      <Checkbox
        id={`${fiObject.name} ${fiObject.lei}`}
        className={`${hasError ? 'error-checkbox' : ''}`}
        label={
          <div className='-translate-x-[0.2rem] -translate-y-[1.4%]'>
            <Heading type='4' className='mb-[0.03rem]'>{fiObject.name}</Heading>
            <Paragraph className='mb-[0.03rem] font-normal'>LEI: {fiObject.lei}</Paragraph>
            <Paragraph className='mb-[0.03rem] font-normal'>TIN: {fiObject.tax_id}</Paragraph>
            {fiObject.rssd_id ? (
              <Paragraph className='mb-[0.03rem] font-normal'>
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
    </div>
  );
}

interface AssociatedFinancialInstitutionsProperties {
  errors: object;
  checkedListState: InstitutionDetailsApiCheckedType[];
  setCheckedListState: (
    callbackFunction: (previous: InstitutionDetailsApiCheckedType[]) => InstitutionDetailsApiCheckedType[],
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
      <FormParagraph>
        The following financial institutions are associated with your email domain. Select the financial institutions you are authorized to file for.
      </FormParagraph>

      <div>
        {checkedListState.map((fiObject: InstitutionDetailsApiCheckedType, index: number) => {
          const onCheckHandler = (): void => {
            setCheckedListState((previous: InstitutionDetailsApiCheckedType[]): InstitutionDetailsApiCheckedType[] =>
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
              isFirst={index === 0}
              fiObject={fiObject}
              onCheckHandler={onCheckHandler}
            />
          );
        })}
      </div>
      {enableMultiselect ? null : (
        <FormParagraph>
          If you are authorized to file for an institution that is not listed,
          please complete this form and then contact our support staff{' '}
          <Link href={sblHelpLink}>contact our support staff</Link> to complete your user
          profile.
        </FormParagraph>
      )}
    </>
  );
}

export default AssociatedFinancialInstitutions;
