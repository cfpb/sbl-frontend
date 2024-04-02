import { institutionDetailsApiTypeSchema } from 'types/formTypes';
import { z } from 'zod';

export interface CheckboxOption {
  id: string;
  label: string;
}

export const checkboxOptions: CheckboxOption[] = [
  {
    id: '1',
    label: 'Bank or savings association',
  },
  {
    id: '2',
    label: 'Minority depository institution',
  },
  {
    id: '3',
    label: 'Credit union',
  },
  {
    id: '4',
    label: 'Nondepository institution',
  },
  {
    id: '5',
    label: 'Community development financial institution (CDFI)',
  },
  {
    id: '6',
    label: 'Other nonprofit financial institution',
  },
  {
    id: '7',
    label: 'Farm Credit System institution',
  },
  {
    id: '8',
    label: 'Government lender',
  },
  {
    id: '9',
    label: 'Commercial finance company',
  },
  {
    id: '10',
    label: 'Equipment finance company',
  },
  {
    id: '11',
    label: 'Industrial loan company',
  },
  {
    id: '12',
    label: 'Online lender',
  },
  {
    id: '13',
    label: 'Other',
  },
];

/* Customize for different structure used to track Institution form input */
export const UpdateInstitutionSchema = institutionDetailsApiTypeSchema
  .omit({
    hmda_institution_type_id: true,
    sbl_institution_types: true,
    domains: true,
  })
  .extend({
    sbl_institution_types: z
      .boolean()
      .optional()
      .array()
      .refine(array => array.includes(true), {
        message:
          'You must select at least one "Type of financial institution."',
      }),
    sbl_institution_types_other: z.string().optional(),
    domains: z.string(),
    additional_details: z.string().optional(),
  })
  .refine(
    data => {
      const OTHER_ID = 13;
      if (data.sbl_institution_types[OTHER_ID] === true)
        return (data.sbl_institution_types_other?.length ?? 0) > 0;
      return true;
    },
    {
      message:
        'You must enter a value in the text field when the "Other" box is checked',
      path: ['sbl_institution_types_other'],
    },
  );

export type UpdateInstitutionType = z.infer<typeof UpdateInstitutionSchema>;
