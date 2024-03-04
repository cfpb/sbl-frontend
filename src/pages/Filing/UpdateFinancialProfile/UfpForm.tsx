import { zodResolver } from '@hookform/resolvers/zod';
import submitUpdateFinancialProfile, {
  formatFinancialProfileObject,
} from 'api/requests/submitUpdateFinancialProfile';
import useSblAuth from 'api/useSblAuth';
import CrumbTrail from 'components/CrumbTrail';
import FormButtonGroup from 'components/FormButtonGroup';
import FormErrorHeader from 'components/FormErrorHeader';
import FormHeaderWrapper from 'components/FormHeaderWrapper';
import FormWrapper from 'components/FormWrapper';
import { Button, Link, TextIntroduction } from 'design-system-react';
import type { JSXElement } from 'design-system-react/dist/types/jsxElement';
import type { UFPSchema } from 'pages/Filing/UpdateFinancialProfile/types';
import { ufpSchema } from 'pages/Filing/UpdateFinancialProfile/types';
import { scenarios } from 'pages/Summary/Summary.data';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate, useParams } from 'react-router-dom';
import { Five } from 'utils/constants';
import getIsRoutingEnabled from 'utils/getIsRoutingEnabled';
import type { InstitutionDetailsApiType } from '../ViewInstitutionProfile/institutionDetails.type';
import AdditionalDetails from './AdditionalDetails';
import FinancialInstitutionDetailsForm from './FinancialInstitutionDetailsForm';
import UpdateAffiliateInformation from './UpdateAffiliateInformation';
import UpdateIdentifyingInformation from './UpdateIdentifyingInformation';
import buildUfpDefaults from './buildUfpDefaults';

export default function UFPForm({
  data,
}: {
  data: InstitutionDetailsApiType;
}): JSXElement {
  const [submitted, setSubmitted] = useState(false);
  const { lei } = useParams();
  const auth = useSblAuth();

  const defaultValues = useMemo(() => buildUfpDefaults(data), [data]);
  const isRoutingEnabled = getIsRoutingEnabled();

  const {
    // trigger,
    control,
    getValues,
    register,
    reset,
    setValue,
    formState: { errors: formErrors, dirtyFields },
  } = useForm<UFPSchema>({
    resolver: zodResolver(ufpSchema),
    defaultValues,
  });

  // TODO: Render this based on the actual API call result
  // TODO: No need to track "submitted" state once we implement validations
  //     https://github.com/cfpb/sbl-frontend/pull/276/files#r1509023108
  if (isRoutingEnabled && submitted) {
    return (
      <Navigate
        to='/summary'
        state={{ scenario: scenarios.SuccessInstitutionProfileUpdate }}
      />
    );
  }

  // Used for error scrolling
  const formErrorHeaderId = 'UFPFormErrorHeader';

  // NOTE: This function is used for submitting the multipart/formData
  const onSubmitButtonAction = async (): Promise<void> => {
    // const passesValidation = await trigger();
    // TODO: Will be used for debugging after clicking 'Submit'
    // eslint-disable-next-line no-console
    // console.log('passes validation?', passesValidation);
    // if (passesValidation) {

    try {
      const formData = getValues();
      const postableData = formatFinancialProfileObject(formData, dirtyFields);
      // eslint-disable-next-line no-console
      console.log(
        'data being submitted:',
        JSON.stringify(postableData, null, Five),
      );
      await submitUpdateFinancialProfile(auth, postableData);
      setSubmitted(true);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Error submitting UFP', error);
    }
    // }
  };

  // Reset form data to the defaultValues
  const onClearform = (): void => reset();

  // TODO: Will be used for debugging errors after clicking 'Submit'
  // eslint-disable-next-line no-console
  // console.log('formErrors:', formErrors);

  return (
    <FormWrapper>
      <div id='update-financial-profile'>
        <FormHeaderWrapper>
          <CrumbTrail>
            <Link href='/landing' key='home'>
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
        <UpdateAffiliateInformation {...{ data, register }} />
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
