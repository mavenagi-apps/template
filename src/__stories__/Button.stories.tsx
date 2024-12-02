import type { Meta } from '@storybook/react';

import Button from '../components/Button';

const meta = {
  title: 'Button',
  argTypes: {
    text: { control: 'text' },
    href: { control: 'text' },
  },
} satisfies Meta<typeof Button>;

export default meta;

export const DefaultButton = () => <Button text="default" href="localhost" />;
