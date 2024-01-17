import type { ReactNode } from 'react';

interface Properties {
  children: ReactNode;
}

function ProfileFormWrapper({ children }: Properties): JSX.Element {
  return (
    <div className='ml-5 mr-5 mt-[2.813rem]'>
      <div className='mx-auto mb-12 max-w-[75rem]'>
        <div className='mx-auto max-w-[48.125rem]'>{children}</div>
      </div>
    </div>
  );
}

export default ProfileFormWrapper;
