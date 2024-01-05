import { useQuery } from '@tanstack/react-query';
import fetchAssociatedInstitutions from 'api/fetchAssociatedInstitutions';
import useSblAuth from 'api/useSblAuth';
import { Alert, Icon, Link, List, ListItem } from 'design-system-react';
import { SubsectionWrapper } from './SubsectionWrapper';

export function ReviewInstitutions(): JSX.Element {
  const auth = useSblAuth();
  const email = auth.user?.profile.email;
  const { data: associatedInstitutions } = useQuery({
    queryKey: [`fetch-associated-institutions-${email}`, email],
    queryFn: async () => fetchAssociatedInstitutions(auth),
  });

  let institutionList = [
    <Alert
      key='loading-associations'
      status='loading'
      message='Loading associated institutions...'
    />,
  ];

  if (associatedInstitutions?.length) {
    institutionList = associatedInstitutions.map(object => (
      <ListItem key={object.lei}>
        <Icon name='approved' withBg className='green' />
        <span className='status-label'>Approved</span>
        <Link href={`/institution/${object.lei}`} type='list'>
          {object.name} | {object.lei}
        </Link>
      </ListItem>
    ));
  }
  return (
    <SubsectionWrapper>
      <h3 className='heading'>View your associated financial institutions</h3>
      <p>
        You have successfully associated the following financial institutions
        with your user profile. If you have requested to add additional
        financial institution associations, you will not be able to file for
        them until they are approved by the support staff. Once they are
        approved they will show up below.
      </p>
      <List isLinks className='institution-list'>
        {institutionList}
      </List>
    </SubsectionWrapper>
  );
}
export default ReviewInstitutions;
