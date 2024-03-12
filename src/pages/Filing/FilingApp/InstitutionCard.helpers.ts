import axios from 'axios';
import type { SblAuthConsumer } from 'utils/types';
import type {
  ButtonAppearance,
  InstitutionDataType,
  SecondaryButtonType,
  StatusCardType,
} from './InstitutionCard.types';

interface Refetch {
  // TODO: Replace InstitutionDataType with actual Filing status schema
  refetch: () => Promise<InstitutionDataType | string>;
}
type DeriveStatusProperties = InstitutionDataType & Refetch & SblAuthConsumer;
type StatusProperties = SecondaryButtonType & StatusCardType;

// Derive the content to be displayed for a Filing in the given `status`
export function deriveCardContent({
  status,
  lei,
  refetch,
  auth,
}: DeriveStatusProperties): StatusProperties {
  let title = '';
  let description = '';

  let mainButtonLabel = '';
  let mainButtonDestination = '/landing';
  let mainButtonAppearance: ButtonAppearance = 'primary';

  let secondaryButtonLabel;
  let secondaryButtonDestination;
  let onClick;

  switch (status) {
    case 'no-filing': {
      title = 'You have not started the Filing process';
      description = '';

      mainButtonLabel = 'Start a Filing';

      onClick = async (): Promise<void> => {
        // Start a Filing
        await axios.post(`/v1/filing/institutions/${lei}/filings/2024`, null, {
          headers: {
            Authorization: `Bearer ${auth.user?.access_token}`,
          },
        });
        await refetch();
      };
      break;
    }
    case '1': {
      title = 'Provide your type of financial institution';
      description =
        'As you prepare to begin the filing process take a moment to review and update your financial institution profile. Once completed, you can proceed to the filing process.';

      mainButtonLabel = 'Provide your type of financial institution';
      mainButtonDestination = `/filing`;

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
    onClick,
  };
}

export default deriveCardContent;
