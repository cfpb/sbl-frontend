/* eslint-disable react/require-default-props */
import { List } from 'design-system-react';
import type { JSXElement } from 'design-system-react/dist/types/jsxElement';
import type { ReactElement } from 'react';
import type { InstitutionDetailsApiType } from 'types/formTypes';
import { AssociatedInstitution } from './AssociatedInstitution';

function AssociatedInstitutionList({
  institutions,
  className = '',
  children,
}: {
  institutions?: InstitutionDetailsApiType[] | undefined;
  className?: string;
  children?: (JSX.Element | ReactElement)[] | JSX.Element | ReactElement;
}): JSXElement {
  if (children)
    return (
      <List isLinks className={`institution-list ${className}`}>
        {children}
      </List>
    );

  if (!institutions || institutions.length === 0) return null;

  return (
    <List isLinks className={`institution-list ${className}`}>
      {institutions.map(object => {
        return <AssociatedInstitution {...object} key={object.lei} />;
      })}
    </List>
  );
}

export default AssociatedInstitutionList;
