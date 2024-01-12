import { Heading, List } from 'design-system-react';
import type { ReactElement } from 'react';

interface SubsectionWrapperProperties {
  children: ReactElement | ReactElement[];
}

export function AdditionalResources({
  children,
  ...properties
}: SubsectionWrapperProperties): JSX.Element {
  return (
    <div className='additional-resources' {...properties}>
      <Heading type='4'>Additional resources</Heading>
      <List className='list-none pl-0' isLinks>
        {children}
      </List>
    </div>
  );
}

export default AdditionalResources;
