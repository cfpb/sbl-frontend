import Links from 'components/CommonLinks';
import SectionIntro from 'components/SectionIntro';
import { Divider, Heading, WellContainer } from 'design-system-react';
import type { ReactNode } from 'react';
import type {
  FieldErrors,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form';
import { FormSectionWrapper } from '../../../components/FormSectionWrapper';
import InputEntry from '../../../components/InputEntry';
import InstitutionDataLabels, { InstitutionHelperText } from '../formHelpers';
import processRssdId from './processRssdId';
import type { UpdateInstitutionType } from './types';

const parentRssd = 'parent_rssd_id';
const topHolderRssd = 'top_holder_rssd_id';

function UpdateAffiliateInformation({
  heading,
  register,
  formErrors,
  watch,
}: {
  heading?: ReactNode;
  register: UseFormRegister<UpdateInstitutionType>;
  formErrors: FieldErrors<UpdateInstitutionType>;
  watch: UseFormWatch<UpdateInstitutionType>;
}): JSX.Element {
  // setValueAs leaves displayed value out of sync with saved value
  const parentRssdValue = watch(parentRssd);
  const topHolderRssdValue = watch(topHolderRssd);

  return (
    <FormSectionWrapper>
      <SectionIntro heading={heading}>
        To request an update to an LEI-based affiliate, visit <Links.GLIEF />.
        To request an update to an RSSD ID-based affiliate, visit <Links.NIC />.
        If you have affiliates with no LEI or RSSD ID, provide the names of
        those institutions in the form below.
      </SectionIntro>

      <WellContainer className='u-mt30'>
        <Heading type='4' className='u-mb30 h5'>
          Parent entity
        </Heading>
        <InputEntry
          label={InstitutionDataLabels.name}
          id='parent_legal_name'
          {...register('parent_legal_name')}
          errorMessage={formErrors.parent_legal_name?.message}
          showError
        />
        <InputEntry
          label={InstitutionDataLabels.rssd}
          helperText={InstitutionHelperText.rssd}
          id={parentRssd}
          {...register(parentRssd, {
            setValueAs: processRssdId,
          })}
          value={parentRssdValue}
          errorMessage={formErrors.parent_rssd_id?.message?.replaceAll(
            'Parent RSSD ID',
            'RSSD ID',
          )}
          showError
        />
        <InputEntry
          label={InstitutionDataLabels.lei}
          helperText={InstitutionHelperText.lei}
          id='parent_lei'
          {...register('parent_lei')}
          errorMessage={formErrors.parent_lei?.message?.replaceAll(
            'Parent LEI',
            'LEI',
          )}
          showError
        />

        <Divider className='u-mt45' />

        <Heading type='4' className='u-mt45 u-mb30 h5'>
          Top Holder
        </Heading>
        <InputEntry
          label={InstitutionDataLabels.name}
          id='top_holder_legal_name'
          {...register('top_holder_legal_name')}
          errorMessage={formErrors.top_holder_legal_name?.message}
          showError
        />
        <InputEntry
          label={InstitutionDataLabels.rssd}
          helperText={InstitutionHelperText.rssd}
          id={topHolderRssd}
          {...register(topHolderRssd, {
            setValueAs: processRssdId,
          })}
          value={topHolderRssdValue}
          errorMessage={formErrors.top_holder_rssd_id?.message?.replaceAll(
            'Top holder RSSD ID',
            'RSSD ID',
          )}
          showError
        />
        <InputEntry
          label={InstitutionDataLabels.lei}
          helperText={InstitutionHelperText.lei}
          id='top_holder_lei'
          {...register('top_holder_lei')}
          errorMessage={formErrors.top_holder_lei?.message?.replaceAll(
            'Top holder LEI',
            'LEI',
          )}
          showError
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
