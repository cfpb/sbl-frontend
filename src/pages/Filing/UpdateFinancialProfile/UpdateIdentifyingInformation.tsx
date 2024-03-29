// TODO: Fix all of these ANY calls/assignments
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import CommonLinks from 'components/CommonLinks';
import FieldGroup from 'components/FieldGroup';
import FormMain from 'components/FormMain';
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
import type { InstitutionDetailsApiType } from 'types/formTypes';
import { Zero } from 'utils/constants';
import { FormSectionWrapper } from '../../../components/FormSectionWrapper';
import InputEntry from '../../../components/InputEntry';
import { DisplayField } from '../ViewInstitutionProfile/DisplayField';
import type { CheckboxOption } from './types';
import { checkboxOptions } from './types';

const elements = {
  taxID: 'tax_id',
  rssdID: 'rssd_id',
};

const SLB_INSTITUTION_TYPE_OTHER = '13';

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
  register: any;
  setValue: any;
  getValues: any;
  control: any;
  formErrors: string[];
}): JSXElement {
  const typeOtherData = data.sbl_institution_types.find(item => {
    return item.sbl_type.id === SLB_INSTITUTION_TYPE_OTHER;
  });

  return (
    <FormSectionWrapper>
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
          {...register(elements.taxID)}
          isFullWidth
        />
        <Label className='u-mt30' htmlFor={elements.rssdID}>
          Research, Statistics, Supervision, Discount (RSSD) ID
        </Label>
        <TextInput
          id={elements.rssdID}
          {...register(elements.rssdID)}
          isFullWidth
        />
        <FieldFederalPrudentialRegulator {...{ register, data }} />
      </WellContainer>
      <Paragraph className='u-mt30 u-mb30'>
        Select all applicable options that describe your financial institution.
        If you wish to provide additional types of financial institutions add
        them to “Other” and check the box.{' '}
      </Paragraph>
      <FormMain>
        <FieldGroup>
          <Heading type='4'>Types of financial institutions</Heading>
          <List isUnstyled>
            {checkboxOptions.map((option: CheckboxOption): JSX.Element => {
              const optionId = `sbl_institution_types.${option.id}`;

              const onCheckboxChange = (
                event: React.ChangeEvent<HTMLInputElement>,
              ): void => {
                setValue(optionId, event.target.checked);
              };

              return (
                <ListItem key={option.id}>
                  <FormController
                    render={({ field }) => {
                      return (
                        <Checkbox
                          id={option.id}
                          label={option.label}
                          {...register(optionId)}
                          checked={field.value}
                          onChange={onCheckboxChange}
                        />
                      );
                    }}
                    control={control}
                    name={optionId}
                  />
                </ListItem>
              );
            })}
          </List>
          <InputEntry
            label=''
            id='institutionTypeOther'
            {...register('sbl_institution_types_other', {
              value: typeOtherData?.details,
            })}
            errorMessage={formErrors[Zero]}
            showError
          />
        </FieldGroup>
      </FormMain>
    </FormSectionWrapper>
  );
}

export default UpdateIdentifyingInformation;
