import type { Meta, StoryObj } from '@storybook/vue3-vite'
import CellComments from './CellComments.vue'

const meta = {
  title: 'Admin/Data Type/CellComments',
  component: CellComments,
  tags: ['autodocs']
} satisfies Meta<typeof CellComments>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { count: 3 }
}

export const Empty: Story = {
  args: { count: 0 }
}

export const HighCount: Story = {
  args: { count: 42 }
}

export const AllStates: Story = {
  args: { count: 0 },
  render: () => ({
    components: { CellComments },
    template: `
      <div class="flex items-center gap-6">
        <CellComments :count="0" />
        <CellComments :count="1" />
        <CellComments :count="5" />
        <CellComments :count="42" />
      </div>
    `
  })
}
