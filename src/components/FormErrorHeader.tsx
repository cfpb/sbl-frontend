import { Alert, List, ListItem } from 'design-system-react';
import type { FieldErrors } from 'react-hook-form';
import { Element, Link } from 'react-scroll';

import { FormFieldsHeaderError as formFieldsHeaderError } from 'types/formTypes';
import { formDelimiter } from 'utils/common';
import getAllProperties from 'utils/getAllProperties';

interface FormErrorHeaderProperties {
  id: string;
  errors?: FieldErrors;
}

const LAST_ITEM = -1;
const SECOND_TO_LAST_ITEM = -2;

/**
 *
 * @returns List of Schema Errors - for Step1Form
 */
function FormErrorHeader({
  errors,
  id,
}: FormErrorHeaderProperties): JSX.Element | null {
  if (!errors || Object.keys(errors).length === 0) return null;

  // eslint-disable-next-line no-console
  // console.log('formErrors:', errors);

  return (
    <div className='mb-[2.8125rem] mt-[2.8125rem] w-full'>
      <Element name={id} id={id}>
        <Alert
          message='There was a problem completing your profile'
          status='error'
        >
          <List isLinks>
            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-call */}
            {getAllProperties(errors).map((key: string): JSX.Element => {
              const keySplit = key.split(formDelimiter);

              // Elements checked via zod.refine can have weird key structure
              // i.e. sbl_institution_types-root
              const alternateKey = keySplit.includes('root')
                ? keySplit[0]
                : null;

              const keyUsed = alternateKey ?? keySplit.at(LAST_ITEM);

              const keyIndex =
                alternateKey ??
                (keySplit.at(SECOND_TO_LAST_ITEM)
                  ? Number(keySplit.at(SECOND_TO_LAST_ITEM))
                  : null);

              return (
                <ListItem key={key}>
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <Link
                    href='#'
                    className='m-list_link'
                    to={keyUsed ?? key}
                    smooth
                    duration={300}
                    offset={-100}
                    tabIndex={0}
                  >
                    {/* ex1: 'Enter your name' */}
                    {/* ex2: 'Enter your financial institution's name (1)' */}
                    {`${
                      formFieldsHeaderError[
                        keyUsed as keyof typeof formFieldsHeaderError
                      ] ??
                      errors[keyUsed]?.message ??
                      errors[keyUsed]?.root?.message ??
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
