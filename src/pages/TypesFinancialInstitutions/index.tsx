import CrumbTrail from 'components/CrumbTrail';
import FieldGroup from 'components/FieldGroup';
import FormButtonGroup from 'components/FormButtonGroup';
import FormHeaderWrapper from 'components/FormHeaderWrapper';
import FormWrapper from 'components/FormWrapper';
import { Button, Link, TextIntroduction } from 'design-system-react';

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
        <form className='mb-[3.75rem] w-full'>
          <FieldGroup>FieldGroup</FieldGroup>
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

export default TypesFinancialInstitutions;
