import CFPBLogo from '../assets/cfpb-logo.png';

export default function CfpbLogo(): JSX.Element {
  return (
    <a
      href='/'
      title='Home'
      aria-label='Home'
      style={{ display: 'inline-block' }}
    >
      <img height='50px' src={CFPBLogo} alt='CFPB Logo' />
    </a>
  );
}
