import { Link } from 'components/Link';
import type { ReactNode } from 'react';
import { loginGovAccountPage } from 'utils/common';

export const scenarioHeaders = {
  SuccessInstitutionProfileUpdate: 'Your update request has been submitted',
  Error: 'Your email domain is not authorized',
  Warning: 'Your request has been submitted',
} as const;

export type ScenarioHeader =
  (typeof scenarioHeaders)[keyof typeof scenarioHeaders];

export const scenarioMessages = {
  Error: 'It appears that you signed in with a personal email address',
  Warning: 'Your request has been submitted to our support staff for review ',
} as const;

export type ScenarioMessage =
  (typeof scenarioMessages)[keyof typeof scenarioMessages];

export const scenarios = {
  SuccessInstitutionProfileUpdate: 'SuccessInstitutionProfileUpdate',
  // Success1,
  // Warning1,
  // Warning2,
  // Warning3,
  Error1: 'Error1',
  Warning4: 'Warning4',
} as const;
export type Scenario = (typeof scenarios)[keyof typeof scenarios];

const AlertTypes = ['warning', 'error', 'success', 'info'] as const;

type AlertType = (typeof AlertTypes)[number];

export interface ScenarioMessageType {
  type: AlertType;
  header: ScenarioHeader;
  message: ScenarioMessage;
  children: ReactNode;
}

type ScenarioFieldType = Record<Scenario, ScenarioMessageType>;

const linkStyles = 'border-b-[1px]';

// TODO: These items may be commented out but not removed till post-MVP
// function ChildrenSuccess1(): JSX.Element {
//   return (
//     <>
//       You have successfully completed your user profile and are authorized to
//       proceed to the data filing platform. If you need further assistance,
//       please <Link className={linkStyles} href='#'>submit a technical question</Link>.
//     </>
//   );
// }
// function ChildrenWarning1(): JSX.Element {
//   return (
//     <>
//       You will not have access to the data filing platform until you have
//       successfully associated your user profile with a financial institution in
//       our system. If you need further assistance please{' '}
//       <Link className={linkStyles} href='#'>email our support staff.</Link>
//     </>
//   );
// }
// function ChildrenWarning2(): JSX.Element {
//   return (
//     <>
//       You may begin filing for the financial institution association that match
//       your email domain. Your self selections have gone to our technical help
//       team for review. You will not be able to file for those institutions until
//       the associations are approved. Please allow 24-48 hours for a response
//       that will occur during normal business hours. If you need further
//       assistance, please <Link className={linkStyles} href='#'>submit a technical question</Link>.
//     </>
//   );
// }
// function ChildrenWarning3(): JSX.Element {
//   return (
//     <>
//       You will not have access to the data filing platform until your financial
//       institution associations are approved. Please allow 24-48 hours for a
//       response that will occur during normal business hours. If you need further
//       assistance, please <Link className={linkStyles} href='#'>submit a technical question</Link>.
//     </>
//   );
// }
function ChildrenError1(): JSX.Element {
  return (
    <>
      <Link className={linkStyles} href={loginGovAccountPage}>
        Visit your Login.gov account page
      </Link>{' '}
      to confirm that your financial institution email address has been added to
      your account. Once you have confirmed that your financial institution
      email address is listed, sign out of Login.gov,{' '}
      <Link className={linkStyles} href='/'>
        return to the platform homepage
      </Link>
      , and sign in with your financial institution email address. If this issue
      persists,{' '}
      <Link
        className={linkStyles}
        href='mailto:SBLHelp@cfpb.gov?subject=[BETA] Complete your user profile: Questions after submitting form'
      >
        email our support staff
      </Link>
      .
    </>
  );
}

function ChildrenWarning4(): JSX.Element {
  return (
    <>
      You will not have access to the platform until we have associated your
      user profile with a financial institution in our database. Please allow
      24-48 hours for a response during normal business hours. If you need
      further assistance{' '}
      <Link
        className={linkStyles}
        href='mailto:SBLHelp@cfpb.gov?subject=[BETA] Complete your user profile: Questions after submitting form'
      >
        email our support staff
      </Link>
      . Otherwise you can close this window.
    </>
  );
}

function ChildrenSuccessInstitutionProfileUpdate(): JSX.Element {
  return (
    <>
      Please allow 24-48 hours for a response during normal business hours. If
      you need further assistance{' '}
      <Link
        className={linkStyles}
        href='mailto:SBLHelp@cfpb.gov?subject=[BETA] Update your financial institution profile: Questions after submitting form'
      >
        email our support staff
      </Link>
      .
    </>
  );
}

// TODO: These items may be commented out but not removed till post-MVP
export const summaryFormHeaderMessages: ScenarioFieldType = {
  // [Scenario.Success1]: {
  //   type: 'success',
  //   message: 'You are approved to proceed to the filing platform',
  //   children: <ChildrenSuccess1 />,
  // },
  // [Scenario.Warning1]: {
  //   type: 'warning',
  //   message:
  //     'Your selection has been submitted to our support staff for review',
  //   children: <ChildrenWarning1 />,
  // },
  // [Scenario.Warning2]: {
  //   type: 'warning',
  //   message:
  //     'You are approved to proceed to the filing platform for some selections',
  //   children: <ChildrenWarning2 />,
  // },
  // [Scenario.Warning3]: {
  //   type: 'warning',
  //   message:
  //     'Your selection has been submitted to our technical support staff for review',
  //   children: <ChildrenWarning3 />,
  // },
  [scenarios.SuccessInstitutionProfileUpdate]: {
    type: 'warning',
    header: scenarioHeaders.SuccessInstitutionProfileUpdate,
    message: scenarioMessages.Warning,
    children: <ChildrenSuccessInstitutionProfileUpdate />,
  },
  [scenarios.Error1]: {
    type: 'error',
    header: scenarioHeaders.Error,
    message: scenarioMessages.Error,
    children: <ChildrenError1 />,
  },
  [scenarios.Warning4]: {
    type: 'warning',
    header: scenarioHeaders.Warning,
    message: scenarioMessages.Warning,
    children: <ChildrenWarning4 />,
  },
};
