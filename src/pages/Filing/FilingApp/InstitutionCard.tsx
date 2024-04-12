import { Button, Heading } from 'design-system-react';
import type { JSXElement } from 'design-system-react/dist/types/jsxElement';
import createMockSubmission from 'mocks/data/createMockSubmission';
import type { JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import type { FilingPeriodType, FilingType, SubmissionType } from 'utils/types';
import { FilingStatusString } from 'utils/types';
import { createMockFiling } from './FilingStepWrapper.helpers';
import { deriveCardContent } from './InstitutionCard.helpers';
import type {
  InstitutionDataType,
  SecondaryButtonType,
} from './InstitutionCard.types';

interface FilingPeriodField {
  filingPeriod: FilingPeriodType;
}

// Format the Institution name + LEI
function InstitutionHeading({
  lei,
  name,
  filingPeriod,
}: FilingPeriodField & InstitutionDataType): JSX.Element {
  const content = [name, lei, filingPeriod].filter(Boolean).join(' | ');
  return <Heading type='4'>{content}</Heading>;
}

// Conditionally display a secondary action button
function SecondaryButton({
  secondaryButtonLabel,
  secondaryButtonDestination,
}: SecondaryButtonType): JSXElement {
  const navigate = useNavigate();

  if (!secondaryButtonLabel || !secondaryButtonDestination) return null;

  const onSecondaryClick = (): void => navigate(secondaryButtonDestination);

  return (
    <span className='ml-5 inline-block'>
      <Button
        asLink
        label={secondaryButtonLabel}
        onClick={onSecondaryClick}
        className='ml-2'
      />
    </span>
  );
}

/*
 * Derive the Institution's filing status.
 * Provide a link to the next uncompleted step.
 */
function CurrentFilingStatus({
  filing,
  submission,
}: {
  filing: FilingType;
  submission: SubmissionType;
}): JSX.Element {
  const navigate = useNavigate();

  const {
    title,
    description,
    mainButtonLabel,
    mainButtonAppearance,
    mainButtonDestination,
    secondaryButtonLabel,
    secondaryButtonDestination,
    onClick,
  } = deriveCardContent({
    filing,
    submission,
  });

  const onButtonClick = (): void =>
    onClick ? onClick() : navigate(mainButtonDestination);

  return (
    <>
      <Heading type='3'>{title}</Heading>
      <div>{description}</div>
      <Button
        label={mainButtonLabel}
        appearance={mainButtonAppearance}
        onClick={onButtonClick}
        className='mt-4'
      />
      <SecondaryButton
        {...{ secondaryButtonDestination, secondaryButtonLabel }}
      />
    </>
  );
}

/**
 * Fetch requisite data to determine Filing status
 */
function InstitutionCardDataWrapper({
  lei,
  name,
  filingPeriod,
}: FilingPeriodField & InstitutionDataType): JSXElement {
  // const { error, filing, isLoading, submission } = useFilingAndSubmissionInfo({
  //   lei,
  //   filingPeriod,
  // });

  // if (error)
  //   return <Alert status='error' message='Unable to load submission status' />;

  // if (isLoading)
  //   return (
  //     <div>
  //       <Icon name='updating' /> Loading submission status...
  //     </div>
  //   );

  const filing = createMockFiling({
    contact_info: null,
    confirmation_id: '12',
  });
  const submission = createMockSubmission({
    state: FilingStatusString.SUBMISSION_ACCEPTED,
    accepter: null,
  });
  return (
    <div className='mb-8 border-solid border-gray-300 p-6'>
      <InstitutionHeading {...{ lei, name, filingPeriod }} />
      <CurrentFilingStatus
        {...{
          filing,
          submission,
        }}
      />
    </div>
  );
}

/**
 * Display an Institution's Filing status
 */
export function InstitutionCard({
  lei,
  ...others
}: FilingPeriodField & InstitutionDataType): JSXElement {
  if (!lei) return null;
  return <InstitutionCardDataWrapper {...{ lei, ...others }} />;
}

export default InstitutionCard;
