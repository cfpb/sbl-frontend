function LabelOptional(): JSX.Element {
  return (
    <span className='text-base font-normal text-[#43484e]'> (optional)</span>
  );
}

LabelOptional.defaultProps = {
  isOptional: true,
};

export default LabelOptional;
