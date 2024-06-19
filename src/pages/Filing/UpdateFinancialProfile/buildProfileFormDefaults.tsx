import type { InstitutionDetailsApiType } from 'types/formTypes';
import { buildEmailDomainString } from 'utils/formatting';
import type { UpdateInstitutionType } from './types';

// Map the Institutions API data to an easily trackable format for react-hook-form
const buildProfileFormDefaults = (
  data: InstitutionDetailsApiType,
): UpdateInstitutionType => {
  // @ts-expect-error Part of code cleanup for post-mvp see: https://github.com/cfpb/sbl-frontend/issues/717
  const formDefaults: UpdateInstitutionType = structuredClone(data);
  formDefaults.domains = buildEmailDomainString(data.domains);
  formDefaults.additional_details = '';

  // Building an easier format to track checkboxes via react-hook-form
  formDefaults.sbl_institution_types = [];
  if (data.sbl_institution_types.length > 0) {
    for (const currentType of data.sbl_institution_types) {
      if (typeof currentType === 'object') {
        const { details, sbl_type: sblType } = currentType;
        const { id: currentId } = sblType;

        formDefaults.sbl_institution_types[Number(currentId)] = true;

        // Other's details
        if (currentId === '13')
          formDefaults.sbl_institution_types_other = details;
      }
    }
  }

  return formDefaults;
};

export default buildProfileFormDefaults;
