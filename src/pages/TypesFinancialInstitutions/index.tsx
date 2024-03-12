import CrumbTrail from 'components/CrumbTrail';
import FieldGroup from 'components/FieldGroup';
import Form from 'components/Form';
import FormButtonGroup from 'components/FormButtonGroup';
import FormHeaderWrapper from 'components/FormHeaderWrapper';
import FormWrapper from 'components/FormWrapper';
import InputEntry from 'components/InputEntry';
import {
  Button,
  Checkbox,
  Heading,
  Link,
  List,
  ListItem,
  TextIntroduction,
} from 'design-system-react';
import type { CheckboxOption } from 'pages/Filing/UpdateFinancialProfile/types';
import { checkboxOptions } from 'pages/Filing/UpdateFinancialProfile/types';
import { register } from 'react-scroll/modules/mixins/scroller';
import { Zero } from 'utils/constants';

function TypesFinancialInstitutions(): JSX.Element {
  return (
    <FormWrapper>
      <div id='types-financial-institutions'>
        <FormHeaderWrapper>
          <CrumbTrail>
            <Link href='/'>Filing Home</Link>
          </CrumbTrail>
          <TextIntroduction
            heading='Provide your type of financial institution'
            subheading='Select all applicable options that describe your financial institution. If you wish to provide additional types of financial institutions please add them to “Other” and check the box.'
            description={
              <>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation.
              </>
            }
          />
        </FormHeaderWrapper>
        {/* TODO: Create a Form component where all form elements use the following classes */}
        <Form>
          <FieldGroup>
            <Heading type='4'>Types of financial institutions</Heading>
            <List isUnstyled>
              {checkboxOptions.map((option: CheckboxOption): JSX.Element => {
                const optionId = `sbl_institution_types.${option.id}`;

                const onCheckboxChange = (
                  event: React.ChangeEvent<HTMLInputElement>,
                ): void => {
                  setValue(optionId, event.target.checked);
                };

                return (
                  <ListItem key={option.id}>
                    <FormController
                      render={({ field }) => {
                        return (
                          <Checkbox
                            id={option.id}
                            label={option.label}
                            {...register(optionId)}
                            checked={field.value}
                            onChange={onCheckboxChange}
                          />
                        );
                      }}
                      control={control}
                      name={optionId}
                    />
                  </ListItem>
                );
              })}
            </List>
            <InputEntry
              label=''
              id='institutionTypeOther'
              {...register('sbl_institution_types_other', {
                value:
                  typeof typeOtherData === 'string' || !typeOtherData
                    ? ''
                    : typeOtherData.details,
              })}
              errorMessage={formErrors[Zero]}
              showError
            />
          </FieldGroup>
          <FormButtonGroup>
            <Button
              appearance='primary'
              // onClick={() => {}}
              label='Save and continue'
              aria-label='Save and continue'
              size='default'
              type='button'
            />
            <Button
              label='Clear form'
              // onClick={() => {}}
              appearance='warning'
              asLink
            />
          </FormButtonGroup>
        </Form>
      </div>
    </FormWrapper>
  );
}

export default TypesFinancialInstitutions;
