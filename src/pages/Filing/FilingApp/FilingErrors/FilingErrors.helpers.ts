export const getErrorsWarnings = (property = 'logic_errors', data) => {
  const summary = {
    singles: [],
    multis: [],
    registers: [],
  };

  if (!data.submission?.validation_results?.[property]) return summary;

  summary.singles = data.submission.validation_results[
    property
  ]?.details.filter(object => object?.validation?.scope === 'single-field');

  summary.multis = data.submission.validation_results[property]?.details.filter(
    object => object?.validation?.scope === 'multi-field',
  );

  summary.registers = data.submission.validation_results[
    property
  ]?.details.filter(object => object?.validation?.scope === 'register');

  return summary;
};

export const getErrorsWarningsSummary = data => {
  const syntaxErrors = getErrorsWarnings('syntax_errors', data);
  const logicErrors = getErrorsWarnings('logic_errors', data);
  const logicWarnings = getErrorsWarnings('logic_warnings', data);
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
