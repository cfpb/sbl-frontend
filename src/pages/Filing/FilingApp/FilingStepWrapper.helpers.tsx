import type { StepStatusEnum, StepType } from 'components/StepIndicator';
import { STEP_COMPLETE, STEP_INCOMPLETE } from 'components/StepIndicator';
import type { FilingType } from 'types/filingTypes';
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
  if (pathname === stepPath) return true;
  return false;
};

const getUploadStatus = (currentFiling: FilingType): StepStatusEnum => {
  if (currentFiling.status > FilingStatusAsNumber.SUBMISSION_STARTED)
    return STEP_COMPLETE;
  return STEP_INCOMPLETE;
};

const getErrorsStatus = (currentFiling: FilingType): StepStatusEnum => {
  if (currentFiling.status > FilingStatusAsNumber.VALIDATION_WITH_ERRORS)
    return STEP_COMPLETE;
  return STEP_INCOMPLETE;
};

const getWarningsStatus = (currentFiling: FilingType): StepStatusEnum => {
  if (currentFiling.status >= FilingStatusAsNumber.VALIDATION_WITH_WARNINGS)
    return STEP_COMPLETE;
  return STEP_INCOMPLETE;
};

const getContactStatus = (currentFiling: FilingType): StepStatusEnum => {
  if (
    currentFiling.contact_info &&
    currentFiling.status >= FilingStatusAsNumber.VALIDATION_WITH_WARNINGS
  )
    return STEP_COMPLETE;
  return STEP_INCOMPLETE;
};

const getSubmissionStatus = (currentFiling: FilingType): StepStatusEnum => {
  if (currentFiling.status >= FilingStatusAsNumber.SUBMISSION_ACCEPTED)
    return STEP_COMPLETE;
  return STEP_INCOMPLETE;
};

export const getFilingSteps = (currentFiling?: FilingType): StepType[] => {
  if (!currentFiling) return [];

  const steps: StepType[] = [
    {
      status: getUploadStatus(currentFiling),
      label: 'Upload file',
      isCurrent: isStepCurrent('/filing/upload'),
    },
    {
      status: getErrorsStatus(currentFiling),
      label: 'Review errors',
      isCurrent: isStepCurrent('/filing/errors'),
    },
    {
      status: getWarningsStatus(currentFiling),
      label: 'Resolve warnings',
      isCurrent: isStepCurrent('/filing/warnings'),
    },
    {
      status: getContactStatus(currentFiling),
      label: 'Provide point of contact',
      isCurrent: isStepCurrent('/filing/contact'),
    },
    {
      status: getSubmissionStatus(currentFiling),
      label: 'Sign and submit',
      isCurrent: isStepCurrent('/filing/submit'),
    },
  ];

  return steps;
};
