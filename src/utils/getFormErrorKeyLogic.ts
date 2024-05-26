import { formDelimiter } from './common';

const LAST_ITEM = -1;
const SECOND_TO_LAST_ITEM = -2;

export interface FormErrorKeyType {
  keyField: string;
  scrollKey: string;
  keyIndex: number | string | null;
  formFieldsHeaderErrorKey: string | undefined;
}

export const updateFinancialProfileKeyLogic = (
  key: string,
): FormErrorKeyType => {
  const keySplit = key.split(formDelimiter);

  // Elements checked via zod.refine can have weird key structure
  // i.e. sbl_institution_types-root
  const alternateKey = keySplit.includes('root') ? keySplit[0] : null;

  const keyUsed = alternateKey ?? keySplit.at(LAST_ITEM);

  const keyIndex =
    alternateKey ??
    (keySplit.at(SECOND_TO_LAST_ITEM)
      ? Number(keySplit.at(SECOND_TO_LAST_ITEM))
      : null);

  return {
    keyField: keySplit[0],
    scrollKey: keyUsed ?? key,
    keyIndex,
    formFieldsHeaderErrorKey: keyUsed,
  };
};

export const normalKeyLogic = (key: string): FormErrorKeyType => {
  const keySplit = key.split(formDelimiter);
  const keyUsed = keySplit.at(LAST_ITEM);
  const keyIndex = keySplit.at(SECOND_TO_LAST_ITEM)
    ? Number(keySplit.at(SECOND_TO_LAST_ITEM))
    : null;

  return {
    keyField: keySplit[0],
    scrollKey: key,
    keyIndex,
    formFieldsHeaderErrorKey: keyUsed,
  };
};
