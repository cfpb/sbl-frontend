import { z } from "zod";
import fiData from "./ProfileForm.data";

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
  financialInstitutions = "Select the financial institution(s) you are associated with"
}

export interface FiDataType {
  name: string;
  lei: string;
  taxID: string;
  agencyCode: number;
}

export type CheckedState = Record<string, boolean>;


const financialInstitutionsSchema = z.object({
  label: z.string(),
  value: z.string(),
});

export type FinancialInstitution = z.infer<typeof financialInstitutionsSchema>;

export const fiDataTypeSchema = z.object({
  name: z.string(),
  lei: z.string(),
  taxID: z.string(),
  agencyCode: z.number()
})

export const validationSchema = z
  .object({
    firstName: z
      .string().min(1, { message: "You must enter your first name to complete your user profile and access the system." }),
    lastName: z
      .string().min(1, { message: "You must enter your last name to complete your user profile and access the system." }),
    email: z.string().min(5, { message: "You must have a valid email address" }).email({
      message: "You must have a valid email address and in the correct format.",
    }),
    selectedFinancialInstitutions: financialInstitutionsSchema
      .array()
      .min(1, { message: "You must select at least one financial institution to complete your user profile and access the system." }),
    fiData: fiDataTypeSchema
      .array()
      .min(1, { message: "You should have associated financial institution information."})
  });

export type ValidationSchema = z.infer<typeof validationSchema>;

export const fiOptions: FinancialInstitution[] = fiData.map(object => ({
  label: object.name,
  value: object.lei,
}));