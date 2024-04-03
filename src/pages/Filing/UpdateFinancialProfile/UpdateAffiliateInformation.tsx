import Links from 'components/CommonLinks';
import SectionIntro from 'components/SectionIntro';
import { Divider, Heading, WellContainer } from 'design-system-react';
import type { ReactNode } from 'react';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import { FormSectionWrapper } from '../../../components/FormSectionWrapper';
import InputEntry from '../../../components/InputEntry';
import InstitutionDataLabels from '../formHelpers';
import { processRssdId } from './processRssdId';
import type { UpdateInstitutionType } from './types';

function UpdateAffiliateInformation({
  heading = 'Update your financial institution affiliate information',
  register,
  formErrors,
}: {
  heading?: ReactNode;
  register: UseFormRegister<UpdateInstitutionType>;
  formErrors: FieldErrors<UpdateInstitutionType>;
}): JSX.Element {
  return (
    <FormSectionWrapper legend={heading}>
      <SectionIntro heading={heading}>
        To request an update to an LEI-based affiliate, visit <Links.GLIEF />.
        To request an update to an RSSD ID-based affiliate, visit <Links.NIC />.
        If you have affiliates with no LEI or RSSD ID, provide the names of
        those institutions in the form below.
      </SectionIntro>

      <WellContainer className='u-mt30'>
        <Heading type='2' className='u-mb30 h5'>
          Parent entity
        </Heading>
        <InputEntry
          label={InstitutionDataLabels.name}
          id='parent_legal_name'
          {...register('parent_legal_name')}
          errorMessage={formErrors.parent_legal_name?.message}
          showError
          isOptional
        />
        <InputEntry
          label={InstitutionDataLabels.lei}
          id='parent_lei'
          {...register('parent_lei')}
          errorMessage={formErrors.parent_lei?.message}
          showError
          isOptional
        />
        <InputEntry
          label={InstitutionDataLabels.rssd}
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

        <Heading type='2' className='u-mt45 u-mb30 h5'>
          Top Holder
        </Heading>
        <InputEntry
          label={InstitutionDataLabels.name}
          id='top_holder_legal_name'
          {...register('top_holder_legal_name')}
          errorMessage={formErrors.top_holder_legal_name?.message}
          showError
          isOptional
        />
        <InputEntry
          label={InstitutionDataLabels.lei}
          id='top_holder_lei'
          {...register('top_holder_lei')}
          errorMessage={formErrors.top_holder_lei?.message}
          showError
          isOptional
        />
        <InputEntry
          label={InstitutionDataLabels.rssd}
          id='top_holder_rssd_id'
          type='number'
          {...register('top_holder_rssd_id', {
            setValueAs: processRssdId,
          })}
          errorMessage={formErrors.top_holder_rssd_id?.message}
          showError
          isOptional
          isLast
        />
      </WellContainer>
    </FormSectionWrapper>
  );
}

UpdateAffiliateInformation.defaultProps = {
  heading: 'Update your financial institution affiliate information',
};

export default UpdateAffiliateInformation;
