import { Label } from 'design-system-react';

function RadioButtonGroup({
  id = 'radio-button-group',
  label = 'Radio Group',
  onChange,
  children,
}: {
  id?: string | null | undefined;
  label?: string | null | undefined;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | null | undefined;
  children: React.ReactNode;
}): JSX.Element {
  const ENTER_KEY_CODE = 13;

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (
      !event.altKey &&
      !event.ctrlKey &&
      !event.metaKey &&
      !event.shiftKey &&
      event.keyCode === ENTER_KEY_CODE
    ) {
      event.preventDefault();
      event.stopPropagation();
      (event.target as HTMLInputElement).click();
    }
  };

  return (
    <>
      <Label
        id={id ?? undefined}
        htmlFor={`${id}-radio-group`}
        className='mb-[0.9375rem]'
      >
        {label}
      </Label>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        id={`${id}-radio-group`}
        onKeyDown={onKeyDown}
        onChange={onChange ?? undefined}
      >
        {children}
      </div>
    </>
  );
}

RadioButtonGroup.defaultProps = {
  id: 'radio-button-group',
  label: 'Radio Group',
  onChange: undefined,
};

export default RadioButtonGroup;
