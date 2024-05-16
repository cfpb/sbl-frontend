import classnames from 'classnames';
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
      const separatorStyle = classnames(
        'mr-[10px]',
        items.length > 0 ? 'ml-[10px]' : null,
      );

      if (!child) return;

      items.push(
        <span key={separatorKeys[current]} className={separatorStyle}>
          /
        </span>,
        child,
      );
      current += INCREMENT_BY_ONE;
    });
  } else {
    items = [
      <span key={separatorKeys[current]} className='mr-[10px]'>
        /
      </span>,
      children,
    ];
  }

  return (
    <div className='u-mt45 u-mb30 max-w-[48.125rem] font-normal'>{items}</div>
  );
}

export default CrumbTrail;
