import Links from 'components/CommonLinks';
import {
  Divider,
  Heading,
  Paragraph,
  WellContainer,
} from 'design-system-react';
import type { ReactNode } from 'react';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import { FormSectionWrapper } from '../../../components/FormSectionWrapper';
import InputEntry from '../../../components/InputEntry';
import { processRssdId } from './processRssdId';
import type { UpdateInstitutionType } from './types';

function UpdateAffiliateInformation({
  heading,
  register,
  formErrors,
}: {
  heading?: ReactNode;
  register: UseFormRegister<UpdateInstitutionType>;
  formErrors: FieldErrors<UpdateInstitutionType>;
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
          {...register('parent_legal_name')}
          errorMessage={formErrors.parent_legal_name?.message}
          showError
        />
        <InputEntry
          label='Legal Entity Identifier (LEI)'
          id='parent_lei'
          {...register('parent_lei')}
          errorMessage={formErrors.parent_lei?.message}
          showError
          isOptional
        />
        <InputEntry
          label='Research, Statistics, Supervision, Discount (RSSD) ID'
          id='parent_rssd_id'
          type='number'
          {...register('parent_rssd_id', {
            setValueAs: processRssdId,
          })}
          errorMessage={formErrors.parent_rssd_id?.message}
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
          {...register('top_holder_legal_name')}
          errorMessage={formErrors.top_holder_legal_name?.message}
          showError
        />
        <InputEntry
          label='Legal Entity Identifier (LEI)'
          id='top_holder_lei'
          {...register('top_holder_lei')}
          errorMessage={formErrors.top_holder_lei?.message}
          showError
          isOptional
        />
        <InputEntry
          label='Research, Statistics, Supervision, Discount (RSSD) ID'
          id='top_holder_rssd_id'
          type='number'
          {...register('top_holder_rssd_id', {
            setValueAs: processRssdId,
          })}
          errorMessage={formErrors.top_holder_rssd_id?.message}
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
