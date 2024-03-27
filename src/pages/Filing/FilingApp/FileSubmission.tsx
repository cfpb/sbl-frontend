import Head from 'components/Head';
import StepIndicator, {
  STEP_COMPLETE,
  STEP_CURRENT,
} from 'components/StepIndicator';
import { Button, Grid, Heading } from 'design-system-react';
import { One } from 'utils/constants';
import { useProgressStore } from './SubmissionProgress';

export function FileSubmission(): JSX.Element {
  const currentIndex = useProgressStore(state => state.current);
  const steps = useProgressStore(state => state.steps);
  const markComplete = useProgressStore(state => state.markComplete);
  const nextStep = useProgressStore(state => state.nextStep);
  const previousStep = useProgressStore(state => state.prevStep);

  const stepsAdjusted = [...steps];
  stepsAdjusted[currentIndex] = {
    label: stepsAdjusted[currentIndex].label,
    status: STEP_CURRENT,
  };

  const currentStep = stepsAdjusted[currentIndex];

  const onNext = (): void => {
    markComplete();
    if (currentIndex < steps.length - One) nextStep();
  };

  const onPrevious = (): void => {
    previousStep();
  };

  const isLast = currentIndex === steps.length - One;
  const isLastComplete = isLast && steps[currentIndex].status === STEP_COMPLETE;

  return (
    <>
      <Head title='File your Small Business Lending data' />
      <Grid.Wrapper center>
        <Grid.Row>
          <Grid.Column width={12}>
            <StepIndicator steps={stepsAdjusted} />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={8}>
            <Heading className='my-10'>{currentStep.label}</Heading>
            <div className='my-10'>
              <Button
                label='Previous'
                iconLeft='left'
                onClick={onPrevious}
                disabled={currentIndex === 0}
              />
              <Button
                label={
                  isLast ? (isLastComplete ? 'All Done!' : 'Complete') : 'Next'
                }
                iconRight={
                  isLast ? (isLastComplete ? 'approved' : 'serve') : 'right'
                }
                className='ml-2'
                onClick={onNext}
                disabled={
                  currentIndex === steps.length - One &&
                  steps[currentIndex].status === STEP_COMPLETE
                }
              />
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid.Wrapper>
    </>
  );
}

export default { FileSubmission };
