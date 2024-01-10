import type { ReactNode } from 'react';

interface RenderWhenProperties {
  condition: boolean;
  children: ReactNode;
}

function RenderWhen({
  condition,
  children,
}: RenderWhenProperties): JSX.Element {
  return condition ? { children } : null;
}

export default RenderWhen;
