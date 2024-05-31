import { UpdateTOIZodSchemaErrors } from 'components/FormErrorHeader.data';
import { institutionDetailsApiTypeSchema, taxIdSchema } from 'types/formTypes';
import { One } from 'utils/constants';
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
    label: 'Non-depository institution',
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
    tax_id: true,
  })
  .extend({
    tax_id: z.union([taxIdSchema, z.string().trim().max(0), z.null()]),
    sbl_institution_types: z.boolean().optional().array(),
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
      message: UpdateTOIZodSchemaErrors.OtherMin,
      path: ['sbl_institution_types_other'],
    },
  );

export type UpdateInstitutionType = z.infer<typeof UpdateInstitutionSchema>;

// TODO: Find a better way to reuse/extend the UpdateInstitutionSchema for UpdateInstitutionTypeSchema
export const UpdateTypeOfInstitutionSchema = z
  .object({
    sbl_institution_types: z.boolean().optional().array(),
    sbl_institution_types_other: z.string().optional(),
  })
  .superRefine((data, context) => {
    const OTHER_ID = 13;

    if (
      data.sbl_institution_types[OTHER_ID] === true &&
      (data.sbl_institution_types_other?.length ?? 0) === 0
    ) {
      context.addIssue({
        received: data.sbl_institution_types_other as string,
        code: z.ZodIssueCode.invalid_enum_value,
        message: UpdateTOIZodSchemaErrors.OtherMin,
        path: ['sbl_institution_types_other'],
        options: [],
      });
    }

    if (!data.sbl_institution_types.some(Boolean)) {
      context.addIssue({
        minimum: One,
        inclusive: true,
        type: 'number',
        code: z.ZodIssueCode.too_small,
        message: UpdateTOIZodSchemaErrors.financialInstitutionMin,
        path: ['sbl_institution_types'],
      });
    }
  });

export type UpdateTypeOfInstitutionType = z.infer<
  typeof UpdateTypeOfInstitutionSchema
>;
