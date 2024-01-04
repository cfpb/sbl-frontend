import type { ReactNode } from 'react';
import { Children } from 'react';

const SINGLE_CHILD = 1;

interface CrumbTrailProperties {
  children: ReactNode | ReactNode[];
}

const length = 10;
const separatorKeys = Array.from({ length }).map((_, index) => `key-${index}`);
const INCREMENT_BY_ONE = 1;

function CrumbTrail({ children }: CrumbTrailProperties): JSX.Element | null {
  let items: ReactNode[] = [];

  // eslint-disable-next-line unicorn/no-null
  if (!children) return null;

  let current = 0;
  if (Children.count(children) > SINGLE_CHILD) {
    Children.forEach(children, child => {
      items.push(<span key={separatorKeys[current]}> / </span>, child);
      current += INCREMENT_BY_ONE;
    });
  } else {
    items = [<span key={separatorKeys[current]}> / </span>, children];
  }

  return <div className='mb-5 font-normal'>{items}</div>;
}

export default CrumbTrail;
