import { Heading, List } from 'design-system-react';
import type { ReactNode } from 'react';

interface SubsectionWrapperProperties {
  children: ReactNode;
}

export function AdditionalResources({
  children, 
  ...properties
}: SubsectionWrapperProperties): JSX.Element {
  return (
    <div className='additional-resources' {...properties}>
      <Heading type="5">ADDITIONAL RESOURCES</Heading>
      <List className='list-none pl-0'>
        {children}
      </List>
    </div>
  );
}

export default AdditionalResources;
