import { Alert, List, ListItem } from 'design-system-react';
import type { FieldErrors } from 'react-hook-form';
import { Element, Link } from 'react-scroll';

import { FormFieldsHeaderError as formFieldsHeaderError } from 'types/formTypes';
import getAllProperties from 'utils/getAllProperties';
import type { FormErrorKeyType } from 'utils/getFormErrorKeyLogic';

interface FormErrorHeaderProperties {
  id: string;
  keyLogicFunc: (key: string) => FormErrorKeyType;
  errors?: FieldErrors;
}

/**
 *
 * @returns List of Schema Errors - for Step1Form
 */
function FormErrorHeader({
  errors,
  id,
  keyLogicFunc,
}: FormErrorHeaderProperties): JSX.Element | null {
  if (!errors || Object.keys(errors).length === 0) return null;

  return (
    <div className='mb-[2.8125rem] mt-[2.8125rem] w-full'>
      <Element name={id} id={id}>
        <Alert
          message='There was a problem completing your user profile'
          status='error'
        >
          <List isLinks>
            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-call */}
            {getAllProperties(errors).map((key: string): JSX.Element => {
              const { scrollKey, keyIndex, formFieldsHeaderErrorKey } =
                keyLogicFunc(key);

              return (
                <ListItem key={key}>
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <Link
                    href='#'
                    className='m-list_link'
                    to={scrollKey}
                    smooth
                    duration={300}
                    offset={-100}
                    tabIndex={0}
                  >
                    {/* ex1: 'Enter your name' */}
                    {/* ex2: 'Enter your financial institution's name (1)' */}
                    {`${
                      formFieldsHeaderError[
                        formFieldsHeaderErrorKey as keyof typeof formFieldsHeaderError
                      ] ??
                      errors[formFieldsHeaderErrorKey]?.message ??
                      errors[formFieldsHeaderErrorKey]?.root?.message ??
                      'Missing entry'
                    }${
                      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
                      typeof keyIndex === 'number' ? ` (${keyIndex + 1})` : ''
                    }`}
                  </Link>
                </ListItem>
              );
            })}
          </List>
        </Alert>
      </Element>
    </div>
  );
}

FormErrorHeader.defaultProps = {
  errors: null,
};

export default FormErrorHeader;
