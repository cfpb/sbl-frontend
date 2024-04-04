import { Zero } from 'utils/constants';

interface ProgressBarProperties {
  progress: number | string;
}

function ProgressBar({ progress = Zero }: ProgressBarProperties): JSX.Element {
  return (
    <div className='my-[1.875rem] h-6 w-full rounded-full bg-stepIndicatorIncomplete'>
      <div
        className='box-border flex h-full max-w-full items-center justify-center rounded-full bg-stepIndicatorComplete p-0.5 text-center text-lg font-medium leading-none text-blue-100'
        style={{ width: `${progress}%` }}
      >
        {`${progress}%`}
      </div>
    </div>
  );
}

export default ProgressBar;
