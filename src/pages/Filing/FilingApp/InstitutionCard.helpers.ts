import { FilingStatusAsString } from 'types/filingTypes';
import type {
  ButtonAppearance,
  InstitutionDataType,
  SecondaryButtonType,
  StatusCardType,
} from './InstitutionCard.types';

const FILING_DETAILS = 'FILING_DETAILS';
const SIGN_SUBMIT = 'SIGN_SUBMIT';

export const UI_STEPS = [
  FilingStatusAsString.SUBMISSION_STARTED,
  FilingStatusAsString.VALIDATION_WITH_ERRORS,
  FilingStatusAsString.VALIDATION_WITH_WARNINGS,
  FILING_DETAILS,
  SIGN_SUBMIT,
];

export const InstitutionCardTitle = {
  start: 'Start the filing process',
  upload: 'Upload your lending data',
  errors: 'Resolve errors in your lending data',
  warnings: 'Review warnings in your lending data',
  provideDetails: 'Provide filing details',
  signSubmit: 'Sign and submit your filing',
};

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

  const secondaryFilingProcess = (): void => {
    secondaryButtonLabel = 'Read about the filing process';
    secondaryButtonDestination = `https://www.consumerfinance.gov/data-research/small-business-lending/filing-instructions-guide/${filingPeriod}-guide/#2`;
  };

  const secondaryDataValidations = (): void => {
    secondaryButtonLabel = 'Read about data validations';
    secondaryButtonDestination = `https://www.consumerfinance.gov/data-research/small-business-lending/filing-instructions-guide/${filingPeriod}-guide/#4`;
  };

  switch (status) {
    // Note: These two statuses are Frontend only and used to:
    //    1) (TYPES_OF_INSTITUTION) route users to the Type of FI form and
    //    2) (START_A_FILING) indicate to new users that they have not previously started the Filing process for this institution
    case FilingStatusAsString.TYPES_OF_INSTITUTION:
    case FilingStatusAsString.START_A_FILING: {
      title = InstitutionCardTitle.start;
      description =
        'You will be asked to select all applicable types of financial institutions if you have not provided this previously. Otherwise, you will be asked to select a file to upload.';

      mainButtonLabel = 'Start filing';
      mainButtonDestination =
        status === FilingStatusAsString.TYPES_OF_INSTITUTION
          ? // Institution does not have any associated SBL institution types
            `/institution/${lei}/type/${filingPeriod}`
          : // Institution does not yet have a Filing created for this filingPeriod
            (mainButtonDestination = `/filing/${filingPeriod}/${lei}/create`);

      secondaryFilingProcess();
      break;
    }

    // Latest submission is started, and possibly has a file uploaded, but has not been validated
    case FilingStatusAsString.SUBMISSION_STARTED: {
      title = InstitutionCardTitle.upload;
      description =
        'You will be asked to select a file to upload. We will perform validation checks on your register to ensure that data entries do not contain errors and are ready to submit.';

      mainButtonLabel = 'Continue filing';
      mainButtonDestination = `/filing/${filingPeriod}/${lei}/upload`;

      secondaryFilingProcess();
      break;
    }

    // Latest submission has errors that prevent further progress in the Filing process
    case FilingStatusAsString.VALIDATION_WITH_ERRORS: {
      title = InstitutionCardTitle.errors;
      description =
        'Your file was successfully uploaded but validation checks returned errors. If applicable, make corrections to your register and upload a new file.';

      mainButtonLabel = 'Continue filing';
      mainButtonDestination = `/filing/${filingPeriod}/${lei}/errors`;

      secondaryDataValidations();
      break;
    }

    // Latest submission has warnings that are not yet accepted
    case FilingStatusAsString.VALIDATION_WITH_WARNINGS: {
      title = InstitutionCardTitle.warnings;
      description =
        'Your file successfully passed all error validation checks. If applicable, correct or verify the accuracy of register values flagged by warning validations.';

      mainButtonLabel = 'Continue filing';
      mainButtonDestination = `/filing/${filingPeriod}/${lei}/warnings`;

      secondaryDataValidations();
      break;
    }

    // Latest submission has no point of contact info populated
    case FILING_DETAILS: {
      title = InstitutionCardTitle.provideDetails;
      description =
        'You have completed the validation steps. Next, provide the contact information of a person that the Bureau or other regulators may contact with questions about your filing.';

      mainButtonLabel = 'Continue filing';
      mainButtonDestination = `/filing/${filingPeriod}/${lei}/details`;

      break;
    }

    // Latest submission is ready to sign and submit
    case SIGN_SUBMIT: {
      title = InstitutionCardTitle.signSubmit;
      description = `You have completed the steps required to prepare your filing. Before you submit your filing, review and certify the accuracy and completeness of the data reported.`;

      mainButtonLabel = 'Continue filing';
      mainButtonDestination = `/filing/${filingPeriod}/${lei}/submit`;

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
