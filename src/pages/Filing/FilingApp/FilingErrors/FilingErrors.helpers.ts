export const getErrorsWarnings = (property = 'logic_errors', data) => {
  const summary = {
    singles: [],
    multis: [],
    registers: [],
  };

  if (!data.submission?.validation_json?.[property]) return summary;

  summary.singles = data.submission.validation_json[property]?.details.filter(
    object => object?.validation?.scope === 'single-field',
  );

  summary.multis = data.submission.validation_json[property]?.details.filter(
    object => object?.validation?.scope === 'multi-field',
  );

  summary.registers = data.submission.validation_json[property]?.details.filter(
    object => object?.validation?.scope === 'register',
  );

  return summary;
};

export const getErrorsWarningsSummary = data => {
  const syntaxErrors = getErrorsWarnings('syntax_errors', data);
  const logicErrors = getErrorsWarnings('logic_errors', data);
  const logicWarnings = getErrorsWarnings('logic_warnings', data);
  const registerErrors = [...syntaxErrors.registers, ...logicErrors.registers];
  const singleErrors = [...syntaxErrors.singles, ...logicErrors.singles];
  const multiErrors = [...syntaxErrors.multis, ...logicErrors.multis];
  const singleWarnings = [...logicWarnings.singles];
  const multiWarnings = [...logicWarnings.multis];

  return {
    syntaxErrors,
    logicErrors,
    logicWarnings,
    registerErrors,
    singleErrors,
    multiErrors,
    singleWarnings,
    multiWarnings,
  };
};
