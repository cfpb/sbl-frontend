import { useQuery } from '@tanstack/react-query';
import { fetchAssociatedInstitutions, fetchUserProfile } from 'api/requests';
import { Link } from 'components/Link';
import { LoadingContent } from 'components/Loading';
import { Grid, Paragraph, TextIntroduction } from 'design-system-react';
import { useError500 } from 'pages/Error/Error500';
import useSblAuth from '../../../api/useSblAuth';
import CrumbTrail from '../../../components/CrumbTrail';
import AssociatedInstitutions from './AssociatedInstitutions';
import UserInformation from './UserInformation';

export default function ViewUserProfile(): JSX.Element | null {
  const redirect500 = useError500();
  const auth = useSblAuth();
  const emailAddress = auth.user?.profile.email;

  // TODO: investigate creating a wrapper for some of these react queries to use between pages, see:
  // https://github.com/cfpb/sbl-frontend/issues/142
  const {
    isError: isFetchUserProfileError,
    isLoading: isFetchUserProfileLoading,
    data: UserProfile,
  } = useQuery({
    queryKey: ['fetch-user-profile', emailAddress],
    queryFn: async () => fetchUserProfile(auth),
    enabled: !!auth.isAuthenticated,
  });

  const {
    isError: isFetchAssociatedInstitutionsError,
    isLoading: isFetchAssociatedInstitutionsLoading,
    data: associatedInstitutions,
  } = useQuery({
    queryKey: ['fetch-associated-institutions', emailAddress],
    queryFn: async () => fetchAssociatedInstitutions(auth),
  });

  if (isFetchUserProfileLoading || isFetchAssociatedInstitutionsLoading)
    return <LoadingContent />;

  if (isFetchUserProfileError)
    return redirect500({
      message: 'Unable to fetch User Profile',
    });

  if (isFetchAssociatedInstitutionsError)
    return redirect500({
      message: 'Unable to fetch Associated Institutions',
    });

  return (
    <Grid.Wrapper center>
      <Grid.Row>
        <Grid.Column width={8}>
          <main
            id='main'
            className='mb-[2.813rem] ml-[0.9375rem] mr-[0.9375rem] mt-[1.875rem]'
          >
            <CrumbTrail>
              <Link href='/landing' key='home'>
                Home
              </Link>
            </CrumbTrail>
            <TextIntroduction
              heading='View your user profile'
              subheading='This profile reflects the information we have on file for you, including your first and last name, email address, and associated financial institutions.'
              description={
                // TODO: replace this generic SBL Help link with a specific Salesforce form link, see:
                // https://github.com/cfpb/sbl-frontend/issues/109
                <Paragraph>
                  To request an update to your name or associated financial
                  institutions,{' '}
                  <Link href='mailto:SBLHelp@cfpb.gov?subject=[BETA] View your user profile: Update my user profile'>
                    email our support staff
                  </Link>
                  . Please allow 24-48 hours for a response during normal
                  business hours.
                </Paragraph>
              }
            />
            <UserInformation data={UserProfile} />
            <AssociatedInstitutions data={associatedInstitutions} />
          </main>
        </Grid.Column>
      </Grid.Row>
    </Grid.Wrapper>
  );
}
