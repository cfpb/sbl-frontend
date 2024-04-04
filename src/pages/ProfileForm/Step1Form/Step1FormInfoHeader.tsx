import SectionIntro from 'components/SectionIntro';

function Step1FormInfoHeader(): JSX.Element {
  return (
    <SectionIntro heading='Provide your identifying information'>
      Type your first and last name in the fields below. Your email address is
      automatically populated from Login.gov.
    </SectionIntro>
  );
}

export default Step1FormInfoHeader;
