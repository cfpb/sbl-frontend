// TODO: vv Revisit these exceptions vv
/* eslint-disable @typescript-eslint/no-unsafe-call */
import Links from 'components/CommonLinks';
import {
  Divider,
  Heading,
  Paragraph,
  WellContainer,
} from 'design-system-react';
import type { InstitutionDetailsApiType } from 'pages/Filing/ViewInstitutionProfile/institutionDetails.type';
import type { ReactNode } from 'react';
import { FormSectionWrapper } from '../../../components/FormSectionWrapper';
import InputEntry from '../../../components/InputEntry';

function UpdateAffiliateInformation({
  data,
  heading,
  register,
}: {
  data: InstitutionDetailsApiType;
  heading?: ReactNode;
  // TODO: vv Revisit these exceptions vv
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, react/require-default-props
  register?: any;
}): JSX.Element {
  return (
    <FormSectionWrapper>
      <Heading type='2'>{heading}</Heading>
      <Paragraph>
        To request changes to an LEI-based affiliate, visit <Links.GLIEF />. To
        request changes to an RSSD ID- based affiliate, visit <Links.NIC />. If
        you wish to provide only your affiliate&apos;s name, where no LEI or
        RSSD ID exists, <Links.UpdateInstitutionProfile />.
      </Paragraph>

      <WellContainer className='u-mt30'>
        <Heading type='5' className='u-mb30'>
          Parent entity
        </Heading>
        <InputEntry
          label='Name'
          id='parent_legal_name'
          {...register('parent_legal_name', {
            value: data.parent_legal_name,
          })}
          errorMessage={undefined}
          showError
        />
        <InputEntry
          label='Legal Entity Identifier (LEI)'
          id='parent_lei'
          {...register('parent_lei', { value: data.parent_lei })}
          errorMessage={undefined}
          showError
          isOptional
        />
        <InputEntry
          label='Research, Statistics, Supervision, Discount (RSSD) ID'
          id='parent_rssd_id'
          {...register('parent_rssd_id', { value: data.parent_rssd_id })}
          errorMessage={undefined}
          showError
          isOptional
        />

        <Divider className='u-mt45' />

        <Heading type='5' className='u-mt45 u-mb30'>
          Top Holder
        </Heading>
        <InputEntry
          label='Name'
          id='top_holder_legal_name'
          {...register('top_holder_legal_name', {
            value: data.top_holder_legal_name,
          })}
          errorMessage={undefined}
          showError
        />
        <InputEntry
          label='Legal Entity Identifier (LEI)'
          id='top_holder_lei'
          {...register('top_holder_lei', { value: data.top_holder_lei })}
          errorMessage={undefined}
          showError
          isOptional
        />
        <InputEntry
          label='Research, Statistics, Supervision, Discount (RSSD) ID'
          id='top_holder_rssd_id'
          {...register('top_holder_rssd_id', {
            value: data.top_holder_rssd_id,
          })}
          errorMessage={undefined}
          showError
          isOptional
        />
      </WellContainer>
    </FormSectionWrapper>
  );
}

UpdateAffiliateInformation.defaultProps = {
  heading: 'Update your financial institution affiliate information',
};

export default UpdateAffiliateInformation;
