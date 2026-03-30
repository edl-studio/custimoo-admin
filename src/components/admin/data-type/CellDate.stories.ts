import type { Meta, StoryObj } from '@storybook/vue3-vite'
import CellDate from './CellDate.vue'

const meta = {
  title: 'Admin/Data Type/CellDate',
  component: CellDate,
  tags: ['autodocs']
} satisfies Meta<typeof CellDate>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { date: '2026-03-15' }
}

export const Today: Story = {
  args: { date: new Date().toISOString(), highlightToday: true }
}

export const TodayNoHighlight: Story = {
  args: { date: new Date().toISOString(), highlightToday: false }
}

export const AllVariants: Story = {
  args: { date: '2026-03-15' },
  render: () => ({
    components: { CellDate },
    setup: () => ({ today: new Date().toISOString() }),
    template: `
      <div class="flex items-center gap-6">
        <CellDate date="2026-01-10" />
        <CellDate date="2026-06-22" />
        <CellDate :date="today" :highlightToday="true" />
        <CellDate :date="today" :highlightToday="false" />
      </div>
    `
  })
}
