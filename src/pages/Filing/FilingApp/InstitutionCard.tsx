import { Button, Heading, Icon } from 'design-system-react';
import type { JSXElement } from 'design-system-react/dist/types/jsxElement';
import type { JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import { deriveStatus } from './InstitutionCard.helpers';
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
function FilingStatus({
  lei,
  // filingPeriod,
  status = '0', // TODO: use fetched status
}: InstitutionDataType): JSX.Element {
  const navigate = useNavigate();
  // TODO: Fetch live filing status via API
  // const auth = useSblAuth()
  // const {data: status, isLoading} = useFetchFilingStatus(auth, { lei, filingPeriod })

  if (status === '0')
    return (
      <div>
        <Icon name='updating' /> Loading submission status...
      </div>
    );

  const {
    title,
    description,
    mainButtonLabel,
    mainButtonAppearance,
    mainButtonDestination,
    secondaryButtonLabel,
    secondaryButtonDestination,
  } = deriveStatus(status, lei);

  const onClick = (): void => navigate(mainButtonDestination);

  return (
    <>
      <Heading type='3'>{title}</Heading>
      <div>{description}</div>
      <Button
        label={mainButtonLabel}
        appearance={mainButtonAppearance}
        onClick={onClick}
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
  status,
}: InstitutionDataType): JSX.Element {
  return (
    <div className='mb-8 border-solid border-gray-300 p-6'>
      <InstitutionHeading {...{ lei, name }} />
      <FilingStatus lei={lei} status={status} />
    </div>
  );
}

InstitutionCard.defaultProps = {
  name: '<NO NAME>',
  status: '<NO STATUS>',
};

export default InstitutionCard;
