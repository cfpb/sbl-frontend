import { Link } from 'design-system-react';

export function AdditionalResources(): JSX.Element {
  return (
    <div className='additional-resources'>
      <h5 className='heading'>ADDITIONAL RESOURCES</h5>
      <ul className='list-none'>
        <li>
          <Link href={`/landing?${Date.now().toString()}`}>Link 1</Link>
        </li>
        <li>
          <Link href={`/landing?${Date.now().toString()}`}>Link 2</Link>
        </li>
        <li>
          <Link href={`/landing?${Date.now().toString()}`}>Link 3</Link>
        </li>
      </ul>
    </div>
  );
}

export default AdditionalResources;
