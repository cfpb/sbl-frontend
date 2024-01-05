import Links from 'components/CommonLinks';
import { TextIntroduction } from 'design-system-react';

export function PageIntro(): JSX.Element {
  return (
    <TextIntroduction
      heading='View your financial institution profile'
      subheading='The following reflects the most current information available to the CFPB for your financial institution. We pull data from sources such as GLEIF (Global Legal Entity Identifier Foundation), the National Information Center (NIC), and direct requests to our support staff.'
      description={
        <>
          Most changes to financial institution profile details must be handled
          at the source (GLEIF and NIC). For all other changes please submit the
          following form to our support staff.
        </>
      }
      callToAction={<Links.UpdateInstitutionProfile isCallToAction />}
    />
  );
}

export default PageIntro;
