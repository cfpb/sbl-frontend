import { formDelimiter } from './common';

const LAST_ITEM = -1;
const SECOND_TO_LAST_ITEM = -2;

export interface FormErrorKeyType {
  scrollKey: string | undefined;
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
    scrollKey: keyUsed ?? key,
    keyIndex,
    formFieldsHeaderErrorKey: keyUsed,
  };
};

export const normalKeyLogic = (key: string): FormErrorKeyType => {
  const keySplit = key.split(formDelimiter);
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const keyUsed = keySplit.at(-1);
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const keyIndex = keySplit.at(-2) ? Number(keySplit.at(-2)) : null;

  return {
    scrollKey: key,
    keyIndex,
    formFieldsHeaderErrorKey: keyUsed,
  };
};
