import type { ReactElement } from 'react';
import { useEffect } from 'react';

interface Properties {
  title: string;
}
export default function Head({ title }: Properties): ReactElement | null {
  useEffect(() => {
    document.title = title;
  }, [title]);

  // eslint-disable-next-line unicorn/no-null
  return null;
}
