// Rule disabling should be removed after cypress visual diff tests are enabled, see:
// https://github.com/cfpb/sbl-frontend/issues/176
/* eslint-disable simple-import-sort/imports */

import { Button, Label, Link, TextInput } from 'design-system-react';

import './MailingListSignup.less';

export function MailingListSignup(): JSX.Element {
  return (
    <div className='mailing-list-signup'>
      <h3 className='heading'>Get updates</h3>
      <p>
        Sign up for updates about regulatory compliance resources or guidance
        specific to small business lending.
      </p>
      <Label htmlFor='mail-list-signup'>Email address</Label>
      <TextInput
        id='mail-list-signup'
        name='mail-list-signup'
        placeholder='mail@example.com'
        width='full'
      />
      <div className='actions'>
        <Button label='Sign up' />
        <Link type='list' href='/#'>
          See Privacy Act Statement
        </Link>
      </div>
    </div>
  );
}
export default MailingListSignup;
