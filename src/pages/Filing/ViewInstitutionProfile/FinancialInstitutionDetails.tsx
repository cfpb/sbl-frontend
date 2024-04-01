import Links from 'components/CommonLinks';
import SectionIntro from 'components/SectionIntro';
import { Link, WellContainer } from 'design-system-react';
import type { ReactNode } from 'react';
import type {
  DomainType as Domain,
  InstitutionDetailsApiType,
} from 'types/formTypes';
import { sblHelpLink } from 'utils/common';
import { FormSectionWrapper } from '../../../components/FormSectionWrapper';
import InstitutionDataLabels from '../formHelpers';
import AddressStreet2 from './AddressStreet2';
import { DisplayField } from './DisplayField';

export const formatDomains = (domains?: Domain[]): string =>
  (domains ?? []).map((domain: Domain) => domain.domain).join(', ');

export function FinancialInstitutionDetails({
  data,
  heading,
}: {
  data: InstitutionDetailsApiType;
  heading?: ReactNode;
}): JSX.Element {
  return (
    <FormSectionWrapper>
      <SectionIntro heading={heading}>
        To update the email domains for your financial institution,{' '}
        <Link href={sblHelpLink}>contact our support staff</Link>. To update to
        any other data in this section, visit <Links.GLIEF />.
      </SectionIntro>

      <WellContainer className='u-mt30'>
        <DisplayField label={InstitutionDataLabels.fiName} value={data.name} />
        <DisplayField
          label={InstitutionDataLabels.hqAddress}
          value={
            <>
              {data.hq_address_street_1}
              <br />
              <AddressStreet2 street={data.hq_address_street_2} />
              {data.hq_address_city}, {data.hq_address_state_code}{' '}
              {data.hq_address_zip}
            </>
          }
        />
        <DisplayField label={InstitutionDataLabels.lei} value={data.lei} />
        <DisplayField
          label={InstitutionDataLabels.leiStatus}
          value={
            <span className='capitalize'>
              {data.is_active ? 'Active' : 'Inactive'}
            </span>
          }
        />
        <DisplayField
          label={InstitutionDataLabels.emailDomains}
          value={formatDomains(data.domains)}
        />
      </WellContainer>
    </FormSectionWrapper>
  );
}

FinancialInstitutionDetails.defaultProps = {
  heading: 'Financial institution details',
};

export default FinancialInstitutionDetails;
