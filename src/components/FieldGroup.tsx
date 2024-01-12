interface FieldGroupProperties {
  children: ReactNode
}

function FieldGroup({ children }: FieldGroupProperties): JSX.Element {
  return (
      <div
        className="bg-[#F7F8F9] p-[1.875rem] !border !border-solid !border-cfpbBorderColor"
      >
        {children}
      </div>
  )
}

export default FieldGroup;