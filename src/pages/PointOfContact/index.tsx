import FieldGroup from 'components/FieldGroup';
import FormButtonGroup from 'components/FormButtonGroup';
import FormHeaderWrapper from 'components/FormHeaderWrapper';
import FormWrapper from 'components/FormWrapper';
import InputEntry from 'components/InputEntry';
import SectionIntro from 'components/SectionIntro';
import { Button, Select, TextIntroduction } from 'design-system-react';

import statesObject from './states.json';

function PointOfContact(): JSX.Element {
  return (
    <FormWrapper>
      <div id='point-of-contact'>
        <FormHeaderWrapper crumbTrailMarginTop={false}>
          <TextIntroduction
            heading='Provide the point of contact'
            subheading='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.'
            description={
              <>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation.
              </>
            }
          />
        </FormHeaderWrapper>

        <div className='mb-[1.875rem]'>
          <SectionIntro heading='Provide the point of contact for your submission'>
            Enter the name and business contact information of a person who may
            be contacted by the Bureau or other regulators with questions about
            your financial institution&apos;s submission.
          </SectionIntro>
        </div>

        <form className='mb-[3.75rem] w-full'>
          <FieldGroup>
            <InputEntry label='First name' id='firstName' />
            <InputEntry label='Last name' id='lastName' />
            <InputEntry label='Phone number' id='phoneNumber' />
            <InputEntry label='Email address' id='email' />
            <InputEntry
              label='Street address line 1'
              id='street_address_line_1'
            />
            <InputEntry
              label='Street address line 2'
              id='street_address_line_2'
              isOptional
            />
            <InputEntry label='City' id='city' />
            <div className='flex gap-[1.875rem]'>
              <div className='flex-1'>
                <Select
                  id='state'
                  label='State'
                  onChange={selected => {
                    console.log('selected', selected);
                  }}
                  options={[
                    { label: '-- select an option --', value: '' },
                    ...statesObject.states,
                  ]}
                />
              </div>
              <InputEntry className='flex-1' label='ZIP code' id='zip' />
            </div>
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
        </form>
      </div>
    </FormWrapper>
  );
}

export default PointOfContact;
