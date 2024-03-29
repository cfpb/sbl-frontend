import { useQuery } from '@tanstack/react-query';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import useSblAuth from 'api/useSblAuth';
import Head from 'components/Head';
import Uploader from 'components/Uploader';
import { Button, Grid, Alert } from 'design-system-react';
import type { ReactElement } from 'react';
import { useState } from 'react';

interface LoanApplication {
  uli: string;
  app_date: string;
  app_method: number;
  app_recipient: number;
}

const columnHelper = createColumnHelper<LoanApplication>();

const columns = [
  columnHelper.accessor('uli', {
    header: () => 'ULI',
  }),
  columnHelper.accessor('app_date', {
    header: () => 'Date',
  }),
  columnHelper.accessor('app_method', {
    header: () => 'Method',
  }),
  columnHelper.accessor('app_recipient', {
    header: () => 'Recipient',
  }),
];

export default function HomePage(): ReactElement {
  const auth = useSblAuth();
  const [loanApplications, setLoanApplications] = useState<LoanApplication[]>(
    [],
  );
  const table = useReactTable({
    data: loanApplications,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const { data: userInfo } = useQuery({
    queryKey: ['userInfo', auth.isAuthenticated],
    queryFn: async () => auth.user,
    enabled: !!auth.isAuthenticated,
  });

  return (
    <>
      <Head title='Small Business Lending' />
      <Grid.Wrapper center>
        <Grid.Row>
          <Grid.Column width={8}>
            <main id='main-content' className='my-10'>
              <h1>Small Business Lending</h1>
              <div className='u-mb20'>
                <Alert
                  message='2025-Q1 Quarterly filing period is open'
                  status='success'
                >
                  Submissions of 2025-Q1 SBL data will be accepted through May
                  2025.
                </Alert>
              </div>
              <div>
                {userInfo ? (
                  <span>Hello {userInfo.profile.email}.</span>
                ) : (
                  <p>
                    Every user is required to register online for login
                    credentials and establish an account prior to accessing the
                    SBL Platform.
                  </p>
                )}
              </div>
              <p>
                {auth.isAuthenticated ? (
                  <Button label='Log out' onClick={auth.onLogout} />
                ) : (
                  <>
                    <Button label='Log in' onClick={auth.onLogin} />
                    <Button
                      label='Register'
                      appearance='secondary'
                      onClick={auth.onLogin}
                    />
                  </>
                )}
              </p>
              {userInfo && loanApplications.length === 0 ? (
                <Uploader
                  token={auth.user?.id_token}
                  setter={setLoanApplications}
                />
              ) : undefined}
              {loanApplications.length > 0 ? (
                <table>
                  <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                      <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                          <th key={header.id}>
                            {header.isPlaceholder
                              ? undefined
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext(),
                                )}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody>
                    {table.getRowModel().rows.map(row => (
                      <tr key={row.id}>
                        {row.getVisibleCells().map(cell => (
                          <td key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : undefined}
            </main>
          </Grid.Column>
        </Grid.Row>
      </Grid.Wrapper>
    </>
  );
}
