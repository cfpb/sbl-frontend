import type { FilingType, SubmissionType } from 'utils/types';
import { FilingStatusString } from 'utils/types';
import type {
  ButtonAppearance,
  SecondaryButtonType,
  StatusCardType,
} from './InstitutionCard.types';

export const STATUS_NO_FILING = 'no-filing';
export const STATUS_UPLOAD_READY = 'upload-ready';
export const STATUS_PROVIDE_INSTITUTION = 'provide-institution';

interface DeriveStatusProperties {
  filing?: FilingType;
  submission?: SubmissionType;
}

type StatusProperties = SecondaryButtonType & StatusCardType;

// Derive the content to be displayed for a Filing in the given `status`
export function deriveCardContent({
  filing,
  submission,
}: DeriveStatusProperties): StatusProperties {
  let title = '';
  let description = '';

  let mainButtonLabel = '';
  let mainButtonDestination = '/landing';
  let mainButtonAppearance: ButtonAppearance = 'primary';

  let secondaryButtonLabel;
  let secondaryButtonDestination;
  let onClick;

  const lei = filing?.lei;

  console.log(submission?.state);

  switch (submission?.state) {
    case FilingStatusString.SUBMISSION_STARTED: {
      title = 'Upload your lending data';
      description =
        'The filing period is open and available to accept small business lending data. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.';

      mainButtonLabel = 'Upload file';
      mainButtonDestination = `/filing/upload`;

      secondaryButtonLabel = 'View your financial institution profile';
      secondaryButtonDestination = `/institution/${lei}`;
      break;
    }
    case FilingStatusString.SUBMISSION_UPLOADED:
    case FilingStatusString.VALIDATION_IN_PROGRESS: {
      title = 'Submission is being validated';
      description =
        'Your submission has been uploaded and is pending validation. Reload this page to check if this step has been completed.';

      mainButtonLabel = 'Reload page';
      mainButtonDestination = `/reload`;

      secondaryButtonLabel = 'View your financial institution profile';
      secondaryButtonDestination = `/institution/${lei}`;
      break;
    }
    case FilingStatusString.VALIDATION_WITH_ERRORS: {
      title = 'Review errors in your lending data';
      description =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.';

      mainButtonLabel = 'View errors';
      mainButtonDestination = `/filing/errors`;

      secondaryButtonLabel = 'View your financial institution profile';
      secondaryButtonDestination = `/institution/${lei}`;
      break;
    }
    case FilingStatusString.VALIDATION_WITH_WARNINGS: {
      title = 'Review warnings about your lending data';
      description =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.';

      mainButtonLabel = 'View warnings';
      mainButtonDestination = `/filing/warnings`;

      secondaryButtonLabel = 'View your financial institution profile';
      secondaryButtonDestination = `/institution/${lei}`;
      break;
    }
    case FilingStatusString.VALIDATION_SUCCESSFUL: {
      title = 'Sign & submit your submission';
      description =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.';

      mainButtonLabel = 'Sign submission';
      mainButtonDestination = `/filing/submit`;

      secondaryButtonLabel = 'View your financial institution profile';
      secondaryButtonDestination = `/institution/${lei}`;
      break;
    }
    case FilingStatusString.SUBMISSION_ACCEPTED: {
      title = 'Your submission is complete';
      description =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.';

      mainButtonLabel = 'View summary';
      mainButtonDestination = `/filing/done`;

      secondaryButtonLabel = 'View your financial institution profile';
      secondaryButtonDestination = `/institution/${lei}`;
      break;
    }
    case STATUS_PROVIDE_INSTITUTION: {
      title = 'Provide your type of financial institution';
      description =
        'As you prepare to begin the filing process take a moment to review and update your financial institution profile. Once completed, you can proceed to the filing process.';

      mainButtonLabel = 'Provide your type of financial institution';
      mainButtonDestination = `/filing`;

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
