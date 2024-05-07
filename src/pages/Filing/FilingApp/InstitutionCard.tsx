import { Alert, Button, Heading, Icon } from 'design-system-react';
import type { JSXElement } from 'design-system-react/dist/types/jsxElement';
import type { JSX } from 'react';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import type { FilingType, SubmissionResponse } from 'types/filingTypes';
import type { InstitutionDetailsApiType } from 'types/formTypes';
import { useFilingAndSubmissionInfo } from 'utils/useFilingAndSubmissionInfo';
import useInstitutionDetails from 'utils/useInstitutionDetails';
import { getFilingSteps } from './FilingSteps.helpers';
import {
  START_A_FILING,
  TYPES_OF_INSTITUTION,
  UI_STEPS,
  deriveCardContent,
} from './InstitutionCard.helpers';
import type {
  InstitutionDataType,
  SecondaryButtonType,
} from './InstitutionCard.types';
import InstitutionHeading from './InstitutionHeading';

const institutionHasTypes = (
  institution: InstitutionDetailsApiType,
): boolean => {
  return Number(institution.sbl_institution_types.length) > 0;
};

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
function NextStep({
  filing,
  submission,
  institution,
}: {
  filing: FilingType;
  submission: SubmissionResponse;
  institution: InstitutionDetailsApiType;
}): JSX.Element {
  const navigate = useNavigate();
  const { lei } = institution;
  let status;

  if (!institutionHasTypes(institution)) status = TYPES_OF_INSTITUTION;
  else if (filing) {
    const { nextStepIndex } = getFilingSteps(submission, filing);

    status = UI_STEPS[nextStepIndex];
  } else {
    status = START_A_FILING;
  }

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
  const {
    error: submissionError,
    filing,
    isLoading: isSubmissionLoading,
    submission,
  } = useFilingAndSubmissionInfo({
    lei,
    filingPeriod,
  });

  const {
    isLoading: isInstitutionLoading,
    data: institution,
    error: institutionError,
  } = useInstitutionDetails(lei);

  const InstitutionContentWrapper = useMemo(
    () =>
      function ({ children }): JSX.Element {
        return (
          <div className='mb-8 border-solid border-gray-300 p-6'>
            <InstitutionHeading {...{ lei, name, filingPeriod }} />
            {children}
          </div>
        );
      },
    [],
  );

  // Ignore "not found" errors, we will create Filings on demand
  const error =
    institutionError ||
    (submissionError?.response?.status === 500 ? null : submissionError);

  const isLoading = isInstitutionLoading || isSubmissionLoading;

  if (error)
    return (
      <InstitutionContentWrapper>
        <Alert status='error' message={error.message} />
      </InstitutionContentWrapper>
    );

  if (isLoading)
    return (
      <InstitutionContentWrapper>
        <Icon name='updating' /> Loading filing data...
      </InstitutionContentWrapper>
    );

  return (
    <InstitutionContentWrapper>
      <NextStep
        {...{
          filing,
          submission,
          institution,
        }}
      />
    </InstitutionContentWrapper>
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
