import { useQuery } from '@tanstack/react-query';
import fetchAssociatedInstitutions from 'api/fetchAssociatedInstitutions';
import useSblAuth from 'api/useSblAuth';
import {
  Alert,
  Heading,
  Icon,
  Link,
  List,
  ListItem,
  Paragraph,
} from 'design-system-react';

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
      <Heading type='3' className='heading'>
        View your associated financial institutions
      </Heading>
      <Paragraph>
        Your user profile has been successfully associated with the following
        financial institutions. Additional associations will not appear below
        until they are approved. You will not be able to file for additional
        financial institutions until those associations are approved.
      </Paragraph>
      <List isLinks className='institution-list'>
        {institutionList}
      </List>
    </SubsectionWrapper>
  );
}
export default ReviewInstitutions;
