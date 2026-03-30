import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { RotateCcw, Columns2, Trash2 } from 'lucide-vue-next'
import PopoverMenuItem from './PopoverMenuItem.vue'

const meta = {
  title: 'Admin/Controls/PopoverMenuItem',
  component: PopoverMenuItem,
  tags: ['autodocs'],
  decorators: [
    () => ({
      template: '<div class="w-52 rounded-lg border border-border bg-card p-1"><story /></div>'
    })
  ]
} satisfies Meta<typeof PopoverMenuItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { label: 'Priority' }
}

export const WithIcon: Story = {
  args: { label: 'Columns', icon: Columns2 }
}

export const Draggable: Story = {
  args: { label: 'Merchant', draggable: true }
}

export const WithCheckbox: Story = {
  args: { label: 'Customer', checked: true, draggable: true }
}

export const Unchecked: Story = {
  args: { label: 'Quantity', checked: false, draggable: true }
}

export const Destructive: Story = {
  args: { label: 'Delete view', icon: Trash2, variant: 'destructive' }
}

export const RestoreDefault: Story = {
  args: { label: 'Restore default', icon: RotateCcw }
}
