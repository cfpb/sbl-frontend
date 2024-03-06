import { Button, Heading } from 'design-system-react';
import type { JSX } from 'react';

// TODO: Replace with InstitutionAPIDataSchema (or whatever the name is)
interface InstitutionDataType {
  lei?: string;
  name?: string;
  status?: string;
}

// Format the Institution name + LEI
function InstitutionName({ lei, name }: InstitutionDataType): JSX.Element {
  let content;
  if ([lei, name].every(item => !!item)) content = `${name} - ${lei}`;
  else if (lei) content = lei;
  else if (name) content = name;
  else content = '< No identifying information >';
  return <Heading type='3'>{content}</Heading>;
}

// Derive the text to be displayed for an Filing in the given `status`
function getStatusText(status: string): {
  label: string;
  message: string;
  buttonAppearance: string;
} {
  let label: string;
  let message: string;
  let buttonAppearance = 'primary';

  switch (status) {
    case '1': {
      label = 'Start data submission';
      message = 'You have not submitted any data for this filing period.';
      break;
    }
    case '2': {
      label = 'View errors';
      message =
        'Your submission has errors. Please review, correct your submission data, and upload the updated data.';
      buttonAppearance = 'warning';
      break;
    }
    case '3': {
      label = 'Sign latest submission';
      message = 'Your submission is ready to sign';
      break;
    }
    case '4': {
      label = 'Review completed submission';
      message = 'Your submission is complete!';
      buttonAppearance = 'secondary';
      break;
    }
    default: {
      label = 'Unable to fetch status';
      message = 'Status message here';
      buttonAppearance = 'error';
    }
  }

  return { label, message, buttonAppearance };
}

// Fetch and format the Institution filing status for a given filing period
function FilingStatus({
  // lei,
  // filingPeriod,
  status, // TODO: use fetched status
}: InstitutionDataType): JSX.Element {
  // TODO: Fetch live filing status via API
  // const auth = useSblAuth()
  // const {data: status, isLoading} = useFetchFilingStatus(auth, { lei, filingPeriod })

  if (status === '0') return <div>** ...Loading... **</div>;
  const { label, message, buttonAppearance } = getStatusText(status);

  return (
    <>
      <div>Filing status: {message}</div>
      <Button label={label} appearance={buttonAppearance} className='mt-4' />
    </>
  );
}

export function Institution({
  lei,
  name,
  status,
}: InstitutionDataType): JSX.Element {
  return (
    <div className='border-1 mb-8 border-solid border-slate-400 bg-slate-50 p-6'>
      <InstitutionName {...{ lei, name }} />
      <FilingStatus lei={lei} status={status} />
    </div>
  );
}

Institution.defaultProps = {
  lei: '<NO LEI>',
  name: '<NO NAME>',
  status: '<NO STATUS>',
};

export default Institution;
