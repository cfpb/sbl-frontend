// eslint-disable-next-line testing-library/no-manual-cleanup
import { cleanup, render, screen } from '@testing-library/react';
import type { StepType } from 'components/StepIndicator';
import {
  STEP_COMPLETE,
  STEP_CURRENT,
  STEP_INCOMPLETE,
  Step,
  StepIndicator,
  mockSteps,
  screenReaderStatusMap,
  stepStyleMap,
} from 'components/StepIndicator';

describe('<Step />', () => {
  it('Renders screen reader status label when needed', async () => {
    for (const step of mockSteps) {
      render(<Step {...step} />);

      switch (step.status) {
        case STEP_COMPLETE: {
          expect(
            screen.getAllByText(screenReaderStatusMap[STEP_COMPLETE])[0],
          ).toBeInTheDocument();
          break;
        }
        case STEP_INCOMPLETE: {
          expect(
            screen.getAllByText(screenReaderStatusMap[STEP_INCOMPLETE])[0],
          ).toBeInTheDocument();
          break;
        }
        case STEP_CURRENT: {
          expect(
            screen.getAllByText(screenReaderStatusMap[STEP_CURRENT])[0],
          ).toBeInTheDocument();
          break;
        }
        default:
      }

      cleanup(); // Without manual cleanup, tests fail
    }
  });

  it('Correctly styles each Step based on its status', async () => {
    const steps: StepType[] = [
      { status: STEP_COMPLETE, label: STEP_COMPLETE },
      { status: STEP_CURRENT, label: STEP_CURRENT },
      { status: STEP_INCOMPLETE, label: STEP_INCOMPLETE },
    ];

    for (const [, { status }] of steps.entries()) {
      render(<Step status={status} label={status} />);
      const whereTextLives = screen.getByText(status);
      expect(whereTextLives).toBeInTheDocument();

      const whereBorderLives = screen.getByTestId('step-wrapper');
      expect(whereBorderLives.className).toContain(stepStyleMap[status]);
      cleanup();
    }
  });
});

describe('<StepIndicator />', () => {
  it('renders all provided steps', async () => {
    render(<StepIndicator steps={mockSteps} />);
    for (const step of mockSteps) {
      expect(screen.getAllByText(step.label)[0]).toBeInTheDocument();
    }
  });
});
