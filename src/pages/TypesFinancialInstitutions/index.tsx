import { zodResolver } from '@hookform/resolvers/zod';
import AlertApiUnavailable from 'components/AlertApiUnavailable';
import CrumbTrail from 'components/CrumbTrail';
import FormButtonGroup from 'components/FormButtonGroup';
import FormErrorHeader from 'components/FormErrorHeader';
import FormHeaderWrapper from 'components/FormHeaderWrapper';
import FormMain from 'components/FormMain';
import FormWrapper from 'components/FormWrapper';
import { LoadingContent } from 'components/Loading';
import { Button, TextIntroduction } from 'design-system-react';
import TypesFinancialInstitutionSection from 'pages/Filing/UpdateFinancialProfile/TypesFinancialInstitutionSection';
import type { UpdateInstitutionType } from 'pages/Filing/UpdateFinancialProfile/types';
import { UpdateInstitutionSchema } from 'pages/Filing/UpdateFinancialProfile/types';
import { scrollToElement } from 'pages/ProfileForm/ProfileFormUtils';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { normalKeyLogic } from 'utils/getFormErrorKeyLogic';
import useInstitutionDetails from 'utils/useInstitutionDetails';

function TypesFinancialInstitutions(): JSX.Element {
  const { lei, year } = useParams();
  const navigate = useNavigate();
  const formErrorHeaderId = 'TypesFinancialInstitutionsErrors';

  const defaultValues = {
    sbl_institution_types: [],
    sbl_institution_types_other: '',
  };

  const {
    // trigger,
    register,
    control,
    setValue,
    getValues,
    watch,
    reset,
    formState: { errors: formErrors },
  } = useForm<UpdateInstitutionType>({
    resolver: zodResolver(UpdateInstitutionSchema),
    defaultValues,
  });

  const { data: institution, isLoading, isError } = useInstitutionDetails(lei);

  if (isLoading)
    return <LoadingContent message='Loading institution data...' />;

  if (isError)
    return <AlertApiUnavailable message='Unable to load institution data' />;

  const onSubmit = async (): void => {
    // TODO: Form validation
    const passesValidation = true; // await trigger();
    if (passesValidation) {
      // TODO: API integration
      console.log('Submit:', getValues());
      navigate(`/filing/${year}/${lei}/create`);
    } else {
      scrollToElement(formErrorHeaderId);
    }
  };

  const onGoToFiling = (): void => navigate('/filing');
  const onClearForm = (): void => reset(defaultValues);

  const hasFormValidationErrors = Object.keys(formErrors).length > 0;

  return (
    <div id='types-financial-institutions'>
      <CrumbTrail>
        <Button label='Filing Home' onClick={onGoToFiling} asLink />
      </CrumbTrail>
      <FormWrapper isMarginTop={false}>
        <FormHeaderWrapper>
          <TextIntroduction
            heading='Provide your type of financial institution'
            subheading='Select all applicable types of financial institutions from the list below. If the enumerated types do not appropriately describe your institution, or if you wish to add additional types, select "Other" and add your financial institution type in the text field.'
            description='You must select at least one type of financial institution to continue. Multiple entries in the “Other” text field should be separated by a comma and a space. You must both check “Other” and populate the text field in order to add a type.'
          />
        </FormHeaderWrapper>
        <FormErrorHeader
          errors={formErrors}
          id={formErrorHeaderId}
          keyLogicFunc={normalKeyLogic}
        />
        <FormMain>
          <TypesFinancialInstitutionSection
            {...{
              data: institution,
              watch,
              register,
              control,
              setValue,
              formErrors,
            }}
          />
          <FormButtonGroup>
            <Button
              appearance='primary'
              onClick={onSubmit}
              label='Save and continue'
              aria-label='Save and continue'
              size='default'
              type='button'
              iconRight='right'
              disabled={hasFormValidationErrors}
            />
            <Button
              label='Clear form'
              onClick={onClearForm}
              appearance='warning'
              asLink
            />
          </FormButtonGroup>
        </FormMain>
      </FormWrapper>
    </div>
  );
}

export default TypesFinancialInstitutions;
