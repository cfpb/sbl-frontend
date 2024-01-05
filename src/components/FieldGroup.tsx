interface FieldGroupProperties {
  children: ReactNode;
}

function FieldGroup({ children }: FieldGroupProperties): JSX.Element {
  return (
    <div className='!border !border-solid !border-cfpbBorderColor bg-[#F7F8F9] p-[30px]'>
      {children}
    </div>
  );
}

export default FieldGroup;
