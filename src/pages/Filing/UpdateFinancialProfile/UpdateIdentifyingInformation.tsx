import CommonLinks from 'components/CommonLinks';
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
  register: UseFormRegister<UpdateInstitutionType>;
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
  formErrors,
  watch,
}: {
  data: InstitutionDetailsApiType;
  formErrors: FieldErrors<UpdateInstitutionType>;
  register: UseFormRegister<UpdateInstitutionType>;
  setValue: UseFormSetValue<UpdateInstitutionType>;
  watch: UseFormWatch<UpdateInstitutionType>;
}): JSXElement {
  return (
    <FormSectionWrapper>
      <SectionIntro heading='Update your financial institution identifying information'>
        If your financial institution has a Research, Statistics, Supervision,
        Discount (RSSD) ID, provide it here and we will pull your Federal
        prudential regulator and Federal Taxpayer Identification Number (TIN)
        from <CommonLinks.NIC />. If your financial institution does not have an
        RSSD ID, provide your TIN.
      </SectionIntro>
      <WellContainer className='u-mt30'>
        <InputEntry
          id={taxID}
          label='Federal Taxpayer Identification Number (TIN)'
          {...register(taxID)}
          errorMessage={formErrors[taxID]?.message}
        />
        <InputEntry
          id={rssdID}
          label='Research, Statistics, Supervision, Discount (RSSD) ID'
          {...register(rssdID, { valueAsNumber: true })}
          errorMessage={formErrors[rssdID]?.message}
        />
        <FieldFederalPrudentialRegulator {...{ register, data }} />
      </WellContainer>
      <SectionIntro heading=''>
        <div className='u-mt30 u-mb30'>
          Select all applicable types of financial institutions from the list
          below. If the enumerated types do not appropriately describe your
          institution, or if you wish to add additional types, select
          &quot;Other&quot; and add your entry to the text field. Multiple
          entries should be separated by commas.
        </div>
      </SectionIntro>
      <FormMain>
        <TypesFinancialInstitutionSection
          {...{ data, register, setValue, watch, formErrors }}
        />
      </FormMain>
    </FormSectionWrapper>
  );
}

export default UpdateIdentifyingInformation;
