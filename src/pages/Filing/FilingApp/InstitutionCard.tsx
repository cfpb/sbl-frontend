import { Alert, Button, Heading, Icon } from 'design-system-react';
import type { JSXElement } from 'design-system-react/dist/types/jsxElement';
import type { JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import type { FilingType, SubmissionResponse } from 'types/filingTypes';
import { useFilingAndSubmissionInfo } from 'utils/useFilingAndSubmissionInfo';
import { getFilingSteps } from './FilingSteps.helpers';
import { UI_STEPS, deriveCardContent } from './InstitutionCard.helpers';
import type {
  InstitutionDataType,
  SecondaryButtonType,
} from './InstitutionCard.types';
import InstitutionHeading from './InstitutionHeading';

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

// Fetch and format the Institution filing status for a given filing period
function FilingStatus({
  lei,
  filing,
  submission,
}: InstitutionDataType & {
  filing: FilingType;
  submission: SubmissionResponse;
}): JSX.Element {
  const navigate = useNavigate();

  const { nextStepIndex } = getFilingSteps(submission, filing);

  const status = UI_STEPS[nextStepIndex];

  const {
    title,
    description,
    mainButtonLabel,
    mainButtonAppearance,
    mainButtonDestination,
    secondaryButtonLabel,
    secondaryButtonDestination,
    onClick,
  } = deriveCardContent({ status, lei });

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
 * Fetch requisite data to determine Filing status.
 */
function InstitutionCardDataWrapper({
  lei,
  name,
  filingPeriod,
}: InstitutionDataType): JSXElement {
  const { error, filing, isLoading, submission } = useFilingAndSubmissionInfo({
    lei,
    filingPeriod,
  });

  return (
    <div className='mb-8 border-solid border-gray-300 p-6'>
      <InstitutionHeading {...{ lei, name, filingPeriod }} />
      {error ? (
        <Alert status='error' message={error.message} />
      ) : isLoading ? (
        <div>
          <Icon name='updating' /> Loading submission status...
        </div>
      ) : (
        <FilingStatus
          {...{
            lei,
            filing,
            submission,
          }}
        />
      )}
    </div>
  );
}

/**
 * Display an Institution's Filing status
 */
export function InstitutionCard({
  lei,
  ...others
}: InstitutionDataType): JSXElement {
  if (!lei) return null;
  return <InstitutionCardDataWrapper {...{ lei, ...others }} />;
}

InstitutionCard.defaultProps = {
  name: '<NO NAME>',
  status: '<NO STATUS>',
};

export default InstitutionCard;
