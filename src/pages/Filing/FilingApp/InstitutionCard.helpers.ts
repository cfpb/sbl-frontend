import type {
  ButtonAppearance,
  SecondaryButtonType,
  StatusCardType,
} from './InstitutionCard.types';

// Derive the content to be displayed for a Filing in the given `status`
export function deriveStatus(
  status: string,
  lei: string,
): SecondaryButtonType & StatusCardType {
  let title = '';
  let description = '';

  let mainButtonLabel = '';
  let mainButtonDestination = '/landing';
  let mainButtonAppearance: ButtonAppearance = 'primary';

  let secondaryButtonLabel;
  let secondaryButtonDestination;

  switch (status) {
    case '1': {
      title = 'Provide your type of financial institution';
      description =
        'As you prepare to begin the filing process take a moment to review and update your financial institution profile. Once completed, you can proceed to the filing process. ';

      mainButtonLabel = 'Provide your type of financial institution';
      mainButtonDestination = `/landing`;

      secondaryButtonLabel = 'View your financial institution profile';
      secondaryButtonDestination = `/institution/${lei}`;
      break;
    }
    case '2': {
      title = 'Upload your lending data';
      description =
        'The filing period is open and available to accept small business lending data. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.';

      mainButtonLabel = 'Upload file';
      mainButtonDestination = `/filing/2024/${lei}/upload`;

      secondaryButtonLabel = 'View your financial institution profile';
      secondaryButtonDestination = `/institution/${lei}`;
      break;
    }
    default: {
      description = 'Status description here';
      mainButtonLabel = 'Button label here';
      mainButtonAppearance = 'warning';
    }
  }

  return {
    title,
    description,
    mainButtonLabel,
    mainButtonDestination,
    mainButtonAppearance,
    secondaryButtonLabel,
    secondaryButtonDestination,
  };
}

export default deriveStatus;
