import { buildEmailDomainString } from 'utils/formatting';
import type { InstitutionDetailsApiType } from '../ViewInstitutionProfile/institutionDetails.type';

// Map the Institutions API data to an easily trackable format for react-hook-form
const buildProfileFormDefaults = (
  data: InstitutionDetailsApiType,
): InstitutionDetailsApiType => {
  const formDefaults: InstitutionDetailsApiType = structuredClone(data);
  formDefaults.domains = buildEmailDomainString(data.domains);
  formDefaults.additional_details = ''; // Only part of outgoing data

  // Building an easier format to track checkboxes via react-hook-form
  formDefaults.sbl_institution_types = [];
  if (data.sbl_institution_types) {
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
