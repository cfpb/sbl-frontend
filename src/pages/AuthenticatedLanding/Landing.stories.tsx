import type { Meta, StoryObj } from '@storybook/react';
import { FooterCfGov, PageHeader } from 'design-system-react';
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
      <FooterCfGov />
    </>
  ),
};
