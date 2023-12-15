import type { ReactNode } from 'react';
import { Children } from 'react';

const SINGLE_CHILD = 1;

interface CrumbTrailProperties {
  children: ReactNode | ReactNode[];
}

function CrumbTrail({ children }: CrumbTrailProperties): JSX.Element {
  let items: ReactNode[] = [];

  if (!children) return undefined;

  if (Children.count(children) > SINGLE_CHILD) {
    Children.forEach(children, child => {
      items.push(<> / </>, child);
    });
  } else {
    items = [<> / </>, children];
  }

  return <div className='mb-5 font-normal'>{items}</div>;
}

export default CrumbTrail;
