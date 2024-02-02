import { useQuery } from '@tanstack/react-query';
import fetchAssociatedInstitutions from 'api/fetchAssociatedInstitutions';
import fetchUserProfile from 'api/fetchUserProfile';
import { Link, ListLink } from 'components/Link';
import { LoadingContent } from 'components/Loading';
import { Grid, List, TextIntroduction } from 'design-system-react';
import { useError500 } from 'pages/Error/Error500';
import { completeYourUserProfile } from 'utils/common';
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
    queryKey: [`fetch-user-profile-${emailAddress}`, emailAddress],
    queryFn: async () => fetchUserProfile(auth),
    enabled: !!auth.isAuthenticated,
  });

  const {
    isError: isFetchAssociatedInstitutionsError,
    isLoading: isFetchAssociatedInstitutionsLoading,
    data: associatedInstitutions,
  } = useQuery({
    queryKey: [`fetch-associated-institutions-${emailAddress}`, emailAddress],
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
          <main id='main-content' className='mb-[2.813rem] mt-[1.875rem]'>
            <CrumbTrail>
              <Link href='/landing' key='home'>
                Platform home
              </Link>
            </CrumbTrail>
            <TextIntroduction
              heading='View your user profile'
              subheading='This profile reflects the user information we have on file for you. Change requests are managed by our support staff and take approximately 24-48 hours to be processed.'
              // TODO: replace this generic SBL Help link with a specific Salesforce form link, see:
              // https://github.com/cfpb/sbl-frontend/issues/109
              callToAction={
                <List isLinks>
                  <ListLink href={completeYourUserProfile}>
                    Update your user profile
                  </ListLink>
                </List>
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
