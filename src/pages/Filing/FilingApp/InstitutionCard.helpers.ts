import { FilingStatusAsString } from 'types/filingTypes';
import type {
  ButtonAppearance,
  InstitutionDataType,
  SecondaryButtonType,
  StatusCardType,
} from './InstitutionCard.types';

export const STATUS_PROVIDE_INSTITUTION = 'provide-institution';
const POINT_OF_CONTACT = 'POINT_OF_CONTACT';
const SIGN_SUBMIT = 'SIGN_SUBMIT';

export const UI_STEPS = [
  FilingStatusAsString.SUBMISSION_STARTED,
  FilingStatusAsString.VALIDATION_WITH_ERRORS,
  FilingStatusAsString.VALIDATION_WITH_WARNINGS,
  POINT_OF_CONTACT,
  SIGN_SUBMIT,
];

type StatusProperties = SecondaryButtonType & StatusCardType;

// Derive the content to be displayed for a Filing in the given `status`
export function deriveCardContent({
  status,
  lei,
  filingPeriod = '2024',
}: InstitutionDataType): StatusProperties {
  let title = '';
  let description = '';

  let mainButtonLabel = '';
  let mainButtonDestination = '/landing';
  let mainButtonAppearance: ButtonAppearance = 'primary';

  let secondaryButtonLabel;
  let secondaryButtonDestination;
  let onClick;

  // TODO: Account for all states found at: https://github.com/cfpb/sbl-filing-api/blob/main/src/sbl_filing_api/entities/models/model_enums.py
  switch (status) {
    case FilingStatusAsString.TYPES_OF_INSTITUTION: {
      title = 'Start the filing process (institution)'; // TODO: Remove "(institution)" bit
      description =
        'Our system will guide you through each step of the filing process from file upload and error and validation checks to providing identifying and contact information for your financial institution. You will be asked to verify the contents of your filing before you sign and certify';

      mainButtonLabel = 'Start filing';
      mainButtonDestination = `/institution/${lei}/type/${filingPeriod}`;
      break;
    }
    case FilingStatusAsString.START_A_FILING: {
      title = 'Start the filing process (filing)'; // TODO: Remove "(filing)" bit
      description =
        'Our system will guide you through each step of the filing process from file upload and error and validation checks to providing identifying and contact information for your financial institution. You will be asked to verify the contents of your filing before you sign and certify';

      mainButtonLabel = 'Start filing';
      mainButtonDestination = `/filing/${filingPeriod}/${lei}/create`;
      break;
    }
    case FilingStatusAsString.VALIDATION_WITH_WARNINGS: {
      title = 'Resolve warnings in your lending data';
      description =
        'If you need to upload a new small business lending file, the previously completed filing will not be overridden until all edits have been cleared and verified, and the new file has been submitted.';

      mainButtonLabel = 'Resolve warnings';
      mainButtonDestination = `/filing/${filingPeriod}/${lei}/warnings`;
      break;
    }
    case FilingStatusAsString.VALIDATION_WITH_ERRORS: {
      title = 'Review errors in your lending data';
      description =
        'If you need to upload a new small business lending file, the previously completed filing will not be overridden until all edits have been cleared and verified, and the new file has been submitted.';

      mainButtonLabel = 'Review errors';
      mainButtonDestination = `/filing/${filingPeriod}/${lei}/errors`;
      break;
    }
    case POINT_OF_CONTACT: {
      title = 'Provide a point of contact for your filing';
      description =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.';

      mainButtonLabel = 'Provide point of contact';
      mainButtonDestination = `/filing/${filingPeriod}/${lei}/contact`;
      break;
    }
    case SIGN_SUBMIT: {
      title = 'Sign and submit your filing';
      description =
        'If you need to upload a new small business lending file, the previously completed filing will not be overridden until all edits have been cleared and verified, and the new file has been submitted.';

      mainButtonLabel = 'Sign and submit';
      mainButtonDestination = `/filing/${filingPeriod}/${lei}/submit`;
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
    case FilingStatusAsString.SUBMISSION_STARTED:
    case FilingStatusAsString.SUBMISSION_UPLOADED: {
      title = 'Upload your lending data';
      description =
        'The filing period is open and available to accept small business lending data. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.';

      mainButtonLabel = 'Upload file';
      mainButtonDestination = `/filing/${filingPeriod}/${lei}/upload`;

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
