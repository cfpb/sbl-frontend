// TODO: vv Revisit these exceptions vv
/* eslint-disable @typescript-eslint/no-unsafe-call */
import Links from 'components/CommonLinks';
import {
  Divider,
  Heading,
  Paragraph,
  WellContainer,
} from 'design-system-react';
import InputEntry from 'pages/ProfileForm/Step1Form/InputEntry';
import './AffiliateInformation.less';
import { DisplayField } from './DisplayField';
import type { InstitutionDetailsApiType } from './institutionDetails.type';

export function AffiliateInformation({
  data,
  isUpdate = false,
  register,
}: {
  data: InstitutionDetailsApiType;
  isUpdate: boolean;
  // TODO: vv Revisit these exceptions vv
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, react/require-default-props
  register?: any;
}): JSX.Element {
  const heading = isUpdate
    ? 'Update your financial institution affiliate information'
    : 'Affiliate information';
  return (
    <div className='affiliate-information'>
      <Heading type='2' className='u-mt60'>
        {heading}
      </Heading>
      <Paragraph>
        To request an update to an LEI-based affiliate, visit <Links.GLIEF />.
        To request an update to an RSSD ID-based affiliate, visit <Links.NIC />.
        If you have affiliates with no LEI or RSSD ID, provide the names of
        those institutions in the form below.
      </Paragraph>

      <WellContainer className='u-mt30'>
        <Heading type='5' className='u-mb30'>
          Parent entity
        </Heading>
        {isUpdate ? (
          <InputEntry
            label={
              <>
                Name<span style={{ color: '#43484E' }}> (optional)</span>
              </>
            }
            id='parent_legal_name'
            {...register('parent_legal_name')}
            errors={{}}
            showError
          />
        ) : (
          <DisplayField label='Name' value={data.parent_legal_name} />
        )}
        <DisplayField
          label='Legal Entity Identifier (LEI)'
          value={data.parent_lei}
        />
        <DisplayField
          label='Research, Statistics, Supervision, Discount (RSSD) ID'
          value={data.parent_rssd_id}
        />

        <Divider className='u-mt45' />
        <Heading type='5' className='u-mt45 u-mb30'>
          Top Holder
        </Heading>
        <DisplayField label='Name' value={data.top_holder_legal_name} />
        <DisplayField
          label='Legal Entity Identifier (LEI)'
          value={data.top_holder_lei}
        />
        <DisplayField
          label='Research, Statistics, Supervision, Discount (RSSD) ID'
          value={data.top_holder_rssd_id}
        />
      </WellContainer>
    </div>
  );
}
export default AffiliateInformation;
