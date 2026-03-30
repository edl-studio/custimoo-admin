import type { Meta, StoryObj } from '@storybook/vue3-vite'
import SidebarButton from './SidebarButton.vue'

const meta = {
  title: 'Admin/Layout/SidebarButton',
  component: SidebarButton,
  tags: ['autodocs']
} satisfies Meta<typeof SidebarButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
