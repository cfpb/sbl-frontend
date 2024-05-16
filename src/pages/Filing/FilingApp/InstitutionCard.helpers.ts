import { FilingStatusAsString } from 'types/filingTypes';
import type {
  ButtonAppearance,
  InstitutionDataType,
  SecondaryButtonType,
  StatusCardType,
} from './InstitutionCard.types';

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

  const secondaryFig = (): void => {
    secondaryButtonLabel = 'View filing instructions guide';
    secondaryButtonDestination = `https://www.consumerfinance.gov/data-research/small-business-lending/filing-instructions-guide/${filingPeriod}-guide/`;
  };

  const secondaryFinalRule = (paragraph: string): void => {
    secondaryButtonLabel = 'Read final rule';
    secondaryButtonDestination = `https://www.federalregister.gov/documents/2023/05/31/2023-07230/small-business-lending-under-the-equal-credit-opportunity-act-regulation-b#p-${paragraph}`;
  };

  switch (status) {
    // Note: These two statuses are Frontend only and used to:
    //    1) (TYPES_OF_INSTITUTION) route users to the Type of FI form and
    //    2) (START_A_FILING) indicate to new users that they have not previously started the Filing process for this institution
    case FilingStatusAsString.TYPES_OF_INSTITUTION:
    case FilingStatusAsString.START_A_FILING: {
      title = 'Start the filing process';
      description =
        'We will guide you through each step of the filing process, from file upload and validation checks to providing contact information for your financial institution. You will be asked to review and confirm the contents of your filing before you sign and certify.';

      mainButtonLabel = 'Start filing';
      mainButtonDestination =
        status === FilingStatusAsString.TYPES_OF_INSTITUTION
          ? // Institution does not have any associated SBL institution types
            `/institution/${lei}/type/${filingPeriod}`
          : // Institution does not yet have a Filing created for this filingPeriod
            (mainButtonDestination = `/filing/${filingPeriod}/${lei}/create`);

      secondaryFig();
      break;
    }

    // Latest submission is started, and possibly has a file uploaded, but has not been validated
    case FilingStatusAsString.SUBMISSION_STARTED: {
      title = 'Upload your lending data';
      description =
        'To get started, you will select a file to upload. Next, we will perform validation checks on your register to ensure that data entries are correct and ready to submit. Your file must be successfully uploaded and validation checks must run to continue to the next step.';

      mainButtonLabel = 'Continue filing';
      mainButtonDestination = `/filing/${filingPeriod}/${lei}/upload`;

      secondaryFig();
      break;
    }

    // Latest submission has errors that prevent further progress in the Filing process
    case FilingStatusAsString.VALIDATION_WITH_ERRORS: {
      title = 'Resolve errors in your lending data';
      description =
        'Your file was successfully uploaded and validation checks returned errors. If applicable, review and correct errors related to data type and format. Next, correct errors related to inconsistencies or mistakes in how your register information is organized or represented.';

      mainButtonLabel = 'Continue filing';
      mainButtonDestination = `/filing/${filingPeriod}/${lei}/errors`;

      secondaryFig();
      break;
    }

    // Latest submission has warnings that are not yet accepted
    case FilingStatusAsString.VALIDATION_WITH_WARNINGS: {
      title = 'Review warnings in your lending data';
      description =
        'Your file successfully passed all error validations. Next, you must correct or verify the accuracy of all register values flagged by warning validations to continue to the next step.';

      mainButtonLabel = 'Continue filing';
      mainButtonDestination = `/filing/${filingPeriod}/${lei}/warnings`;

      secondaryFig();
      break;
    }

    // Latest submission has no point of contact info populated
    case POINT_OF_CONTACT: {
      title = 'Provide point of contact';
      description =
        "Your file has passed error validations and all warnings have been resolved or verified. Next, you must provide the contact information of a person that the Bureau or other regulators may contact with questions about your financial institution's data submission.";

      mainButtonLabel = 'Continue filing';
      mainButtonDestination = `/filing/${filingPeriod}/${lei}/contact`;

      secondaryFinalRule('4309');
      break;
    }

    // Latest submission is ready to sign and submit
    case SIGN_SUBMIT: {
      title = 'Sign and submit your filing';
      description = `You have completed the steps required to prepare your submission for filing. Before you sign and submit, carefully review all the information provided. This will complete your filing obligation for the ${filingPeriod} filing period.`;

      mainButtonLabel = 'Continue filing';
      mainButtonDestination = `/filing/${filingPeriod}/${lei}/submit`;

      secondaryFinalRule('4302');
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
