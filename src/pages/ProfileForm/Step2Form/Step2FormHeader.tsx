import { Link, Notification } from 'design-system-react';
/**
 * 
 * @returns Header for Step2Form
 */
function Step2FormHeader(): JSX.Element {
  return (
        <div id="Step2FormHeader" className="max-w-[670px] mb-[45px]">
          <h1 className="mb-[30px]">User profile submission status</h1>
          <Notification
            message="You are approved to proceed to the filing platform for some selections"
            type="warning"
          >
            You may begin filing for the financial institution assocation that match your email domain. Your self selections have gone to our technical help team for review. You will not be able to file for those institutions until the associations are approved. Please allow 24-48 hours for a response that will occur during normal business hours. If you need further assistance, please <Link href="#">submit a technical question</Link>.
          </Notification>
        </div>
  )
}

export default Step2FormHeader;