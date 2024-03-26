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
import { Alert, Button, Link, TextIntroduction } from 'design-system-react';
import type { JSXElement } from 'design-system-react/dist/types/jsxElement';
import type { UpdateInstitutionType } from 'pages/Filing/UpdateFinancialProfile/types';
import { UpdateInstitutionSchema } from 'pages/Filing/UpdateFinancialProfile/types';
import { scrollToElement } from 'pages/ProfileForm/ProfileFormUtils';
import { scenarios } from 'pages/Summary/Summary.data';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import type { InstitutionDetailsApiType } from 'types/formTypes';
import { Five } from 'utils/constants';
import getIsRoutingEnabled from 'utils/getIsRoutingEnabled';
import AdditionalDetails from './AdditionalDetails';
import FinancialInstitutionDetailsForm from './FinancialInstitutionDetailsForm';
import UpdateAffiliateInformation from './UpdateAffiliateInformation';
import UpdateIdentifyingInformation from './UpdateIdentifyingInformation';
import buildProfileFormDefaults from './buildProfileFormDefaults';

const HIDE_SUBMISSION_ALERT_TIMEOUT = 5000;

export default function UFPForm({
  data,
}: {
  data: InstitutionDetailsApiType;
}): JSXElement {
  const { lei } = useParams();
  const auth = useSblAuth();
  const isRoutingEnabled = getIsRoutingEnabled();
  const navigate = useNavigate();

  const [submitNoChanges, setSubmitNoChanges] = useState(false);

  const defaultValues = useMemo(() => buildProfileFormDefaults(data), [data]);

  const {
    trigger,
    getValues,
    register,
    reset,
    setValue,
    formState: { errors: formErrors, dirtyFields },
    watch,
  } = useForm<UpdateInstitutionType>({
    resolver: zodResolver(UpdateInstitutionSchema),
    defaultValues,
  });

  // Used for error scrolling
  const formErrorHeaderId = 'UFPFormErrorHeader';

  // NOTE: This function is used for submitting the multipart/formData
  const onSubmitButtonAction = async (): Promise<void> => {
    const passesValidation = await trigger();

    if (passesValidation) {
      const formData = getValues();
      const postableData = collectChangedData(formData, dirtyFields, data);
      if (
        Object.keys(postableData).length > 0 &&
        Object.keys(postableData).toString() !== 'additional_details'
      ) {
        postableData.Note =
          'This data reflects the institution data that has been changed';
        // eslint-disable-next-line no-console
        console.log(
          'data being submitted:',
          JSON.stringify(postableData, null, Five),
        );
        try {
          await submitUpdateFinancialProfile(auth, postableData);
          if (isRoutingEnabled)
            navigate('/summary', {
              state: { scenario: scenarios.SuccessInstitutionProfileUpdate },
            });
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log('Error submitting UFP', error);
        }
      } else {
        setSubmitNoChanges(true);
        setTimeout(
          () => setSubmitNoChanges(false),
          HIDE_SUBMISSION_ALERT_TIMEOUT,
        );
      }
    } else {
      scrollToElement(formErrorHeaderId);
    }
  };

  // Reset form data to the defaultValues
  const onClearform = (): void => reset();

  return (
    <FormWrapper>
      <div id='update-financial-profile'>
        <FormHeaderWrapper>
          <CrumbTrail>
            <Link isRouterLink href='/landing' key='home'>
              Platform home
            </Link>
            {lei ? (
              <Link
                isRouterLink
                href={`/institution/${lei}`}
                key='view-instition'
              >
                View your financial institution profile
              </Link>
            ) : null}
          </CrumbTrail>
          <TextIntroduction
            heading='Update your financial institution profile'
            subheading='This profile reflects the most current data available to the CFPB for your financial institution. Most updates to your financial institution profile details must be handled at the source (GLEIF or NIC). For  all other update requests, fill out the form below.'
            description={
              <>
                Requested updates are processed by our support staff. Please
                allow 24-48 hours for a response during normal business hours.
              </>
            }
          />
        </FormHeaderWrapper>
        <FormErrorHeader errors={formErrors} id={formErrorHeaderId} />
        <FinancialInstitutionDetailsForm {...{ data }} />
        <UpdateIdentifyingInformation
          {...{ data, register, setValue, watch, formErrors }}
        />
        <UpdateAffiliateInformation {...{ register, formErrors }} />
        <AdditionalDetails {...{ register }} />

        {submitNoChanges ? (
          <Alert
            className='my-10'
            status='warning'
            message='You have not changed any Institution data. No request has been sent to SBL Help.'
          />
        ) : null}

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
            // TODO: Allow form submission without changed data?
            // disabled={!(hasChanges || Object.keys(dirtyFields).length > 0)}
          />
          <Button
            label='Clear form'
            onClick={onClearform}
            appearance='warning'
            asLink
          />
        </FormButtonGroup>
      </div>
    </FormWrapper>
  );
}
