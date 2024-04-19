import type { StepStatusEnum, StepType } from 'components/StepIndicator';
import { STEP_COMPLETE, STEP_INCOMPLETE } from 'components/StepIndicator';
import type { FilingType, SubmissionResponse } from 'types/filingTypes';
import { FilingStatusAsNumber } from 'types/filingTypes';
import { One } from 'utils/constants';

// Create a mock Filing object
export const createMockFiling = (changes?: Partial<FilingType>): FilingType => {
  const base = {
    id: One,
    filing_period: '2024',
    lei: '123456789TESTBANK123',
    institution_snapshot_id: 'v1',
    contact_info: null,
    confirmation_id: null,
    status: FilingStatusAsNumber.SUBMISSION_STARTED as FilingStatusAsNumber,
    tasks: [],
  };

  if (changes)
    for (const change of Object.keys(changes)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      base[change] = changes[change];
    }

  return base;
};

// Does the current browser URL correspond to this Step?
const isStepCurrent = (stepPath: string): boolean => {
  const { pathname } = window.location;
  const matcher = new RegExp(stepPath);
  if (matcher.test(pathname)) return true;
  return false;
};

const getUploadStatus = (
  currentSubmission: SubmissionResponse,
): StepStatusEnum => {
  if (
    FilingStatusAsNumber[
      currentSubmission.state as keyof typeof FilingStatusAsNumber
    ] > FilingStatusAsNumber.SUBMISSION_STARTED
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
    ] >= FilingStatusAsNumber.VALIDATION_WITH_WARNINGS
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
    ] >= FilingStatusAsNumber.VALIDATION_WITH_WARNINGS
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
    ] >= FilingStatusAsNumber.SUBMISSION_ACCEPTED
  )
    return STEP_COMPLETE;
  return STEP_INCOMPLETE;
};

export const getFilingSteps = (
  currentSubmission: SubmissionResponse,
  currentFiling: FilingType,
): StepType[] => {
  const steps: StepType[] = [
    {
      status: getUploadStatus(currentSubmission),
      label: 'Upload file',
      isCurrent: isStepCurrent('/upload'),
    },
    {
      status: getErrorsStatus(currentSubmission),
      label: 'Review errors',
      isCurrent: isStepCurrent('/errors'),
    },
    {
      status: getWarningsStatus(currentSubmission),
      label: 'Resolve warnings',
      isCurrent: isStepCurrent('/warnings'),
    },
    {
      status: getContactStatus(currentSubmission, currentFiling),
      label: 'Provide point of contact',
      isCurrent: isStepCurrent('/contact'),
    },
    {
      status: getSubmissionStatus(currentSubmission),
      label: 'Sign and submit',
      isCurrent: isStepCurrent('/submit'),
    },
  ];

  return steps;
};
