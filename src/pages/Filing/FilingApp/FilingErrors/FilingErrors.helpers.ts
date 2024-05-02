export const getErrorsWarnings = (property = 'logic_errors', data) => {
  const summary = {
    singles: [],
    multis: [],
    registers: [],
  };
  console.log('datadatadata', data);
  console.log(
    'data?.validation_result?.[property]',
    data?.validation_results?.[property],
  );

  if (!data?.validation_results?.[property]) return summary;

  summary.singles = data.validation_results[property]?.details.filter(
    object => object?.validation?.scope === 'single-field',
  );

  summary.multis = data.validation_results[property]?.details.filter(
    object => object?.validation?.scope === 'multi-field',
  );

  summary.registers = data.validation_results[property]?.details.filter(
    object => object?.validation?.scope === 'register',
  );

  return summary;
};

export const formatMultis = summaryType => {
  for (const validationObject of summaryType) {
    validationObject.formattedRecords = new Map();
    for (const recordObject of validationObject.records) {
      for (const fieldObject of recordObject.fields) {
        if (!validationObject.formattedRecords.has(fieldObject.name)) {
          validationObject.formattedRecords.set(fieldObject.name, []);
        }
        validationObject.formattedRecords
          .get(fieldObject.name)
          .push([recordObject.record_no, recordObject.uid, fieldObject.value]);
      }
    }
  }
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
