import { ReactComponent as ErrorSVG } from "assets/error.svg";


function ErrorIcon(): JSX.Element {
  return (
    <div className='text-errorColor'>
      <ErrorSVG />
    </div>
  )
}

export default ErrorIcon