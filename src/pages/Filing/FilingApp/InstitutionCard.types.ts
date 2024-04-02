export type ButtonAppearance = 'primary' | 'secondary' | 'warning' | undefined;

// TODO: Replace with InstitutionAPIDataSchema (or whatever the name is)
export interface InstitutionDataType {
  // eslint-disable-next-line react/no-unused-prop-types, react/require-default-props
  lei?: string;
  // eslint-disable-next-line react/no-unused-prop-types, react/require-default-props
  name?: string;
  // eslint-disable-next-line react/no-unused-prop-types, react/require-default-props
  status?: string;
  filingPeriod?: number | string;
}

export interface SecondaryButtonType {
  // eslint-disable-next-line react/no-unused-prop-types, react/require-default-props
  secondaryButtonLabel?: string;
  // eslint-disable-next-line react/no-unused-prop-types, react/require-default-props
  secondaryButtonAppearance?: string;
  // eslint-disable-next-line react/no-unused-prop-types, react/require-default-props
  secondaryButtonDestination?: string;
}

type OnClickType = (event?: Event) => void;

export interface StatusCardType {
  title: string;
  description: string;
  mainButtonLabel: string;
  mainButtonAppearance: ButtonAppearance;
  mainButtonDestination: string;
  onClick?: OnClickType;
}
