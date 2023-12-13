import { z } from "zod";

export enum FormFields {
  firstName = "First name",
  lastName = "Last name",
  email = "Email address",
  financialInstitutions = "Associated financial institution(s)"
}

export enum FormFieldsHeaderError {
  firstName = "Enter your first name",
  lastName = "Enter your last name",
  email = "Invalid email address",
  financialInstitutions = "Select at least one financial institution(s)"
}

const financialInstitutionsSchema = z.object({
  label: z.string(),
  value: z.string(),
});

export type FinancialInstitutionRS = z.infer<typeof financialInstitutionsSchema>;

export const fiDataTypeSchema = z.object({
  name: z.string(),
  lei: z.string(),
  taxID: z.string(),
  agencyCode: z.number()
})

export type FiDataType = z.infer<typeof fiDataTypeSchema>;

export interface CheckedState {
  checked: boolean
}

export type FiDataChecked = CheckedState & FiDataType;

export const validationSchema = z
  .object({
    firstName: z
      .string().min(1, { message: "You must enter your first name to complete your user profile and access the system." }),
    lastName: z
      .string().min(1, { message: "You must enter your last name to complete your user profile and access the system." }),
    email: z.string().min(5, { message: "You must have a valid email address" }).email({
      message: "You must have a valid email address and in the correct format.",
    }),
    financialInstitutions: fiDataTypeSchema
      .array()
      .min(1, { message: "You must select at least one financial institution to complete your user profile and access the system." }),
    // fiData: fiDataTypeSchema // TODO: Unlink this from the schema, tie to a fetch request
    //   .array()
    //   .min(1, { message: "You should have associated financial institution information."})
  });

export type ValidationSchema = z.infer<typeof validationSchema>;
