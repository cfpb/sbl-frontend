import useSblAuth from 'api/useSblAuth';
import axios from 'axios';
import { Button, Heading, Icon } from 'design-system-react';
import type { JSXElement } from 'design-system-react/dist/types/jsxElement';
import type { JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import { Error500 } from 'utils/constants';
import useFilingStatus from 'utils/useFilingStatus';
import { deriveCardContent } from './InstitutionCard.helpers';
import type {
  InstitutionDataType,
  SecondaryButtonType,
} from './InstitutionCard.types';

// Format the Institution name + LEI
function InstitutionHeading({ lei, name }: InstitutionDataType): JSX.Element {
  const content = [name, lei, '2024'].filter(Boolean).join(' | ');
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

// Fetch and format the Institution filing status for a given filing period
function FilingStatus({ lei }: InstitutionDataType): JSX.Element {
  const navigate = useNavigate();
  const auth = useSblAuth();

  const {
    data: submissionData,
    isLoading,
    error,
    refetch,
  } = useFilingStatus({ lei });

  let status = '';

  if (isLoading)
    return (
      <div>
        <Icon name='updating' /> Loading submission status...
      </div>
    );

  if (axios.isAxiosError(error) && error.response?.status === Error500)
    status = 'no-filing';
  else if (submissionData === '') status = '2'; // Ready to upload
  else status = '1'; // Provide institution type

  const {
    title,
    description,
    mainButtonLabel,
    mainButtonAppearance,
    mainButtonDestination,
    secondaryButtonLabel,
    secondaryButtonDestination,
    onClick,
  } = deriveCardContent({ auth, status, lei, refetch });

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

export function InstitutionCard({
  lei,
  name,
}: InstitutionDataType): JSXElement {
  if (!lei) return null;
  return (
    <div className='mb-8 border-solid border-gray-300 p-6'>
      <InstitutionHeading {...{ lei, name }} />
      <FilingStatus lei={lei} />
    </div>
  );
}

InstitutionCard.defaultProps = {
  name: '<NO NAME>',
  status: '<NO STATUS>',
};

export default InstitutionCard;
