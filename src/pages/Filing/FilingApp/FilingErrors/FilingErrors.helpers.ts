import type {
  Detail,
  SubmissionResponse,
  ValidationResults,
} from 'types/filingTypes';

interface GetErrorsWarningsProperties {
  data: SubmissionResponse | undefined;
  property: keyof ValidationResults;
}

interface SummaryResults {
  singles: Detail[];
  multis: Detail[];
  registers: Detail[];
}

export const getErrorsWarnings = ({
  data,
  property = 'logic_errors',
}: GetErrorsWarningsProperties): SummaryResults => {
  const summary: SummaryResults = {
    singles: [],
    multis: [],
    registers: [],
  };

  if (!data?.validation_results?.[property]) return summary;

  summary.singles = data.validation_results[property].details.filter(
    object => object.validation.scope === 'single-field',
  );

  summary.multis = data.validation_results[property].details.filter(
    object => object.validation.scope === 'multi-field',
  );

  summary.registers = data.validation_results[property].details.filter(
    object => object.validation.scope === 'register',
  );

  return summary;
};

interface GetErrorsWarningsSummaryResult {
  syntaxErrors: SummaryResults;
  logicErrors: SummaryResults;
  logicWarnings: SummaryResults;
  registerErrors: Detail[];
  syntaxErrorsSingle: Detail[];
  syntaxErrorsMulti: Detail[];
  logicErrorsSingle: Detail[];
  logicErrorsMulti: Detail[];
  logicWarningsSingle: Detail[];
  logicWarningsMulti: Detail[];
}

export const getErrorsWarningsSummary = (
  data: SubmissionResponse | undefined,
): GetErrorsWarningsSummaryResult => {
  const syntaxErrors = getErrorsWarnings({ data, property: 'syntax_errors' });
  const logicErrors = getErrorsWarnings({ data, property: 'logic_errors' });
  const logicWarnings = getErrorsWarnings({ data, property: 'logic_warnings' });
  const registerErrors = [...logicErrors.registers];
  const syntaxErrorsSingle = [...syntaxErrors.singles];
  const syntaxErrorsMulti = [...syntaxErrors.multis];
  const logicErrorsSingle = [...logicErrors.singles];
  const logicErrorsMulti = [...logicErrors.multis];
  const logicWarningsSingle = [...logicWarnings.singles];
  const logicWarningsMulti = [...logicWarnings.multis];

  return {
    syntaxErrors,
    logicErrors,
    logicWarnings,
    registerErrors,
    syntaxErrorsSingle,
    syntaxErrorsMulti,
    logicErrorsSingle,
    logicErrorsMulti,
    logicWarningsSingle,
    logicWarningsMulti,
  };
};

// Deprecated: Count should now come from the data response object
export const getRecordsAffected = (
  validationDetails: Detail[],
): Set<number> => {
  const setRecords = new Set<number>();
  for (const detail of validationDetails) {
    for (const record of detail.records) {
      setRecords.add(record.record_no);
    }
  }
  return setRecords;
};
