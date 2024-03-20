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
    control,
    getValues,
    register,
    reset,
    setValue,
    formState: { errors: formErrors, dirtyFields },
  } = useForm<UpdateInstitutionType>({
    resolver: zodResolver(UpdateInstitutionSchema),
    defaultValues,
  });

  // Used for error scrolling
  const formErrorHeaderId = 'UFPFormErrorHeader';

  // NOTE: This function is used for submitting the multipart/formData
  const onSubmitButtonAction = async (): Promise<void> => {
    const passesValidation = await trigger();
    // console.log('formdata', getValues());

    if (passesValidation) {
      try {
        const formData = getValues();
        const postableData = collectChangedData(formData, dirtyFields);
        postableData.Note =
          'This data reflects the institution data that has been changed';
        // eslint-disable-next-line no-console
        console.log(
          'data being submitted:',
          JSON.stringify(postableData, null, Five),
        );
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
                View Institution
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
          {...{ data, register, setValue, getValues, control, formErrors }}
        />
        <UpdateAffiliateInformation {...{ register, formErrors }} />
        <AdditionalDetails {...{ register }} />

        <FormButtonGroup>
          <Button
            appearance='primary'
            // TODO: Resolve this TypeScript Error
            // https://github.com/cfpb/sbl-frontend/issues/237
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
