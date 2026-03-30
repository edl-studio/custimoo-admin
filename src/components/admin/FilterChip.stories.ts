import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Filter, Calendar } from 'lucide-vue-next'
import FilterChip from './FilterChip.vue'

const meta = {
  title: 'Admin/Filters/FilterChip',
  component: FilterChip,
  tags: ['autodocs']
} satisfies Meta<typeof FilterChip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Status'
  }
}

export const WithIcon: Story = {
  args: {
    label: 'Date',
    icon: Calendar
  }
}

export const Selected: Story = {
  args: {
    label: 'Status',
    value: 'Unfulfilled',
    selected: true,
    type: 'chip'
  }
}

export const WithBadge: Story = {
  args: {
    label: 'Filters',
    icon: Filter,
    selected: true,
    count: 3
  }
}
