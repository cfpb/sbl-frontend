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

  for (const validationObject of summary.multis) {
    validationObject.formattedRecords = {};
    for (const recordObject of validationObject.records) {
      for (const fieldObject of recordObject.fields) {
        if (!validationObject.formattedRecords[fieldObject.name]) {
          validationObject.formattedRecords[fieldObject.name] = [];
        }
        validationObject.formattedRecords[fieldObject.name].push([
          recordObject.record_no,
          recordObject.uid,
          fieldObject.value,
        ]);
      }
    }
  }

  summary.registers = data.submission.validation_json[property]?.details.filter(
    object => object?.validation?.scope === 'register',
  );

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
