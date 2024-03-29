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
import InstitutionDataLabels from '../formHelpers';
import TypesFinancialInstitutionSection from './TypesFinancialInstitutionSection';
import { processRssdId } from './processRssdId';
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
  // setValueAs leaves displayed value out of sync with saved value
  const rssdIdValue = watch(rssdID);

  return (
    <FormSectionWrapper>
      <SectionIntro heading='Update your financial institution identifying information'>
        If your financial institution has a Research, Statistics, Supervision,
        Discount Identification (RSSD ID) number, provide it here and we will
        pull your Federal Taxpayer Identification Number (TIN) and Federal
        prudential regulator from NIC. If not, provide your TIN.
      </SectionIntro>
      <WellContainer className='u-mt30'>
        <InputEntry
          id={taxID}
          label={InstitutionDataLabels.tin}
          {...register(taxID)}
          errorMessage={formErrors[taxID]?.message}
        />
        <InputEntry
          id={rssdID}
          label={InstitutionDataLabels.rssd}
          type='number'
          isOptional
          {...register(rssdID, {
            setValueAs: processRssdId,
          })}
          value={rssdIdValue}
          errorMessage={formErrors[rssdID]?.message}
        />
        <FieldFederalPrudentialRegulator {...{ register, data }} />
      </WellContainer>
      <SectionIntro heading=''>
        <div className='u-mt30 u-mb30'>
          Select all applicable types of financial institutions from the list
          below. If the enumerated types do not appropriately describe your
          institution, or if you wish to add additional types, select
          &quot;Other&quot; and add your entry to the text field. Separate
          multiple entries with a comma.
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
