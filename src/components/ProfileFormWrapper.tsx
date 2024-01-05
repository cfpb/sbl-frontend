import type { ReactNode } from 'react';

interface Properties {
  children: ReactNode;
}

function ProfileFormWrapper({ children }: Properties): JSX.Element {
  return (
    <div className='ml-5 mr-5 mt-[45px]'>
      <div className='mx-auto mb-12 max-w-[1200px]'>
        <div className='mx-auto max-w-[770px]'>{children}</div>
      </div>
    </div>
  );
}

export default ProfileFormWrapper;
