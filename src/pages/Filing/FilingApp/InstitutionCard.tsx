import useSblAuth from 'api/useSblAuth';
import { Alert, Button, Heading, Icon } from 'design-system-react';
import type { JSXElement } from 'design-system-react/dist/types/jsxElement';
import type { JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import useFilingStatus from 'utils/useFilingStatus';
import {
  STATUS_NO_FILING,
  STATUS_PROVIDE_INSTITUTION,
  STATUS_UPLOAD_READY,
  deriveCardContent,
} from './InstitutionCard.helpers';
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
  name,
}: {
  lei: string;
  name: string;
}): JSX.Element {
  const navigate = useNavigate();
  const auth = useSblAuth();

  const { data: filingData, isLoading, error, refetch } = useFilingStatus(lei);

  let uiStatus = '';

  if (error)
    return <Alert status='error' message='Unable to load filing status' />;

  if (isLoading)
    return (
      <div>
        <Icon isPresentational name='updating' /> Loading submission status...
      </div>
    );

  if (filingData === '') uiStatus = STATUS_NO_FILING;
  else if (filingData) uiStatus = STATUS_UPLOAD_READY;
  else uiStatus = STATUS_PROVIDE_INSTITUTION;

  const {
    title,
    description,
    mainButtonLabel,
    mainButtonAppearance,
    mainButtonDestination,
    secondaryButtonLabel,
    secondaryButtonDestination,
    onClick,
  } = deriveCardContent({ auth, status: uiStatus, lei, refetch });

  const onButtonClick = (): void =>
    onClick ? onClick() : navigate(mainButtonDestination, { state: { name } });

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

export function InstitutionCard({
  lei,
  name,
}: InstitutionDataType): JSXElement {
  if (!lei) return null;
  return (
    <div className='mb-8 border-solid border-gray-300 p-6'>
      {/* TODO: Dynamically add filing period */}
      <InstitutionHeading {...{ lei, name, filingPeriod: 2024 }} />
      <FilingStatus lei={lei} name={name} />
    </div>
  );
}

InstitutionCard.defaultProps = {
  name: '<NO NAME>',
  status: '<NO STATUS>',
};

export default InstitutionCard;
