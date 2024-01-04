import { useQuery } from '@tanstack/react-query';
import fetchAssociatedInstitutions from 'api/fetchAssociatedInstitutions';
import useSblAuth from 'api/useSblAuth';
import { Icon, Link, List, ListItem } from 'design-system-react';
import { SubsectionWrapper } from './SubsectionWrapper';

export function ReviewInstitutions(): JSX.Element {
  const auth = useSblAuth();
  const email = auth.user?.profile.email;
  const { data: associatedInstitutions } = useQuery({
    queryKey:  [`fetch-associated-institutions-${email}`, email],
    queryFn: async () => fetchAssociatedInstitutions(auth),
  });
  return (
    <SubsectionWrapper>
      <h3 className='heading'>Review financial institution details</h3>
      <p>
        You are able to file data for the financial institutions that have been
        verified. Pending selections will be reviewed by our technical help
        team. You will not be able to file for those institutions until the
        associations are approved. Please allow 24-48 hours for response time
        during normal business hours.
      </p>
      <List isLinks className='institution-list'>
        {associatedInstitutions?.map(object => (
            <ListItem key={object.lei}>
                <Icon name='approved' withBg className='green' />
                <span className='status-label'>Approved</span>
                {/* TODO - Link to the "View Institution details" page */}
                <Link href={`/institution/${object.lei}`} type='list'>
                  {object.name} | {object.lei}
                </Link>
              </ListItem>
          ))}
      </List>
    </SubsectionWrapper>
  );
}
export default ReviewInstitutions;
