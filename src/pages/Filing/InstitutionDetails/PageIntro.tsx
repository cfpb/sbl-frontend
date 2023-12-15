import { Link, TextIntroduction } from 'design-system-react';

export function PageIntro(): JSX.Element {
  return (
    <TextIntroduction
      heading='View financial institution details'
      subheading='This reflects the most current information available to the CFPB for your financial institution. We pull data from sources such as GLEIF (Global Legal Entity Identifier Foundation), the National Information Center (NIC), and direct requests to our support staff.'
      description={
        <>
          Changes to your financial institution details are managed by our
          support staff. Requests take approximately 24-48 hours to be
          processed.
        </>
      }
      callToAction={
        <Link href='/#'>Update your financial institution profile</Link>
      }
    />
  );
}

export default PageIntro;
