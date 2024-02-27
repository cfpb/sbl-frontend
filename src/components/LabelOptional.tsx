import type { JSXElement } from 'design-system-react/dist/types/jsxElement';

function LabelOptional({ isOptional }: { isOptional?: boolean }): JSXElement {
  if (!isOptional) return null;
  return (
    <span className='text-[#43484e] text-base font-normal'>
      {' '}
      (optional)
    </span>
  );
}

LabelOptional.defaultProps = {
  isOptional: true,
};

export default LabelOptional;
