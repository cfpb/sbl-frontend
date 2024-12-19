/* eslint-disable react/require-default-props */
import Links from 'components/CommonLinks';
import { Link } from 'components/Link';
import SectionIntro from 'components/SectionIntro';
import { WellContainer } from 'design-system-react';
import type { AlertFieldLevelType } from 'design-system-react/dist/components/Alert/AlertFieldLevel';
import type { JSXElement } from 'design-system-react/dist/types/jsxElement';
import type { ReactNode } from 'react';
import type {
  DomainType as Domain,
  InstitutionDetailsApiType,
} from 'types/formTypes';
import { valueOrNotavailable } from 'utils/formatting';
import { FormSectionWrapper } from '../../../components/FormSectionWrapper';
import InstitutionDataLabels from '../formHelpers';
import AddressStreetOptional from './AddressStreetOptional';
import { DisplayField, NOT_AVAILABLE } from './DisplayField';

export const formatDomains = (domains?: Domain[]): string => {
  if (!domains || domains.length === 0) return NOT_AVAILABLE;

  const domainList = domains
    .map((domain: Domain) => domain.domain)
    .filter(Boolean);

  return valueOrNotavailable(domainList.join(', '));
};

const defaultDescription = (
  <>
    To update the email domains for your financial institution,{' '}
    <Link href='mailto:SBLHelp@cfpb.gov?subject=[BETA] Update financial institution profile: Update email domain'>
      email our support staff
    </Link>
    . To update any other data in this section, contact your Local Operating
    Unit (LOU) or visit <Links.GetAnLEI /> to identify your LOU.
  </>
);

export function FinancialInstitutionDetails({
  data = {} as InstitutionDetailsApiType,
  heading,
  isDomainsVisible = true,
  description = defaultDescription,
  alertStatus,
}: {
  data: InstitutionDetailsApiType | undefined;
  heading?: ReactNode;
  isDomainsVisible?: boolean;
  description?: ReactNode;
  alertStatus?: AlertFieldLevelType;
}): JSXElement {
  if (!data) return null;

  const getLeiStatus = (): string => {
    const name = data?.lei_status?.name.trim() ?? '';
    if (name) {
      return name;
    }
    return NOT_AVAILABLE;
  };

  return (
    <FormSectionWrapper className='u-mt60'>
      <SectionIntro heading={heading}>{description}</SectionIntro>

      <WellContainer className='u-mt30'>
        <DisplayField
          label={InstitutionDataLabels.fiName}
          value={valueOrNotavailable(data.name)}
          className='snapshot-ignore'
        />
        <DisplayField
          label={InstitutionDataLabels.hqAddress}
          value={
            <>
              {valueOrNotavailable(data.hq_address_street_1)}
              <br />
              {/* @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717 */}
              <AddressStreetOptional street={data.hq_address_street_2} />
              {/* @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717 */}
              <AddressStreetOptional street={data.hq_address_street_3} />
              {/* @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717 */}
              <AddressStreetOptional street={data.hq_address_street_4} />
              {valueOrNotavailable(data.hq_address_city)},{' '}
              {valueOrNotavailable(data.hq_address_state_code)}{' '}
              {valueOrNotavailable(data.hq_address_zip)}
            </>
          }
        />
        <DisplayField
          label={InstitutionDataLabels.lei}
          value={data.lei}
          className='snapshot-ignore'
        />
        <DisplayField
          label={InstitutionDataLabels.leiStatus}
          value={getLeiStatus()}
          alertStatus={alertStatus}
        />
        {isDomainsVisible ? (
          <DisplayField
            label={InstitutionDataLabels.emailDomains}
            value={formatDomains(data.domains)}
            className='snapshot-ignore'
          />
        ) : (
          ''
        )}
      </WellContainer>
    </FormSectionWrapper>
  );
}

FinancialInstitutionDetails.defaultProps = {
  alertStatus: 'warning',
  heading: 'Financial institution details',
};

export default FinancialInstitutionDetails;
