import { zodResolver } from '@hookform/resolvers/zod';
import CrumbTrail from 'components/CrumbTrail';
import FormButtonGroup from 'components/FormButtonGroup';
import FormHeaderWrapper from 'components/FormHeaderWrapper';
import FormMain from 'components/FormMain';
import FormWrapper from 'components/FormWrapper';
import { Button, Link, TextIntroduction } from 'design-system-react';
import TypesFinancialInstitutionSection from 'pages/Filing/UpdateFinancialProfile/TypesFinancialInstitutionSection';
import type { UFPSchema } from 'pages/Filing/UpdateFinancialProfile/types';
import { ufpSchema } from 'pages/Filing/UpdateFinancialProfile/types';
import { useForm } from 'react-hook-form';

function TypesFinancialInstitutions(): JSX.Element {
  const {
    register,
    control,
    setValue,
    formState: { errors: formErrors },
  } = useForm<UFPSchema>({
    resolver: zodResolver(ufpSchema),
    // defaultValues,
  });
  return (
    <FormWrapper>
      <div id='types-financial-institutions'>
        <FormHeaderWrapper>
          <CrumbTrail>
            <Link href='/'>Filing Home</Link>
          </CrumbTrail>
          <TextIntroduction
            heading='Provide your type(s) of financial institution'
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
        <FormMain>
          <TypesFinancialInstitutionSection
            {...{
              register,
              control,
              setValue,
              formErrors,
            }}
          />
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
        </FormMain>
      </div>
    </FormWrapper>
  );
}

export default TypesFinancialInstitutions;
