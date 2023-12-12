import { Link } from 'design-system-react';

export enum Scenario {
  Success1A = "1A",
  Warning1B = "1B",
  Warning1C = "1C",
  Warning3B = "3B",
  Error2 = "2",
}

const AlertTypes = ["warning", "error", "success", "info"] as const; 

type AlertType = typeof AlertTypes[number]; 

interface ScenarioMessageType {
  type: AlertType,
  message: string,
  children: ReactNode
}

type ScenarioFieldType = Record<Scenario, ScenarioMessageType>;

function Children1A(): JSX.Element {
  return <>You have successfully completed your user profile and are authorized to proceed to the data filing platform. If you need further assistance, please <Link href="#">submit a technical question</Link>.</>
}
function Children1B(): JSX.Element {
  return <>You may begin filing for the financial institution assocation that match your email domain. Your self selections have gone to our technical help team for review. You will not be able to file for those institutions until the associations are approved. Please allow 24-48 hours for a response that will occur during normal business hours. If you need further assistance, please <Link href="#">submit a technical question</Link>.</>
}
function Children1C(): JSX.Element {
  return <>You will not have access to the data filing platform until your financial institution associations are approved. Please allow 24-48 hours for a response that will occur during normal business hours. If you need further assistance, please <Link href="#">submit a technical question</Link>.</>
}
function Children3B(): JSX.Element {
  return <Children1C />
}
function Children2(): JSX.Element {
  return <>The email address you used to log in is not approved for use on the CFPB's data filing platform. Please return to <Link href="#">Login.gov</Link> and log in with your financial institution email address.</>
}


export const Step2FormHeaderMessages: ScenarioFieldType = {
  [Scenario.Success1A]: {
    type: "success",
    message: "You are approved to proceed to the filing platform",
    children: <Children1A />
  },
  [Scenario.Warning1B]: {
    type: "warning",
    message: "You are approved to proceed to the filing platform for some selections",
    children: <Children1B />
  },
  [Scenario.Warning1C]: {
    type: "warning",
    message: "Your selection has been submitted to our technical support staff for review",
    children: <Children1C />
  },
  [Scenario.Warning3B]: {
    type: "warning",
    message: "Your selection has been submitted to our technical support staff for review",
    children: <Children3B />
  },
  [Scenario.Error2]: {
    type: "error",
    message: "It appears that you logged in with a personal email address",
    children: <Children2 />
  }
}

