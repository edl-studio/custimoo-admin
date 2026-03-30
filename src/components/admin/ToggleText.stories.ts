import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ToggleText from './ToggleText.vue'

const meta = {
  title: 'Admin/Controls/ToggleText',
  component: ToggleText,
  tags: ['autodocs']
} satisfies Meta<typeof ToggleText>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Include columns'
  }
}

export const Checked: Story = {
  args: {
    label: 'Include filters',
    defaultValue: true
  }
}
