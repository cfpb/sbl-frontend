import { SBL_INSTITUTION_TYPE_OTHER_INDEX } from 'utils/constants';

export const formatTypesForApi = ({
  sbl_institution_types,
  sbl_institution_types_other,
}: {
  sbl_institution_types: boolean[];
  sbl_institution_types_other: string;
}): string => {
  const nextTypes = [];

  for (const [index, isChecked] of sbl_institution_types.entries()) {
    if (isChecked) {
      // Other
      if (index === SBL_INSTITUTION_TYPE_OTHER_INDEX) {
        nextTypes.push({
          id: `${index}`,
          details: sbl_institution_types_other,
        });
      } else nextTypes.push(`${index}`);
    }
  }

  const result = { sbl_institution_types: nextTypes };
  return JSON.stringify(result);
};

export default formatTypesForApi;
