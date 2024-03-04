// TODO: Fix all of these ANY calls/assignments
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import CommonLinks from 'components/CommonLinks';
import FieldGroup from 'components/FieldGroup';
import SectionIntro from 'components/SectionIntro';
import {
  Checkbox,
  Heading,
  Label,
  List,
  ListItem,
  Paragraph,
  TextInput,
  WellContainer,
} from 'design-system-react';
import type { JSXElement } from 'design-system-react/dist/types/jsxElement';
import { Controller as FormController } from 'react-hook-form';
import { Zero } from 'utils/constants';
import InputEntry from '../../../components/InputEntry';
import { DisplayField } from '../ViewInstitutionProfile/DisplayField';
import type { InstitutionDetailsApiType } from '../ViewInstitutionProfile/institutionDetails.type';
import type { CheckboxOption } from './types';
import { checkboxOptions, sblInstitutionTypeMap } from './types';

export function SectionWrapper({
  children,
}: {
  children: JSXElement[];
}): JSXElement {
  return <div className='u-mt60'>{children}</div>;
}

const elements = {
  taxID: 'tax_id',
  rssdID: 'rssd_id',
};

function FieldFederalPrudentialRegulator({
  data,
  register,
}: {
  data: InstitutionDetailsApiType;
  register: any; // TODO: Fix all of these "any" types for the Zod functions
}): JSXElement {
  return (
    <>
      <DisplayField
        label='Federal prudential regulator'
        value={`${data.primary_federal_regulator?.name} (${data.primary_federal_regulator?.id})`}
      />
      <input
        hidden
        {...register('primary_federal_regulator.name')}
        value={data.primary_federal_regulator?.name}
      />
      <input
        hidden
        {...register('primary_federal_regulator.id')}
        value={data.primary_federal_regulator?.id}
      />
    </>
  );
}

function UpdateIdentifyingInformation({
  data,
  register,
  setValue,
  getValues,
  control,
  formErrors,
}: {
  data: InstitutionDetailsApiType;
  register: any;
  setValue: any;
  getValues: any;
  control: any;
  formErrors: string[];
}): JSXElement {
  const typeOtherData = data.sbl_institution_types?.find(item => {
    if (typeof item === 'string') return false;
    return item.sbl_type.id === sblInstitutionTypeMap.other;
  });

  return (
    <SectionWrapper>
      <SectionIntro heading='Update your financial institution identifying information'>
        If your financial institution has an RSSD ID, provide it here and we
        will pull your Federal prudential regulator and TIN from{' '}
        <CommonLinks.NIC />. If your financial institution does not have an RSSD
        ID, provide your Federal Taxpayer Identification Number (TIN).
      </SectionIntro>
      <WellContainer className='u-mt30'>
        <Label htmlFor={elements.taxID}>
          Federal Taxpayer Identification Number (TIN)
        </Label>
        <TextInput
          id={elements.taxID}
          {...register(elements.taxID, { value: data[elements.taxID] })}
          isFullWidth
        />
        <Label className='u-mt30' htmlFor={elements.rssdID}>
          Research, Statistics, Supervision, Discount (RSSD) ID
        </Label>
        <TextInput
          id={elements.rssdID}
          {...register(elements.rssdID, { value: data[elements.rssdID] })}
          isFullWidth
        />
        <FieldFederalPrudentialRegulator {...{ register, data }} />
      </WellContainer>
      <Paragraph className='u-mt30 u-mb30'>
        Select all applicable options that describe your financial institution.
        If you wish to provide additional types of financial institutions add
        them to “Other” and check the box.{' '}
      </Paragraph>
      <form>
        <FieldGroup>
          <Heading type='4'>Type of financial institution</Heading>
          <List isUnstyled>
            {checkboxOptions.map((option: CheckboxOption): JSX.Element => {
              const optionId = `sbl_institution_types.${option.id}`;

              const onChange = (
                event: React.ChangeEvent<HTMLInputElement>,
              ): void => {
                setValue(optionId, event.target.checked);
              };

              const defaultChecked = data.sbl_institution_types?.some(item => {
                const apiTypeId = sblInstitutionTypeMap[option.id];
                if (typeof item === 'string') return item === apiTypeId;
                return item.sbl_type.id === apiTypeId;
              });

              return (
                <ListItem key={option.id}>
                  <FormController
                    render={({ field }) => {
                      return (
                        <Checkbox
                          id={option.id}
                          label={option.label}
                          {...field}
                          onChange={onChange}
                          checked={
                            getValues(optionId) === undefined
                              ? defaultChecked
                              : getValues(optionId)
                          }
                        />
                      );
                    }}
                    control={control}
                    name={optionId}
                    // TODO: Add special rules or remove this comment
                    // rules={{ required: 'This field is required' }}
                  />
                </ListItem>
              );
            })}
          </List>
          <InputEntry
            label=''
            id='institutionTypeOther'
            {...register('sbl_institution_types_other', {
              value:
                typeof typeOtherData === 'string' || !typeOtherData
                  ? ''
                  : typeOtherData.details,
            })}
            errorMessage={formErrors[Zero]}
            showError
          />
        </FieldGroup>
      </form>
    </SectionWrapper>
  );
}

export default UpdateIdentifyingInformation;
