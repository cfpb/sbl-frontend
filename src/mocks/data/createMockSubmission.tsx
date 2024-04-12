import { One } from 'utils/constants';
import type { SubmissionType } from 'utils/types';
import { FilingStatusString } from 'utils/types';

// Create a mock Submission object
// Pass overrides as an object
// ex. createMockSubmission({ state: 'SUBMISSION_ACCEPTED' })
export const createMockSubmission = (
  changes?: Partial<SubmissionType>,
): SubmissionType => {
  const base = {
    id: One,
    submitter: 'User1234',
    state: 'SUBMISSION_STARTED',
    validation_ruleset_version: 'v1',
    submission_time: 'today',
    filename: 'file1234.csv',
    accepter: null,
  };

  if (changes)
    for (const change of Object.keys(changes)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      base[change] = changes[change];
    }

  return base;
};

export const mockSubmissionStarted = createMockSubmission();

export const mockSubmissionErrors = createMockSubmission({
  state: FilingStatusString.VALIDATION_WITH_ERRORS,
});

export const mockSubmissionWarnings = createMockSubmission({
  state: FilingStatusString.VALIDATION_WITH_WARNINGS,
});

export const mockSubmissionValidationProgress = createMockSubmission({
  state: FilingStatusString.VALIDATION_IN_PROGRESS,
});

export const mockSubmissionValidationSuccessful = createMockSubmission({
  state: FilingStatusString.VALIDATION_SUCCESSFUL,
});

export const mockSubmissionAccepted = createMockSubmission({
  state: FilingStatusString.SUBMISSION_ACCEPTED,
});

export default createMockSubmission;
