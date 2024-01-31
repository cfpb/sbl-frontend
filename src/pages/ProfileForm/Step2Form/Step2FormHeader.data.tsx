import { Link } from 'components/Link';
import type { ReactNode } from 'react';
import { loginGovAccountPage } from 'utils/common';

export enum ScenarioHeader {
  Error = 'Unable to complete your user profile',
  Status = 'User profile submission status',
}

export enum Scenario {
  // Success1,
  // Warning1,
  // Warning2,
  // Warning3,
  Error1,
}

const AlertTypes = ['warning', 'error', 'success', 'info'] as const;

type AlertType = (typeof AlertTypes)[number];

interface ScenarioMessageType {
  type: AlertType;
  message: string;
  children: ReactNode;
}

type ScenarioFieldType = Record<Scenario, ScenarioMessageType>;

// TODO: These items may be commented out but not removed till post-MVP
// function ChildrenSuccess1(): JSX.Element {
//   return <>You have successfully completed your user profile and are authorized to proceed to the data filing platform. If you need further assistance, please <Link href="#">submit a technical question</Link>.</>
// }
// function ChildrenWarning1(): JSX.Element {
//   return <>You will not have access to the data filing platform until you have successfully associated your user profile with a financial institution in our system. If you need further assistance please <Link href="#">contact our support staff.</Link></>
// }
// function ChildrenWarning2(): JSX.Element {
//   return <>You may begin filing for the financial institution assocation that match your email domain. Your self selections have gone to our technical help team for review. You will not be able to file for those institutions until the associations are approved. Please allow 24-48 hours for a response that will occur during normal business hours. If you need further assistance, please <Link href="#">submit a technical question</Link>.</>
// }
// function ChildrenWarning3(): JSX.Element {
//   return <>You will not have access to the data filing platform until your financial institution associations are approved. Please allow 24-48 hours for a response that will occur during normal business hours. If you need further assistance, please <Link href="#">submit a technical question</Link>.</>
// }
function ChildrenError1(): JSX.Element {
  return (
    <>
      <Link target='_blank' href={loginGovAccountPage}>
        Visit your Login.gov account page
      </Link>{' '}
      to confirm that your financial institution email address has been added to
      your account. Once you have confirmed that your financial institution
      email address is listed, sign out of Login.gov,{' '}
      <Link href='/'>return to the platform homepage</Link>, and sign in with
      your financial institution email address.
    </>
  );
}

// TODO: These items may be commented out but not removed till post-MVP
export const Step2FormHeaderMessages: ScenarioFieldType = {
  // [Scenario.Success1]: {
  //   type: "success",
  //   message: "You are approved to proceed to the filing platform",
  //   children: <ChildrenSuccess1 />
  // },
  // [Scenario.Warning1]: {
  //   type: "warning",
  //   message: "Your selection has been submitted to our support staff for review",
  //   children: <ChildrenWarning1 />
  // },
  // [Scenario.Warning2]: {
  //   type: "warning",
  //   message: "You are approved to proceed to the filing platform for some selections",
  //   children: <ChildrenWarning2 />
  // },
  // [Scenario.Warning3]: {
  //   type: "warning",
  //   message: "Your selection has been submitted to our technical support staff for review",
  //   children: <ChildrenWarning3 />
  // },
  [Scenario.Error1]: {
    type: 'error',
    message: 'It appears that you signed in with a personal email address',
    children: <ChildrenError1 />,
  },
};
