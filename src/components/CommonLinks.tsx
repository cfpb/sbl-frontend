import { Link } from 'components/Link';
import { Button } from 'design-system-react';
import type { ComponentProps, ReactElement } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function GLIEF(arguments_: ComponentProps<typeof Link>): ReactElement {
  return (
    <Link href='https://www.gleif.org/' {...arguments_}>
      GLEIF
    </Link>
  );
}

function GetAnLEI(): ReactElement {
  return (
    <Link href='https://www.gleif.org/en/about-lei/get-an-lei-find-lei-issuing-organizations'>
      GLEIF
    </Link>
  );
}

function NIC(): ReactElement {
  return <Link href='https://www.ffiec.gov/NPW'>NIC</Link>;
}

interface UpdateInstitutionProfileProperties {
  isCallToAction?: boolean;
  // eslint-disable-next-line react/require-default-props
  className?: string;
}

function UpdateInstitutionProfile({
  isCallToAction,
  className = 'font-normal',
}: UpdateInstitutionProfileProperties): ReactElement {
  const { lei } = useParams();

  return (
    <Link href={`/institution/${lei}/update`} className={className}>
      {isCallToAction
        ? 'Update your financial institution profile'
        : 'update your financial institution profile'}
    </Link>
  );
}

UpdateInstitutionProfile.defaultProps = { isCallToAction: false };

interface UpdateFilingDetailsProperties {
  // eslint-disable-next-line react/require-default-props
  label?: string;
  // eslint-disable-next-line react/require-default-props, react/no-unused-prop-types
  className?: string;
}

function UpdateFilingDetails({
  label = 'update your filing details',
  className = 'font-normal',
}: UpdateFilingDetailsProperties): ReactElement {
  const { lei, year } = useParams();
  const navigate = useNavigate();

  const onClick = (): void => navigate(`/filing/${year}/${lei}/details`);
  return (
    <Button className={className} asLink onClick={onClick} label={label} />
  );
}

function UploadANewFile({
  label = 'upload a new file',
  className = 'font-normal',
}: UpdateFilingDetailsProperties): ReactElement {
  const { lei, year } = useParams();
  const navigate = useNavigate();

  const onClick = (): void => navigate(`/filing/${year}/${lei}/upload`);
  return (
    <Button className={className} asLink onClick={onClick} label={label} />
  );
}

const RegulationBSectionUrls = {
  '§ 1002.109(a)(1)(ii)': '/1002/109/#a-1-ii',
  '§ 1002.109(b)(10)': '/1002/109/#b-10',
  '§ 1002.109(b)(3)': '/1002/109/#b-3',
  '§ 1002.109(b)(9)': '/1002/109/#b-9',
} as const;

export type RegulationBSectionUrlsKey = keyof typeof RegulationBSectionUrls;
export type RegulationBSectionUrlsValues =
  (typeof RegulationBSectionUrls)[RegulationBSectionUrlsKey];

function RegulationB({
  section,
}: {
  section: RegulationBSectionUrlsKey;
}): JSX.Element {
  const baseUrl = 'https://www.consumerfinance.gov/rules-policy/regulations';
  const sectionUrl = RegulationBSectionUrls[
    section
  ] satisfies RegulationBSectionUrlsValues;
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!sectionUrl) return section as unknown as JSX.Element;
  return <Link href={baseUrl + sectionUrl}>{section}</Link>;
}

function EmailSupportStaff({
  subject,
  isBeta = true,
  label = 'email our support staff',
}: {
  subject: string;
  // eslint-disable-next-line react/require-default-props
  isBeta?: boolean;
  // eslint-disable-next-line react/require-default-props
  label?: string;
}): ReactElement {
  const formattedSubject = (isBeta ? '[BETA] ' : '') + subject;

  return (
    <Link href={`mailto:SBLHelp@cfpb.gov?subject=${formattedSubject}`}>
      {label}
    </Link>
  );
}

function FederalReserveBoard(): ReactElement {
  return (
    <Link href='https://www.federalreserve.gov/apps/reportingforms/Report/Index/FR_Y-10'>
      Federal Reserve Board
    </Link>
  );
}

export default {
  EmailSupportStaff,
  FederalReserveBoard,
  RegulationB,
  GLIEF,
  GetAnLEI,
  NIC,
  UpdateInstitutionProfile,
  UpdateFilingDetails,
  UploadANewFile,
};
