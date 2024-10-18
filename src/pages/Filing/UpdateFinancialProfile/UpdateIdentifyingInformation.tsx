import FormMain from 'components/FormMain';
import InputEntry from 'components/InputEntry';
import SectionIntro from 'components/SectionIntro';
import { WellContainer } from 'design-system-react';
import type { JSXElement } from 'design-system-react/dist/types/jsxElement';
import type {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import type { InstitutionDetailsApiType } from 'types/formTypes';
import { formatFederalRegulator } from 'utils/formatting';
import { FormSectionWrapper } from '../../../components/FormSectionWrapper';
import {
  DisplayField,
  NOT_APPLICABLE,
} from '../ViewInstitutionProfile/DisplayField';
import InstitutionDataLabels, { InstitutionHelperText } from '../formHelpers';
import TypesFinancialInstitutionSection from './TypesFinancialInstitutionSection';
import type { UpdateInstitutionType } from './types';

const taxID = 'tax_id';
// const rssdID = 'rssd_id';

function FieldFederalPrudentialRegulator({
  data,
  register,
}: {
  data: InstitutionDetailsApiType;
  register: UseFormRegister<UpdateInstitutionType>;
}): JSXElement {
  return (
    <>
      <DisplayField
        label='Federal prudential regulator'
        value={formatFederalRegulator(data)}
        fallbackValue={NOT_APPLICABLE}
      />
      <input
        hidden
        {...register('primary_federal_regulator.name')}
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        value={data.primary_federal_regulator?.name ?? undefined}
      />
      <input
        hidden
        {...register('primary_federal_regulator.id')}
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        value={data.primary_federal_regulator?.id ?? undefined}
      />
    </>
  );
}

function UpdateIdentifyingInformation({
  data,
  register,
  setValue,
  formErrors,
  watch,
}: {
  data: InstitutionDetailsApiType;
  formErrors: FieldErrors<UpdateInstitutionType>;
  register: UseFormRegister<UpdateInstitutionType>;
  setValue: UseFormSetValue<UpdateInstitutionType>;
  watch: UseFormWatch<UpdateInstitutionType>;
}): JSXElement {
  // setValueAs leaves displayed value out of sync with saved value
  // const rssdIdValue = watch(rssdID);

  return (
    <FormSectionWrapper>
      <SectionIntro heading='Update your financial institution identifying information'>
        If your financial institution does not have an RSSD ID, provide your TIN
        below. If your institution has an RSSD ID but quot;Not applicablequot;
        is shown, contact your primary federal regulator, state regulator, or
        reserve bank to link your LEI to your RSSD ID. Once updated in NIC, we
        will reflect the data in our system.
      </SectionIntro>
      <WellContainer className='u-mt30'>
        {/* <InputEntry
          id={rssdID}
          label={InstitutionDataLabels.rssd}
          helperText={InstitutionHelperText.rssd}
          {...register(rssdID, {
            setValueAs: processRssdId,
          })}
          value={rssdIdValue}
          errorMessage={formErrors[rssdID]?.message}
          showError
        /> */}

        <InputEntry
          id={taxID}
          label={InstitutionDataLabels.tin}
          helperText={InstitutionHelperText.tin}
          {...register(taxID)}
          errorMessage={formErrors[taxID]?.message}
          showError
        />
        <DisplayField
          label={InstitutionDataLabels.rssd}
          value={data.rssd_id}
          fallbackValue='Not Applicable'
        />
        <FieldFederalPrudentialRegulator {...{ register, data }} />
      </WellContainer>
      <SectionIntro className='mb-[1.875rem] mt-[2.8125rem]'>
        Select all applicable types of financial institutions from the list
        below. If the enumerated types do not appropriately describe your
        financial institution, or if you wish to add additional types, select
        &quot;Other&quot; and add your entry to the text field. Separate
        multiple entries with a comma.
      </SectionIntro>
      {/* @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717 */}
      <FormMain>
        {/* @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717 */}
        <TypesFinancialInstitutionSection
          {...{ data, register, setValue, watch, formErrors }}
        />
      </FormMain>
    </FormSectionWrapper>
  );
}

export default UpdateIdentifyingInformation;
