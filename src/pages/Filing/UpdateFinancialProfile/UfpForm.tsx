import { zodResolver } from '@hookform/resolvers/zod';
import { collectChangedData } from 'api/requests/submitUpdateFinancialProfile';
import Button from 'components/Button';
import CrumbTrail from 'components/CrumbTrail';
import FormButtonGroup from 'components/FormButtonGroup';
import FormErrorHeader from 'components/FormErrorHeader';
import type { IdFormHeaderErrorsType } from 'components/FormErrorHeader.data';
import { IdFormHeaderErrors } from 'components/FormErrorHeader.data';
import FormHeaderWrapper from 'components/FormHeaderWrapper';
import FormWrapper from 'components/FormWrapper';
import { Link } from 'components/Link';
import { Paragraph, TextIntroduction } from 'design-system-react';
import type { JSXElement } from 'design-system-react/dist/types/jsxElement';
import type { UpdateInstitutionType } from 'pages/Filing/UpdateFinancialProfile/types';
import { UpdateInstitutionSchema } from 'pages/Filing/UpdateFinancialProfile/types';
import { AlertInstitutionApiUnreachable } from 'pages/Filing/ViewInstitutionProfile/AlertInstitutionApiUnreachable';
import { scrollToElement } from 'pages/ProfileForm/ProfileFormUtils';
import { scenarios } from 'pages/Summary/Summary.data';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import type { InstitutionDetailsApiType } from 'types/formTypes';
import { Five } from 'utils/constants';
import { updateFinancialProfileKeyLogic } from 'utils/getFormErrorKeyLogic';
import getIsRoutingEnabled from 'utils/getIsRoutingEnabled';
import useSubmitUpdateFinancialProfile from 'utils/useSubmitUpdateFinancialProfile';
import FinancialInstitutionDetailsForm from './FinancialInstitutionDetailsForm';
import UpdateAffiliateInformation from './UpdateAffiliateInformation';
import UpdateIdentifyingInformation from './UpdateIdentifyingInformation';
import buildProfileFormDefaults from './buildProfileFormDefaults';
import { formErrorsOrder } from './formErrorsOrder';

export default function UFPForm({
  data = {} as InstitutionDetailsApiType,
  isError = false,
}: {
  data: InstitutionDetailsApiType | undefined;
  isError: boolean;
}): JSXElement {
  const { lei } = useParams();
  const isRoutingEnabled = getIsRoutingEnabled();
  const navigate = useNavigate();

  const dataIsMissing = isError || !data;

  const defaultValues = useMemo(
    () => (dataIsMissing ? {} : buildProfileFormDefaults(data)),
    [data, dataIsMissing],
  );

  const {
    trigger,
    register,
    reset,
    setValue,
    formState: { errors: formErrors, dirtyFields },
    watch,
  } = useForm<UpdateInstitutionType>({
    resolver: zodResolver(UpdateInstitutionSchema),
    defaultValues,
  });

  const changedData = dataIsMissing
    ? null
    : collectChangedData(watch(), dirtyFields, data);

  // Used for error scrolling
  const formErrorHeaderId = 'UFPFormErrorHeader';

  const {
    mutateAsync: mutateSubmitUpdateFinancialProfile,
    isLoading: isLoadingSubmitUpdateFinancialProfile,
  } = useSubmitUpdateFinancialProfile();

  // NOTE: This function is used for submitting the multipart/formData
  const onSubmitButtonAction = async (): Promise<void> => {
    const passesValidation = await trigger();

    if (passesValidation && changedData) {
      if (import.meta.env.DEV) {
        // eslint-disable-next-line no-console
        console.log(
          'Data being submitted:',
          JSON.stringify(changedData, null, Five),
        );
      }
      try {
        await mutateSubmitUpdateFinancialProfile({
          financialProfileObject: changedData,
        });
        if (isRoutingEnabled)
          navigate(`/institution/${lei}/update/summary/updated`, {
            state: { scenario: scenarios.SuccessInstitutionProfileUpdate },
          });
      } catch (error) {
        console.error('Error submitting UFP', error);
      }
    } else {
      scrollToElement(formErrorHeaderId);
    }
  };

  // Reset form data to the defaultValues
  const onClearform = (): void => reset();

  const orderedFormErrorsObject = useMemo(
    () =>
      formErrorsOrder(formErrors, [
        'rssd_id',
        'tax_id',
        'sbl_institution_types_other',
        'parent_lei',
        'parent_rssd_id',
        'top_holder_lei',
        'top_holder_rssd_id',
      ]),
    [formErrors],
  );

  return (
    <main id='main'>
      <CrumbTrail>
        <Link href='/landing' key='home'>
          Home
        </Link>
        {lei ? (
          <Link href={`/institution/${lei}`} key='view-instition'>
            View your financial institution profile
          </Link>
        ) : null}
      </CrumbTrail>
      <FormWrapper isMarginTop={false}>
        <FormHeaderWrapper>
          <TextIntroduction
            heading='Update your financial institution profile'
            subheading='This profile reflects the most current data available to the CFPB for your financial institution. We pull data from sources including Global Legal Entity Identifier Foundation (GLEIF), the National Information Center (NIC), and direct requests to our support staff.'
            description={
              <Paragraph>
                Only fill out the form fields you wish to update. Requested
                updates are processed by our support staff. Please allow 24-48
                hours for a response during normal business hours. If you need
                additional assistance with this form,{' '}
                <Link href='mailto:SBLHelp@cfpb.gov?subject=[BETA] Update financial institution profile: Additional assistance'>
                  email our support staff
                </Link>
                .
              </Paragraph>
            }
          />
        </FormHeaderWrapper>
        <AlertInstitutionApiUnreachable isError={dataIsMissing}>
          <FormErrorHeader<UpdateInstitutionType, IdFormHeaderErrorsType>
            alertHeading='There was a problem updating your financial institution profile'
            errors={orderedFormErrorsObject}
            id={formErrorHeaderId}
            formErrorHeaderObject={IdFormHeaderErrors}
            keyLogicFunc={updateFinancialProfileKeyLogic}
          />
          <FinancialInstitutionDetailsForm {...{ data }} />
          <UpdateIdentifyingInformation
            {...{ data, register, setValue, watch, formErrors }}
          />
          <UpdateAffiliateInformation
            {...{ register, formErrors, watch }}
            heading='Update your parent entity information (if applicable)'
          />
          <FormButtonGroup>
            <Button
              id='nav-submit'
              label='Submit'
              appearance='primary'
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={onSubmitButtonAction}
              iconRight={
                isLoadingSubmitUpdateFinancialProfile ? 'updating' : ''
              }
              disabled={!changedData}
              type='submit'
            />
            <Button
              id='nav-reset'
              label='Reset form'
              appearance='warning'
              onClick={onClearform}
              asLink
            />
          </FormButtonGroup>
        </AlertInstitutionApiUnreachable>
      </FormWrapper>
    </main>
  );
}
