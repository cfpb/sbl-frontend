import { zodResolver } from '@hookform/resolvers/zod';
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
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate, useParams } from 'react-router-dom';
import getIsRoutingEnabled from 'utils/getIsRoutingEnabled';
import type { InstitutionDetailsApiType } from '../ViewInstitutionProfile/institutionDetails.type';
import AdditionalDetails from './AdditionalDetails';
import FinancialInstitutionDetailsForm from './FinancialInstitutionDetailsForm';
import UpdateAffiliateInformation from './UpdateAffiliateInformation';
import UpdateIdentifyingInformation from './UpdateIdentifyingInformation';

// TODO: defaultValues was causing the `value` provided to `<input>` fields to get wiped out.
//   Figure out a smart way to combine them.
// const defaultValues: UFPSchema = {
//   tin: '',
//   checkboxes: Object.fromEntries(
//     checkboxOptions.map(option => [option.id, false]),
//   ),
// };
export default function UFPForm({
  data,
}: {
  data: InstitutionDetailsApiType;
}): JSXElement {
  const [submitted, setSubmitted] = useState(false);
  const { lei } = useParams();
  const isRoutingEnabled = getIsRoutingEnabled();

  // TODO: Generate default values from `data`
  const {
    register,
    control,
    setValue,
    trigger,
    getValues,
    formState: { errors: formErrors },
  } = useForm<UFPSchema>({
    resolver: zodResolver(ufpSchema),
    // defaultValues,
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
    const passesValidation = await trigger();
    // TODO: Will be used for debugging after clicking 'Submit'
    // eslint-disable-next-line no-console
    console.log('passes validation?', passesValidation);
    // if (passesValidation) {
    const preFormattedData = getValues();
    // TODO: Will be used for debugging after clicking 'Submit'
    // eslint-disable-next-line no-console
    console.log('data to be submitted (before format):', preFormattedData);

    // POST formData
    // TODO: Will be used for debugging after clicking 'Submit'
    // eslint-disable-next-line no-console, @typescript-eslint/no-unused-vars
    // const response = await submitUpdateFinancialProfile(
    //   auth,
    //   preFormattedData,
    // )
    // }
    setSubmitted(true);
  };

  // TODO: Clear all checkboxes and inputs -- use setValue(defaultValues)
  // eslint-disable-next-line no-console
  const onClearform = (): void => console.log('onClearform clicked');

  // TODO: Will be used for debugging errors after clicking 'Submit'
  // eslint-disable-next-line no-console
  console.log('formErrors:', formErrors);

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
        <FinancialInstitutionDetailsForm {...{ data, register }} />
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
