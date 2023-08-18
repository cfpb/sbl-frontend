
interface InputEntryProperties {
  id: string;
  label: string;
  errors: object;
  isDisabled: boolean;
  register: () => void;
}

function InputEntry({id, errors, label, register, isDisabled = false}: InputEntryProperties) {
  return (
          <div className="mb-6">
            <label
              htmlFor={id}
              className="text-[1.125em] font-medium tracking-[inherit] leading-tight mb-2 inline-block w-full"
            >
              {label}
            </label>
            <input
              type="text"
              id={id}
              className={`border w-full ${errors[id] ? 'border-[#D14124] border-2': ""} disabled:bg-[#E7E8E9]`}
              {...register(id)}
              disabled={isDisabled}
            />
            {errors[id] ? <p className="text-base text-[#D14124] mt-2">
              {errors[id].message}
            </p> : null}
          </div>
  )
}

export default InputEntry;