import type { JSXElement } from 'design-system-react/dist/types/jsxElement';

function LabelOptional({ isOptional }: { isOptional?: boolean }): JSXElement {
  if (!isOptional) return null;
  return (
    <span style={{ color: '#43484E', fontSize: '16px', fontWeight: '400' }}>
      {' '}
      (optional)
    </span>
  );
}

LabelOptional.defaultProps = {
  isOptional: true,
};

export default LabelOptional;
