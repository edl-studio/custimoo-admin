import type { Meta, StoryObj } from '@storybook/vue3-vite'
import AdminTooltip from './AdminTooltip.vue'
import { Button } from '@/components/ui/button'

const meta = {
  title: 'Admin/Controls/AdminTooltip',
  component: AdminTooltip,
  tags: ['autodocs'],
  decorators: [
    () => ({
      template: '<div class="flex items-center justify-center p-16"><story /></div>'
    })
  ]
} satisfies Meta<typeof AdminTooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'This is a tooltip'
  },
  render: args => ({
    components: { AdminTooltip, Button },
    setup: () => ({ args }),
    template: `
      <AdminTooltip v-bind="args">
        <Button variant="outline">Hover me</Button>
      </AdminTooltip>
    `
  })
}
