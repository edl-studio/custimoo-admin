import type { Meta, StoryObj } from '@storybook/vue3-vite'
import CellEmpty from './CellEmpty.vue'

const meta = {
  title: 'Admin/Data Type/CellEmpty',
  component: CellEmpty,
  tags: ['autodocs']
} satisfies Meta<typeof CellEmpty>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const CustomDisplay: Story = {
  args: { display: 'N/A' }
}
