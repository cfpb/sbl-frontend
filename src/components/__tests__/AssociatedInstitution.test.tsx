import { render, screen } from '@testing-library/react';
import AssociatedInstitution from 'components/AssociatedInstitution';
import { AuthProvider } from 'react-oidc-context';
import { MemoryRouter } from 'react-router-dom';
import type { InstitutionDetailsApiType } from 'types/formTypes';
import { formatPipeSeparatedString } from 'utils/formatting';
import { generateInstitutionData } from '../../../e2e/utils/createInstitution';

const mockInstitutionApiResponse = (): InstitutionDetailsApiType => {
  const adminToken = 'N/A';
  const testInstitutionName = 'SBL Test Bank 5522';
  const testLei = 'TESTBANK000000005522';
  const testTaxId = 'testTaxId';
  const testRssdId = 'testRssdId';

  const institutionData = generateInstitutionData({
    adminToken,
    testInstitutionName,
    testLei,
    testTaxId,
    testRssdId,
  });

  return {
    ...institutionData,
    hmda_institution_type_id: {
      name: 'HMDA TYPE 22',
      id: '22',
    },
    lei_status: {
      name: institutionData.name,
      code: 'test',
      can_file: true,
    },
    primary_federal_regulator: {
      name: 'Primary Federal Regulator',
      id: 'PrimeFedReg01',
    },
    sbl_institution_types: [],
    hq_address_state: { name: 'State', code: 'ST' },
    domains: [],
  };
};

describe('<AssociatedInstitution />', () => {
  it('Renders with Name and LEI provided', async () => {
    const institutionData = mockInstitutionApiResponse();

    const expectedText = formatPipeSeparatedString([
      institutionData.name,
      institutionData.lei,
    ]);

    const expectedLink = `/institution/${institutionData.lei}`;
    const expectedLinkName = `${institutionData.name} | ${institutionData.lei}`;

    render(
      <AuthProvider>
        <MemoryRouter>
          <AssociatedInstitution {...institutionData} />,
        </MemoryRouter>
      </AuthProvider>,
    );

    expect(
      screen.getByText(expectedText, {
        collapseWhitespace: false, // Preserve our double-spaced separator
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('link', {
        name: expectedLinkName,
      }),
    ).toHaveAttribute('href', expectedLink);
  });

  it('Contact support about missing details', async () => {
    const institutionData = mockInstitutionApiResponse();

    const expectedText =
      'Missing institution details, email our support staff.';

    const expectedLink =
      'mailto:SBLHelp@cfpb.gov?subject=[BETA] Associated institutions: Missing "Name" or "LEI"';

    render(
      <AuthProvider>
        <MemoryRouter>
          <AssociatedInstitution {...institutionData} lei={undefined} />,
        </MemoryRouter>
      </AuthProvider>,
    );

    expect(
      screen.getByText(expectedText, {
        collapseWhitespace: false, // Preserve our double-spaced separator
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('link', {
        name: expectedText,
      }),
    ).toHaveAttribute('href', expectedLink);
  });
});
