import type { Meta, StoryObj } from '@storybook/vue3-vite'
import CellOrderNumber from './CellOrderNumber.vue'

const meta = {
  title: 'Admin/Data Type/CellOrderNumber',
  component: CellOrderNumber,
  tags: ['autodocs'],
  decorators: [
    () => ({
      template: '<div class="w-[200px]"><story /></div>'
    })
  ]
} satisfies Meta<typeof CellOrderNumber>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { value: '18530' }
}

export const LongNumber: Story = {
  args: { value: '1853042' }
}
