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