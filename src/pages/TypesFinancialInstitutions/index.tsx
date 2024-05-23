import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import submitUpdateInstitutionTypeSbl from 'api/requests/submitUpdateInstitutionTypeSbl';
import useSblAuth from 'api/useSblAuth';
import AlertApiUnavailable from 'components/AlertApiUnavailable';
import FormButtonGroup from 'components/FormButtonGroup';
import FormErrorHeader from 'components/FormErrorHeader';
import FormHeaderWrapper from 'components/FormHeaderWrapper';
import FormMain from 'components/FormMain';
import FormWrapper from 'components/FormWrapper';
import { LoadingContent } from 'components/Loading';
import { Alert, TextIntroduction } from 'design-system-react';
import FilingNavButtons from 'pages/Filing/FilingApp/FilingNavButtons';
import InstitutionHeading from 'pages/Filing/FilingApp/InstitutionHeading';
import TypesFinancialInstitutionSection from 'pages/Filing/UpdateFinancialProfile/TypesFinancialInstitutionSection';
import type {
  UpdateTOIFormHeaderErrorsType,
  UpdateTypeOfInstitutionType,
} from 'pages/Filing/UpdateFinancialProfile/types';
import {
  UpdateTOIFormHeaderErrors,
  UpdateTypeOfInstitutionSchema,
} from 'pages/Filing/UpdateFinancialProfile/types';
import { scrollToElement } from 'pages/ProfileForm/ProfileFormUtils';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { normalKeyLogic } from 'utils/getFormErrorKeyLogic';
import useInstitutionDetails from 'utils/useInstitutionDetails';
import { formatTypesForApi } from './TypesFinancialInstitutions.helpers';

function TypesFinancialInstitutions(): JSX.Element {
  const auth = useSblAuth();
  const { lei, year } = useParams();
  const navigate = useNavigate();
  const formErrorHeaderId = 'TypesFinancialInstitutionsErrors';

  const defaultValues = {
    sbl_institution_types: [],
    sbl_institution_types_other: '',
  };

  const filingPeriod = year ?? '2024';

  const {
    trigger,
    register,
    control,
    setValue,
    getValues,
    watch,
    reset,
    formState: { errors: formErrors },
  } = useForm<UpdateTypeOfInstitutionType>({
    resolver: zodResolver(UpdateTypeOfInstitutionSchema),
    defaultValues,
  });

  const {
    mutateAsync,
    isLoading: isUpdateLoading,
    isError: isUpdateError,
  } = useMutation({
    mutationFn: async () =>
      submitUpdateInstitutionTypeSbl(auth, lei, formatTypesForApi(getValues())),
  });

  const { data: institution, isLoading, isError } = useInstitutionDetails(lei);

  if (isLoading)
    return <LoadingContent message='Loading institution data...' />;

  if (isError)
    return (
      <div className='u-mt45'>
        <AlertApiUnavailable message='Unable to load institution data' />
      </div>
    );

  const onSubmit = async (
    event?: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event?.preventDefault();
    const passesValidation = await trigger();

    if (passesValidation) {
      try {
        await mutateAsync();
        navigate(`/filing/${filingPeriod}/${lei}/create`);
      } catch {
        // eslint-disable-next-line no-console
        throw new Error(
          `[Error][submitUpdateInstitutionTypeSbl] Unable to update institution type for ${lei}`,
        );
      }
    } else {
      scrollToElement(formErrorHeaderId);
    }
  };

  const onGoToFiling = (): void => navigate('/filing');
  const onClearForm = (): void => reset(defaultValues);

  return (
    <div id='types-financial-institutions'>
      <FormWrapper isMarginTop={false}>
        <FormHeaderWrapper>
          <div className='mb-[0.9375rem]'>
            <InstitutionHeading
              eyebrow
              name={institution.name}
              filingPeriod={year}
            />
          </div>
          <TextIntroduction
            heading='Provide your type of financial institution'
            subheading='Select all applicable types of financial institutions from the list below. If the enumerated types do not appropriately describe your institution, or if you wish to add additional types, select "Other" and add your financial institution type in the text field.'
            description='You must select at least one type of financial institution to continue. Multiple entries in the “Other” text field should be separated by a comma and a space. You must both check “Other” and populate the text field in order to add a type.'
          />
        </FormHeaderWrapper>
        <FormErrorHeader<UpdateTOIFormHeaderErrorsType>
          errors={formErrors}
          id={formErrorHeaderId}
          formErrorHeaderObject={UpdateTOIFormHeaderErrors}
          keyLogicFunc={normalKeyLogic}
        />
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <FormMain onSubmit={onSubmit}>
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
          <div className='u-mt15'>
            <Alert
              message='Unable to update type of financial institution'
              status='error'
              isVisible={isUpdateError}
            >
              Please try again by clicking &quot;Save and continue&quot;. If the
              issue persists, please{' '}
              <Link href='mailto:SBLHelp@cfpb.gov?subject=[BETA] Unable to update type of financial institution'>
                contact our support staff
              </Link>
              .
            </Alert>
          </div>
          <FormButtonGroup>
            <FilingNavButtons
              classNameButtonContainer='u-mb0'
              onPreviousClick={onGoToFiling}
              onClearClick={onClearForm}
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onNextClick={onSubmit}
              isLoading={isUpdateLoading}
            />
          </FormButtonGroup>
        </FormMain>
      </FormWrapper>
    </div>
  );
}

export default TypesFinancialInstitutions;
