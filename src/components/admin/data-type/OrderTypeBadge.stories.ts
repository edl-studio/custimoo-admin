import type { Meta, StoryObj } from '@storybook/vue3-vite'
import OrderTypeBadge from './OrderTypeBadge.vue'

const meta = {
  title: 'Admin/Data Type/OrderTypeBadge',
  component: OrderTypeBadge,
  tags: ['autodocs']
} satisfies Meta<typeof OrderTypeBadge>

export default meta
type Story = StoryObj<typeof meta>

export const Split: Story = {
  args: { type: 'split' }
}

export const Reorder: Story = {
  args: { type: 'reorder' }
}

export const Sample: Story = {
  args: { type: 'sample' }
}

export const Manual: Story = {
  args: { type: 'manual' }
}

export const Remake: Story = {
  args: { type: 'remake' }
}

export const AllTypes: Story = {
  args: { type: 'split' },
  render: () => ({
    components: { OrderTypeBadge },
    template: `
      <div class="flex gap-2 items-center">
        <OrderTypeBadge type="split" />
        <OrderTypeBadge type="reorder" />
        <OrderTypeBadge type="sample" />
        <OrderTypeBadge type="manual" />
        <OrderTypeBadge type="remake" />
      </div>
    `
  })
}
