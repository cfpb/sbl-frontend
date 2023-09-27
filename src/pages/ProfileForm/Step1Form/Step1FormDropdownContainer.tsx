// import { ReactComponent as DropdownIndicator } from "assets/dropdown-indicator.svg";
import InputErrorMessage from "components/InputErrorMessage";
import { Dropdown } from 'design-system-react';
import type { GroupBase, Props } from "react-select";



interface Step1FormDropdownContainerProperties {
  error: string;
}


function Step1FormDropdownContainer<
  OptionType,
  IsMulti extends boolean = false,
  GroupType extends GroupBase<OptionType> = GroupBase<OptionType>
>({
  error,
  onChange,
  ...properties
}: Props<OptionType, IsMulti, GroupType> & Step1FormDropdownContainerProperties): JSX.Element {
  
  return (
    <>
      <div>
        <Dropdown 
          error={error}
          onSelect={onChange} 
          {...properties}        
        />
      </div>
        {error ? <div>
        <InputErrorMessage>{error}</InputErrorMessage>
      </div> : null}
    </>
  );
}


export default Step1FormDropdownContainer;