import type { Meta, StoryObj } from '@storybook/vue3-vite'
import CellFlag from './CellFlag.vue'

const meta = {
  title: 'Admin/Data Type/CellFlag',
  component: CellFlag,
  tags: ['autodocs']
} satisfies Meta<typeof CellFlag>

export default meta
type Story = StoryObj<typeof meta>

export const Marketing: Story = {
  args: { flag: 'M' }
}

export const Returns: Story = {
  args: { flag: 'R' }
}

export const Special: Story = {
  args: { flag: 'S' }
}

export const AllFlags: Story = {
  args: { flag: 'M' },
  render: () => ({
    components: { CellFlag },
    template: `
      <div class="flex items-center gap-1">
        <CellFlag flag="M" />
        <CellFlag flag="R" />
        <CellFlag flag="S" />
      </div>
    `
  })
}
