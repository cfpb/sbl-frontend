import { zodResolver } from '@hookform/resolvers/zod';
import { collectChangedData } from 'api/requests/submitUpdateFinancialProfile';
import useSblAuth from 'api/useSblAuth';
import CrumbTrail from 'components/CrumbTrail';
import FormButtonGroup from 'components/FormButtonGroup';
import FormErrorHeader from 'components/FormErrorHeader';
import FormHeaderWrapper from 'components/FormHeaderWrapper';
import FormWrapper from 'components/FormWrapper';
import { Link, Paragraph, TextIntroduction } from 'design-system-react';
import type { JSXElement } from 'design-system-react/dist/types/jsxElement';
import type { UpdateInstitutionType } from 'pages/Filing/UpdateFinancialProfile/types';
import { UpdateInstitutionSchema } from 'pages/Filing/UpdateFinancialProfile/types';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import type {
  IdFormHeaderErrorsType,
  InstitutionDetailsApiType,
} from 'types/formTypes';
import { IdFormHeaderErrors } from 'types/formTypes';
import { updateFinancialProfileKeyLogic } from 'utils/getFormErrorKeyLogic';
import getIsRoutingEnabled from 'utils/getIsRoutingEnabled';
import FilingNavButtons from '../FilingApp/FilingNavButtons';
import AdditionalDetails from './AdditionalDetails';
import FinancialInstitutionDetailsForm from './FinancialInstitutionDetailsForm';
import UpdateAffiliateInformation from './UpdateAffiliateInformation';
import UpdateIdentifyingInformation from './UpdateIdentifyingInformation';
import buildProfileFormDefaults from './buildProfileFormDefaults';

export default function UFPForm({
  data,
}: {
  data: InstitutionDetailsApiType;
}): JSXElement {
  const { lei } = useParams();
  const auth = useSblAuth();
  const isRoutingEnabled = getIsRoutingEnabled();
  const navigate = useNavigate();

  const defaultValues = useMemo(() => buildProfileFormDefaults(data), [data]);

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

  console.log('ufp defaultValues:', defaultValues);
  console.log('ufp formErrors:', formErrors);

  const changedData = collectChangedData(watch(), dirtyFields, data);

  // Used for error scrolling
  const formErrorHeaderId = 'UFPFormErrorHeader';

  // NOTE: This function is used for submitting the multipart/formData
  const onSubmitButtonAction = async (): Promise<void> => {
    const passesValidation = await trigger();

    // if (passesValidation && changedData) {
    //   // eslint-disable-next-line no-console
    //   console.log(
    //     'Data being submitted:',
    //     JSON.stringify(changedData, null, Five),
    //   );
    //   try {
    //     await submitUpdateFinancialProfile(auth, changedData);
    //     if (isRoutingEnabled)
    //       navigate('/summary', {
    //         state: { scenario: scenarios.SuccessInstitutionProfileUpdate },
    //       });
    //   } catch (error) {
    //     // eslint-disable-next-line no-console
    //     console.log('Error submitting UFP', error);
    //   }
    // } else {
    //   scrollToElement(formErrorHeaderId);
    // }
  };

  // Reset form data to the defaultValues
  const onClearform = (): void => reset();
  const onPreviousClick = (): void => navigate(`/institution/${lei}`);

  return (
    <main id='main'>
      <CrumbTrail>
        <Link isRouterLink href='/landing' key='home'>
          Platform home
        </Link>
        {lei ? (
          <Link isRouterLink href={`/institution/${lei}`} key='view-instition'>
            View your financial institution profile
          </Link>
        ) : null}
      </CrumbTrail>
      <FormWrapper isMarginTop={false}>
        <FormHeaderWrapper>
          <TextIntroduction
            heading='Update your financial institution profile'
            subheading='You are required to provide certain identifying information about your financial institution as part of your submission. Most updates to your financial institution profile must be handled at the source (GLEIF or NIC). For all other update requests, complete this form.  '
            description={
              <Paragraph>
                Requested updates are processed by our support staff. Please
                allow 24-48 hours for a response during normal business hours.
              </Paragraph>
            }
          />
        </FormHeaderWrapper>
        <FormErrorHeader<IdFormHeaderErrorsType>
          errors={formErrors}
          id={formErrorHeaderId}
          formErrorHeaderObject={IdFormHeaderErrors}
          keyLogicFunc={updateFinancialProfileKeyLogic}
        />
        <FinancialInstitutionDetailsForm {...{ data }} />
        <UpdateIdentifyingInformation
          {...{ data, register, setValue, watch, formErrors }}
        />
        <UpdateAffiliateInformation {...{ register, formErrors, watch }} />
        <AdditionalDetails {...{ register }} />

        <FormButtonGroup>
          <FilingNavButtons
            onNextClick={onSubmitButtonAction}
            isNextDisabled={!changedData}
            onPreviousClick={onPreviousClick}
            onClearClick={onClearform}
          />
        </FormButtonGroup>
      </FormWrapper>
    </main>
  );
}
