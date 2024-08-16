import AlertApiUnavailable from 'components/AlertApiUnavailable';
import { Link } from 'components/Link';
import { Button, Heading, Icon, Paragraph } from 'design-system-react';
import type { JSXElement } from 'design-system-react/dist/types/jsxElement';
import type { JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import type { FilingType, SubmissionResponse } from 'types/filingTypes';
import { FilingStatusAsString } from 'types/filingTypes';
import type { InstitutionDetailsApiType } from 'types/formTypes';
import { useFilingAndSubmissionInfo } from 'utils/useFilingAndSubmissionInfo';
import useInstitutionDetails from 'utils/useInstitutionDetails';
import { getFilingSteps } from './FilingSteps.helpers';
import { UI_STEPS, deriveCardContent } from './InstitutionCard.helpers';
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
  if (!secondaryButtonLabel || !secondaryButtonDestination) return null;

  return (
    <p className='ml-[0.9375rem] inline-block font-medium'>
      <Link href={secondaryButtonDestination}>{secondaryButtonLabel}</Link>
    </p>
  );
}

// Fetch and format the Institution filing status for a given filing period
function NextStep({
  filing,
  submission,
  institution,
}: {
  // eslint-disable-next-line react/require-default-props
  filing?: FilingType;
  submission: SubmissionResponse;
  institution: InstitutionDetailsApiType;
}): JSX.Element {
  const navigate = useNavigate();
  const { lei } = institution;
  let status;

  if (!institutionHasTypes(institution))
    status = FilingStatusAsString.TYPES_OF_INSTITUTION;
  else if (filing) {
    const { nextStepIndex } = getFilingSteps(submission, filing);
    status = UI_STEPS[nextStepIndex];
  } else {
    status = FilingStatusAsString.START_A_FILING;
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
  } = deriveCardContent({ status, lei, filingPeriod: '2024' }); // Post-MVP: Get filingPeriod value from a selector

  const onButtonClick = (): void =>
    onClick ? onClick() : navigate(mainButtonDestination);

  return (
    <>
      <Heading type='3' className='u-mt15'>
        {title}
      </Heading>
      <Paragraph>{description}</Paragraph>
      <Button
        label={mainButtonLabel}
        appearance={mainButtonAppearance}
        onClick={onButtonClick}
      />
      <SecondaryButton
        {...{ secondaryButtonDestination, secondaryButtonLabel }}
      />
    </>
  );
}

/**
 * Helper component to share styling and structure
 */
function InstitutionContentWrapper({
  children,
  ...others
}: {
  children: JSX.Element;
  lei: InstitutionDetailsApiType['lei'];
  name: InstitutionDetailsApiType['name'];
  filingPeriod: FilingType['filing_period'];
}): JSX.Element {
  return (
    <div className='institution-content-wrapper u-mb45 border-solid border-gray-300 py-[1.875rem] pl-[1.875rem] pr-[4.375rem]'>
      <InstitutionHeading {...others} />
      {children}
    </div>
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
    error: filingDataError,
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
    // @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
  } = useInstitutionDetails(lei);

  const sharedContentProperties = { lei, name, filingPeriod };

  const error = institutionError || filingDataError;

  const isLoading = isInstitutionLoading || isSubmissionLoading;

  if (error)
    return (
      // @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
      <InstitutionContentWrapper {...sharedContentProperties}>
        {/* eslint-disable @typescript-eslint/no-unsafe-assignment */}
        <AlertApiUnavailable />
        {/* eslint-enable @typescript-eslint/no-unsafe-assignment */}
      </InstitutionContentWrapper>
    );

  if (isLoading)
    return (
      // @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
      <InstitutionContentWrapper {...sharedContentProperties}>
        <Icon name='updating' /> Loading
      </InstitutionContentWrapper>
    );

  return (
    // @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
    <InstitutionContentWrapper {...sharedContentProperties}>
      {/* @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717 */}
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
