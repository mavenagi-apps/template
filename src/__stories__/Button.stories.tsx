import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';

import Button from '../components/Button';

const meta = {
  title: 'Button',
  argTypes: {
    text: { control: 'text' },
    href: { control: 'text' },
  },
} satisfies Meta<typeof Button>;

export default meta;

export const defaultButton = () => <Button text="default" href="localhost" />;
