// import { ReactComponent as DropdownIndicator } from "assets/dropdown-indicator.svg";
import InputErrorMessage from "components/InputErrorMessage";
import { Dropdown } from 'design-system-react';
import { GroupBase, Props } from "react-select";



type Step1FormDropdownContainerProps = {
  error: string;
}

function Step1FormDropdownContainer<
  OptionType,
  IsMulti extends boolean = false,
  GroupType extends GroupBase<OptionType> = GroupBase<OptionType>
>({
  error,
  onChange,
  ...props
}: Props<OptionType, IsMulti, GroupType> & Step1FormDropdownContainerProps): JSX.Element {
  return (
    <>
      <div>
        <Dropdown 
          onSelect={onChange} 
          {...props}        
        />
      </div>
        {error ? <div>
        <InputErrorMessage>{error}</InputErrorMessage>
      </div> : null}
    </>
  );
}


export default Step1FormDropdownContainer;