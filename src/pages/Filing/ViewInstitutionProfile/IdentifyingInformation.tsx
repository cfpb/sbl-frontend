/* eslint-disable react/require-default-props */
import Links from 'components/CommonLinks';
import FormSectionWrapper from 'components/FormSectionWrapper';
import SectionIntro from 'components/SectionIntro';
import { WellContainer } from 'design-system-react';
import type { AlertFieldLevelType } from 'design-system-react/dist/components/Alert/AlertFieldLevel';
import type { JSXElement } from 'design-system-react/dist/types/jsxElement';
import type { ReactNode } from 'react';
import type { InstitutionDetailsApiType } from 'types/formTypes';
import { formatFederalRegulator } from 'utils/formatting';
import InstitutionDataLabels from '../formHelpers';
import { DisplayField, NOT_PROVIDED } from './DisplayField';

const defaultDescription = (
  <>
    If your financial institution has an RSSD ID, visit the{' '}
    <Links.FederalReserveBoard /> to update the following information. If your
    financial institution does not have an RSSD ID and you need to update this
    information, submit a request to <Links.UpdateInstitutionProfile />.
  </>
);

export function IdentifyingInformation({
  data = {} as InstitutionDetailsApiType,
  heading = 'Financial institution identifying information',
  description = defaultDescription,
  alertStatus,
}: {
  data: InstitutionDetailsApiType | undefined;
  heading?: string;
  description?: ReactNode;
  alertStatus?: AlertFieldLevelType;
}): JSXElement {
  if (!data) return null;
  // TODO: Asking Le about 'Other' institution type/detail in mock data and the ending period
  // https://github.com/cfpb/sbl-frontend/issues/137
  const institutionTypeNamesArray = data.sbl_institution_types?.map(
    institutionType => {
      let name = '';
      if (typeof institutionType === 'string') name = institutionType;
      else if (institutionType.sbl_type.name === 'Other') {
        return institutionType.details;
      } else {
        const { sbl_type: sblType } = institutionType;
        const { name: typeName } = sblType;
        name = typeName;
      }

      return name.replace(/\.$/, '');
    },
  );

  const institutionTypeNamesCombined =
    institutionTypeNamesArray?.length > 0
      ? institutionTypeNamesArray.join(', ')
      : null;

  return (
    <FormSectionWrapper>
      <SectionIntro heading={heading}>{description}</SectionIntro>

      <WellContainer className='u-mt30'>
        <DisplayField
          label={InstitutionDataLabels.tin}
          value={data.tax_id}
          fallbackValue={NOT_PROVIDED}
          alertStatus={alertStatus}
          className='snapshot-ignore'
        />
        <DisplayField
          label={InstitutionDataLabels.rssd}
          value={data.rssd_id}
          className='snapshot-ignore'
        />
        <DisplayField
          label={InstitutionDataLabels.regName}
          value={formatFederalRegulator(data)}
        />
      </WellContainer>

      <SectionIntro className='u-mt45'>
        To update your type of financial institution, submit a request to{' '}
        <Links.UpdateInstitutionProfile />.
      </SectionIntro>
      <WellContainer className='u-mt30'>
        <DisplayField
          label={InstitutionDataLabels.fiType}
          value={institutionTypeNamesCombined}
          fallbackValue={NOT_PROVIDED}
          alertStatus={alertStatus}
        />
      </WellContainer>
    </FormSectionWrapper>
  );
}

IdentifyingInformation.defaultProps = {
  alertStatus: 'warning',
};
export default IdentifyingInformation;
