import { Link } from 'components/Link';
import { Button } from 'design-system-react';
import type { ReactElement } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function GLIEF(): ReactElement {
  return (
    <Link href='https://www.gleif.org/' target='_blank'>
      GLEIF
    </Link>
  );
}

function NIC(): ReactElement {
  return (
    <Link href='https://www.ffiec.gov/NPW' target='_blank'>
      NIC
    </Link>
  );
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
  const navigate = useNavigate();
  const onClick = (): void => navigate(`/institution/${lei}/update`);

  return (
    <Button
      asLink
      className={className}
      onClick={onClick}
      label={
        isCallToAction
          ? 'Update your financial institution profile'
          : 'update your financial institution profile'
      }
    />
  );
}

UpdateInstitutionProfile.defaultProps = { isCallToAction: false };

interface UpdatePointOfContactProperties {
  // eslint-disable-next-line react/require-default-props
  label?: string;
  // eslint-disable-next-line react/require-default-props, react/no-unused-prop-types
  className?: string;
}

function UpdatePointOfContact({
  label = 'update your point of contact information',
  className = 'font-normal',
}: UpdatePointOfContactProperties): ReactElement {
  const { lei, year } = useParams();
  const navigate = useNavigate();

  const onClick = (): void => navigate(`/filing/${year}/${lei}/contact`);
  return (
    <Button className={className} asLink onClick={onClick} label={label} />
  );
}

function UploadANewFile({
  label = 'upload a new file',
  className = 'font-normal',
}: UpdatePointOfContactProperties): ReactElement {
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
  return (
    <Link href={baseUrl + sectionUrl} target='_blank'>
      {section}
    </Link>
  );
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
    <Link
      href={`mailto:SBLHelp@cfpb.gov?subject=${formattedSubject}`}
      target='_blank'
    >
      {label}
    </Link>
  );
}

export default {
  EmailSupportStaff,
  RegulationB,
  GLIEF,
  NIC,
  UpdateInstitutionProfile,
  UpdatePointOfContact,
  UploadANewFile,
};
