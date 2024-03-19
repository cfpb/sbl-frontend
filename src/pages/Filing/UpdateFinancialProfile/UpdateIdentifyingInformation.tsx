// TODO: Fix all of these ANY calls/assignments
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import CommonLinks from 'components/CommonLinks';
import FormMain from 'components/FormMain';
import SectionIntro from 'components/SectionIntro';

import {
  Label,
  Paragraph,
  TextInput,
  WellContainer,
} from 'design-system-react';
import type { JSXElement } from 'design-system-react/dist/types/jsxElement';
import type {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';
import type { InstitutionDetailsApiType } from 'types/formTypes';
import { FormSectionWrapper } from '../../../components/FormSectionWrapper';
import { DisplayField } from '../ViewInstitutionProfile/DisplayField';
import TypesFinancialInstitutionSection from './TypesFinancialInstitutionSection';
import type { UpdateInstitutionType } from './types';

const taxID = 'tax_id';
const rssdID = 'rssd_id';

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
        value={`${data.primary_federal_regulator.name} (${data.primary_federal_regulator.id})`}
      />
      <input
        hidden
        {...register('primary_federal_regulator.name')}
        value={data.primary_federal_regulator.name}
      />
      <input
        hidden
        {...register('primary_federal_regulator.id')}
        value={data.primary_federal_regulator.id}
      />
    </>
  );
}

function UpdateIdentifyingInformation({
  data,
  register,
  setValue,
  control,
  formErrors,
}: {
  data: InstitutionDetailsApiType;
  control: Control<UpdateInstitutionType>;
  formErrors: FieldErrors<UpdateInstitutionType>;
  // getValues: UseFormGetValues<UpdateInstitutionType>;
  register: UseFormRegister<UpdateInstitutionType>;
  setValue: UseFormSetValue<UpdateInstitutionType>;
}): JSXElement {
  return (
    <FormSectionWrapper>
      <SectionIntro heading='Update your financial institution identifying information'>
        If your financial institution has an RSSD ID, provide it here and we
        will pull your Federal prudential regulator and TIN from{' '}
        <CommonLinks.NIC />. If your financial institution does not have an RSSD
        ID, provide your Federal Taxpayer Identification Number (TIN).
      </SectionIntro>
      <WellContainer className='u-mt30'>
        <Label htmlFor={taxID}>
          Federal Taxpayer Identification Number (TIN)
        </Label>
        <TextInput id={taxID} {...register(taxID)} isFullWidth />
        <Label className='u-mt30' htmlFor={rssdID}>
          Research, Statistics, Supervision, Discount (RSSD) ID
        </Label>
        <TextInput id={rssdID} {...register(rssdID)} isFullWidth />
        <FieldFederalPrudentialRegulator {...{ register, data }} />
      </WellContainer>
      <Paragraph className='u-mt30 u-mb30'>
        Select all applicable options that describe your financial institution.
        If you wish to provide additional types of financial institutions add
        them to “Other” and check the box.{' '}
      </Paragraph>
      <FormMain>
        <TypesFinancialInstitutionSection
          {...{ data, register, setValue, control, formErrors }}
        />
      </FormMain>
    </FormSectionWrapper>
  );
}

export default UpdateIdentifyingInformation;
