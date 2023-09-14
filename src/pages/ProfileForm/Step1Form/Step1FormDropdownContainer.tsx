import { ReactComponent as DropdownIndicator } from "assets/dropdown-indicator.svg";
import InputErrorMessage from "components/InputErrorMessage";
import Select, { components } from "react-select";
import { fiOptions } from "../types";

type Step1FormDropdownContainerProps = {
  error: object | undefined;
}

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    outline: state.isFocused ? '0.25rem solid #2491ff !important' : '',
    outlineOffset: state.isFocused ? '0 !important' : ''
  }),
};

const customDropdownIndicator = (properties) => (
  <components.DropdownIndicator {...properties}>
    <DropdownIndicator />
  </components.DropdownIndicator>
);

// TODO: Migrate to a more generic component
const Step1FormDropdownContainer = ({error}: Step1FormDropdownContainerProps) => {
  return (
    <>
    <div className="">
      <Select 
        inputId="financialInstitutions"
        classNames={{
          control: (state) => `!rounded-none !w-full !border !border-cfpbBorderColor`,
          indicatorSeparator: (state) => '!mb-0 !mt-0 !border-inherit !bg-cfpbBorderColor',
          indicatorsContainer: (state) => '!bg-disabledColor',
          dropdownIndicator: (state) => '!text-inherit',
          valueContainer: ()=> `${ (error) ? "!border-errorColor !border-solid" : ""}`,
        }} 
        components={{
          DropdownIndicator: customDropdownIndicator,
        }}
        options={fiOptions} 
        isSearchable
        placeholder=''
        styles={customStyles}
        controlShouldRenderValue={false}
      />
    </div>
      {error ? <div>
      <InputErrorMessage>{error.message}</InputErrorMessage>
    </div> : null}
    </>
  )
}

export default Step1FormDropdownContainer;