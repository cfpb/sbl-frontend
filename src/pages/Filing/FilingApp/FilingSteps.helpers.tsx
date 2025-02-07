import type { StepStatusEnum, StepType } from 'components/StepIndicator';
import { STEP_COMPLETE, STEP_INCOMPLETE } from 'components/StepIndicator';
import type { FilingType, SubmissionResponse } from 'types/filingTypes';
import { FilingStatusAsNumber } from 'types/filingTypes';

// Does the current browser URL correspond to this Step?
const isStepCurrent = (stepPath: string): boolean => {
  const { pathname } = window.location;
  return pathname.includes(stepPath);
};

const getUploadStatus = (
  currentSubmission: SubmissionResponse,
): StepStatusEnum => {
  if (
    FilingStatusAsNumber[
      currentSubmission.state as keyof typeof FilingStatusAsNumber
    ] > FilingStatusAsNumber.VALIDATION_IN_PROGRESS
  )
    return STEP_COMPLETE;
  return STEP_INCOMPLETE;
};

const getErrorsStatus = (
  currentSubmission: SubmissionResponse,
): StepStatusEnum => {
  if (
    FilingStatusAsNumber[
      currentSubmission.state as keyof typeof FilingStatusAsNumber
    ] > FilingStatusAsNumber.VALIDATION_WITH_ERRORS
  )
    return STEP_COMPLETE;
  return STEP_INCOMPLETE;
};

const getWarningsStatus = (
  currentSubmission: SubmissionResponse,
): StepStatusEnum => {
  if (
    FilingStatusAsNumber[
      currentSubmission.state as keyof typeof FilingStatusAsNumber
    ] > FilingStatusAsNumber.VALIDATION_WITH_WARNINGS
  )
    return STEP_COMPLETE;
  return STEP_INCOMPLETE;
};

const getContactStatus = (
  currentSubmission: SubmissionResponse,
  currentFiling: FilingType,
): StepStatusEnum => {
  if (
    currentFiling.contact_info &&
    FilingStatusAsNumber[
      currentSubmission.state as keyof typeof FilingStatusAsNumber
    ] > FilingStatusAsNumber.VALIDATION_WITH_WARNINGS
  )
    return STEP_COMPLETE;
  return STEP_INCOMPLETE;
};

const getSubmissionStatus = (
  currentSubmission: SubmissionResponse,
): StepStatusEnum => {
  if (
    FilingStatusAsNumber[
      currentSubmission.state as keyof typeof FilingStatusAsNumber
    ] > FilingStatusAsNumber.SUBMISSION_ACCEPTED
  )
    return STEP_COMPLETE;
  return STEP_INCOMPLETE;
};

export const getFilingSteps = (
  currentSubmission: SubmissionResponse,
  currentFiling: FilingType,
): { filingSteps: StepType[]; nextStepIndex: number } => {
  let filingSteps: StepType[] = [
    {
      status: getUploadStatus(currentSubmission),
      label: 'Upload file',
      isCurrent: isStepCurrent('/upload'),
    },
    {
      status: getErrorsStatus(currentSubmission),
      label: 'Resolve errors',
      isCurrent: isStepCurrent('/errors'),
    },
    {
      status: getWarningsStatus(currentSubmission),
      label: 'Review warnings',
      isCurrent: isStepCurrent('/warnings'),
    },
    {
      status: getContactStatus(currentSubmission, currentFiling),
      label: 'Provide filing details',
      isCurrent: isStepCurrent('/details'),
    },
    {
      status: getSubmissionStatus(currentSubmission),
      label: 'Sign and submit',
      isCurrent: isStepCurrent('/submit'),
    },
  ];

  // Determine last INCOMPLETE step
  //  Used on the Filing Overview page to route users to the "next step"
  let nextStepIndex = 0;
  for (const [index, step] of filingSteps.entries()) {
    if (step.status === STEP_INCOMPLETE) {
      nextStepIndex = index;
      break;
    }
  }

  // Determine CURRENT step index
  let currentIndex = 0;
  for (const [index, step] of filingSteps.entries()) {
    if (step.isCurrent) {
      currentIndex = index;
      break;
    }
  }

  const onFilingCompletePage = isStepCurrent('/done');

  // Only display a step as COMPLETE if:
  //   1. It's complete and
  //   2. the user is viewing a subsequent step
  // OR
  //   1. User is on the `Filing complete` page
  filingSteps = filingSteps.map((step, index) => {
    if (onFilingCompletePage) return { ...step, status: STEP_COMPLETE };
    if (index > currentIndex) return { ...step, status: STEP_INCOMPLETE };
    return step;
  });

  return { filingSteps, nextStepIndex };
};

export default getFilingSteps;
