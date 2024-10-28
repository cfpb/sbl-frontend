import Links from 'components/CommonLinks';
import FieldGroup from 'components/FieldGroup';
import SectionIntro from 'components/SectionIntro';
import { RadioButton } from 'design-system-react';
import InputErrorMessage from 'components/InputErrorMessage';
import type { FieldErrors } from 'react-hook-form';
import type { FilingDetailsSchema } from 'types/formTypes';
import RadioButtonGroup from '../../components/RadioButtonGroup';

function VoluntaryReporterStatus({
  value,
  disabled = false,
  formErrors,
  onChange,
}: {
  value?: boolean | null | undefined;
  disabled?: boolean | null | undefined;
  formErrors?: FieldErrors<FilingDetailsSchema> | null | undefined;
  onChange?: ((selected: boolean) => void) | null | undefined;
}): JSX.Element {
  const onGroupChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onChange?.((event.target as HTMLInputElement).id === 'is-voluntary');
  };

  return (
    <>
      <SectionIntro
        id='voluntary-reporter-status'
        heading='Indicate voluntary reporter status'
      >
        Pursuant to <Links.RegulationB section='§ 1002.109(b)(10)' />, select
        voluntary reporter if your financial institution is voluntarily
        reporting covered applications from small businesses.
      </SectionIntro>
      <FieldGroup>
        <RadioButtonGroup
          id='isVoluntary'
          label='Voluntary reporter status'
          onChange={onGroupChange}
        >
          <RadioButton
            id='is-voluntary'
            label='Voluntary reporter'
            name='Voluntary reporter'
            labelInline
            labelClassName='mb-[0.5rem]'
            checked={typeof value === 'boolean' && value}
            disabled={!!disabled}
          />
          <RadioButton
            id='is-not-voluntary'
            label='Not a voluntary reporter'
            name='Not a voluntary reporter'
            labelInline
            labelClassName=''
            checked={typeof value === 'boolean' && !value}
            disabled={!!disabled}
          />
        </RadioButtonGroup>
        <div>
          {formErrors?.isVoluntary?.message ? (
            <InputErrorMessage>
              {formErrors?.isVoluntary.message}
            </InputErrorMessage>
          ) : null}
        </div>
      </FieldGroup>
    </>
  );
}

VoluntaryReporterStatus.defaultProps = {
  disabled: false,
  formErrors: undefined,
  onChange: undefined,
  value: undefined,
};

export default VoluntaryReporterStatus;
