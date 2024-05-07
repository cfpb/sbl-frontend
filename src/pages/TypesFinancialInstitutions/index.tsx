import { zodResolver } from '@hookform/resolvers/zod';
import AlertApiUnavailable from 'components/AlertApiUnavailable';
import CrumbTrail from 'components/CrumbTrail';
import FormButtonGroup from 'components/FormButtonGroup';
import FormHeaderWrapper from 'components/FormHeaderWrapper';
import FormMain from 'components/FormMain';
import FormWrapper from 'components/FormWrapper';
import { LoadingContent } from 'components/Loading';
import { Button, TextIntroduction } from 'design-system-react';
import TypesFinancialInstitutionSection from 'pages/Filing/UpdateFinancialProfile/TypesFinancialInstitutionSection';
import type { UpdateInstitutionType } from 'pages/Filing/UpdateFinancialProfile/types';
import { UpdateInstitutionSchema } from 'pages/Filing/UpdateFinancialProfile/types';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import useInstitutionDetails from 'utils/useInstitutionDetails';

function TypesFinancialInstitutions(): JSX.Element {
  const { lei, year } = useParams();
  const navigate = useNavigate();

  const defaultValues = {
    sbl_institution_types: [],
    sbl_institution_types_other: '',
  };

  const {
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

  const onSubmit = (): void => {
    // TODO: API integration
    console.log('Submit:', getValues());
    navigate(`/filing/${year}/${lei}/create`);
  };

  // TODO: Disable submit button until form correctly filled out
  // TODO: Update page content
  // TODO: Top pacing is wrong for TextIntroduction.description
  // TODO: Use NavigationButton for `save and continue`? i.e. show > icon

  return (
    <div id='types-financial-institutions'>
      <CrumbTrail>
        <Button
          label='Filing Home'
          onClick={() => navigate('/filing')} // TODO: make onAction function
          asLink
        />
      </CrumbTrail>
      <FormWrapper isMarginTop={false}>
        <FormHeaderWrapper>
          <TextIntroduction
            heading='Provide your type(s) of financial institution'
            subheading='Select all applicable options that describe your financial institution. If you wish to provide additional types of financial institutions please add them to “Other” and check the box.'
            description={
              <>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation.
              </>
            }
          />
        </FormHeaderWrapper>
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
            />
            <Button
              label='Clear form'
              onClick={() => reset(defaultValues)} // TODO: make onAction function
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
