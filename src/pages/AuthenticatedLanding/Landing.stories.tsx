// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import type { Meta, StoryObj } from '@storybook/react';
import FooterCfGovWrapper from 'components/FooterCfGovWrapper';
import { PageHeader } from 'design-system-react';
import Landing from './index';

const meta: Meta<typeof Landing> = {
  title: 'Prototypes/Landing',
  component: Landing,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <>
      <PageHeader />
      <Landing />
      <FooterCfGovWrapper />
    </>
  ),
};
