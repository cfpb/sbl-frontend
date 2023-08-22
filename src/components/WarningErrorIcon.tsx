import { ReactComponent as WarningErrorSVG } from "assets/warning-error.svg";


function WarningErrorIcon(): JSX.Element {
  return (
    <div className='text-errorColor'>
      <WarningErrorSVG />
    </div>
  )
}

export default WarningErrorIcon