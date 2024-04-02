import { zodResolver } from '@hookform/resolvers/zod';
import submitUpdateFinancialProfile, {
  collectChangedData,
} from 'api/requests/submitUpdateFinancialProfile';
import useSblAuth from 'api/useSblAuth';
import CrumbTrail from 'components/CrumbTrail';
import FormButtonGroup from 'components/FormButtonGroup';
import FormErrorHeader from 'components/FormErrorHeader';
import FormHeaderWrapper from 'components/FormHeaderWrapper';
import FormWrapper from 'components/FormWrapper';
import { Button, Link, TextIntroduction } from 'design-system-react';
import type { JSXElement } from 'design-system-react/dist/types/jsxElement';
import type { UpdateInstitutionType } from 'pages/Filing/UpdateFinancialProfile/types';
import { UpdateInstitutionSchema } from 'pages/Filing/UpdateFinancialProfile/types';
import { scrollToElement } from 'pages/ProfileForm/ProfileFormUtils';
import { scenarios } from 'pages/Summary/Summary.data';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import type { InstitutionDetailsApiType } from 'types/formTypes';
import { Five } from 'utils/constants';
import { updateFinancialProfileKeyLogic } from 'utils/getFormErrorKeyLogic';
import getIsRoutingEnabled from 'utils/getIsRoutingEnabled';
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

  const changedData = collectChangedData(watch(), dirtyFields, data);

  // Used for error scrolling
  const formErrorHeaderId = 'UFPFormErrorHeader';

  // NOTE: This function is used for submitting the multipart/formData
  const onSubmitButtonAction = async (): Promise<void> => {
    const passesValidation = await trigger();

    if (passesValidation && changedData) {
      // eslint-disable-next-line no-console
      console.log(
        'Data being submitted:',
        JSON.stringify(changedData, null, Five),
      );
      try {
        await submitUpdateFinancialProfile(auth, changedData);
        if (isRoutingEnabled)
          navigate('/summary', {
            state: { scenario: scenarios.SuccessInstitutionProfileUpdate },
          });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Error submitting UFP', error);
      }
    } else {
      scrollToElement(formErrorHeaderId);
    }
  };

  // Reset form data to the defaultValues
  const onClearform = (): void => reset();

  return (
    <div id='update-financial-profile'>
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
            subheading='This profile reflects the most current data available to the CFPB for your financial institution. Most updates to your financial institution profile details must be handled at the source (GLEIF or NIC). For all other update requests, complete this form.'
            description={
              <>
                Requested updates are processed by our support staff. Please
                allow 24-48 hours for a response during normal business hours.
              </>
            }
          />
        </FormHeaderWrapper>
        <FormErrorHeader
          errors={formErrors}
          id={formErrorHeaderId}
          keyLogicFunc={updateFinancialProfileKeyLogic}
        />
        <FinancialInstitutionDetailsForm {...{ data }} />
        <UpdateIdentifyingInformation
          {...{ data, register, setValue, watch, formErrors }}
        />
        <UpdateAffiliateInformation {...{ register, formErrors }} />
        <AdditionalDetails {...{ register }} />

        <FormButtonGroup>
          <Button
            appearance='primary'
            // TODO: Resolve this TypeScript Error
            // https://github.com/cfpb/sbl-frontend/issues/237
            // https://github.com/orgs/react-hook-form/discussions/8622#discussioncomment-4060570
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={onSubmitButtonAction}
            label='Submit'
            aria-label='Submit User Profile'
            size='default'
            type='submit'
            disabled={!changedData}
          />
          <Button
            label='Clear form'
            onClick={onClearform}
            appearance='warning'
            asLink
          />
        </FormButtonGroup>
      </FormWrapper>
    </div>
  );
}
