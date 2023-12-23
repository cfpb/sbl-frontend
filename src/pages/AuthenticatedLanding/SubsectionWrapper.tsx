import type { ReactNode } from 'react';

interface SubsectionWrapperProperties {
  children: ReactNode | ReactNode[] | null;
}
export function SubsectionWrapper({
  children,
  ...properties
}: SubsectionWrapperProperties): JSX.Element {
  return (
    <div {...properties} className='subsection-wrapper'>
      <div className='left-padded'>{children}</div>
    </div>
  );
}

export default SubsectionWrapper;
