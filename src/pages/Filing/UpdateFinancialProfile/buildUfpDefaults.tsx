import { formatDomains } from '../ViewInstitutionProfile/FinancialInstitutionDetails';
import type { InstitutionDetailsApiType } from '../ViewInstitutionProfile/institutionDetails.type';
import type { UFPSchema } from './types';
import { sblInstitutionTypeMap } from './types';

const defaultsId = new Set(['primary_federal_regulator']);

const defaultsCode = new Set(['hq_address_state']);

const defaultsPlain = new Set([
  'hq_address_street_1',
  'hq_address_street_2',
  'hq_address_city',
  'hq_address_state_code',
  'hq_address_zip',
  'parent_lei',
  'parent_legal_name',
  'parent_rssd_id',
  'top_holder_lei',
  'top_holder_legal_name',
  'top_holder_rssd_id',
  'lei',
  'name',
  'is_active',
  'tax_id',
  'rssd_id',
  'primary_federal_regulator_id',
  'hmda_institution_type_id',
]);

// TODO:
const buildUfpDefaults = (data: InstitutionDetailsApiType): UFPSchema => {
  const formDefaults: UFPSchema = { additional_details: '' };
  const keys: string[] = Object.keys(data);

  for (const keyTemporary of keys) {
    const key = keyTemporary as keyof typeof data;
    if (defaultsPlain.has(key)) {
      formDefaults[key] = data[key];
    }

    if (defaultsId.has(key)) {
      formDefaults[key] = data[key].id;
    }

    if (defaultsCode.has(key)) {
      formDefaults[key] = data[key].code;
    }

    if (key === 'sbl_institution_types') {
      formDefaults[key] = {};

      for (const sblType of data[key]) {
        if (typeof sblType === 'string')
          formDefaults[key][sblInstitutionTypeMap[sblType]] = true;
        else {
          formDefaults[key][sblInstitutionTypeMap[sblType.sbl_type.id]] = true;
          if (sblType.sbl_type.id === '13')
            formDefaults.sbl_institution_type_other = sblType.details;
        }
      }
    }

    if (key === 'domains') formDefaults[key] = formatDomains(data[key]);
  }

  return formDefaults;
};

export default buildUfpDefaults;
