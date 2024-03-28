import Links from 'components/CommonLinks';
import { Heading, Link, Paragraph, WellContainer } from 'design-system-react';
import type { ReactNode } from 'react';
import type {
  DomainType as Domain,
  InstitutionDetailsApiType,
} from 'types/formTypes';
import { sblHelpLink } from 'utils/common';
import { FormSectionWrapper } from '../../../components/FormSectionWrapper';
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
      <Heading type='2'>{heading}</Heading>
      <Paragraph>
        To update the email domains for your financial institution,{' '}
        <Link href={sblHelpLink}>contact our support staff</Link>. To update any
        other data in this section, visit <Links.GLIEF />.
      </Paragraph>

      <WellContainer className='u-mt30'>
        <DisplayField label='Financial institution name' value={data.name} />
        <DisplayField
          label='Headquarters address'
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
        <DisplayField label='Legal Entity Identifier (LEI)' value={data.lei} />
        <DisplayField
          label='LEI status'
          value={
            <span className='capitalize'>
              {data.is_active ? 'Active' : 'Inactive'}
            </span>
          }
        />
        <DisplayField
          label='Email domain(s)'
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
