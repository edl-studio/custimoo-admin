import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Filter, Calendar, Tag } from 'lucide-vue-next'
import FilterSelectionInput from './FilterSelectionInput.vue'

const meta = {
  title: 'Admin/FilterSelectionInput',
  component: FilterSelectionInput,
  tags: ['autodocs']
} satisfies Meta<typeof FilterSelectionInput>

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

export const FilterBar: Story = {
  args: {
    label: 'Status'
  },
  decorators: [
    () => ({
      template: '<div class="flex gap-2"><story /></div>'
    })
  ],
  render: () => ({
    components: { FilterSelectionInput },
    setup: () => ({ Filter, Calendar, Tag }),
    template: `
      <FilterSelectionInput label="Status" />
      <FilterSelectionInput label="Date" :icon="Calendar" />
      <FilterSelectionInput label="Tag" value="VIP" :selected="true" type="chip" :icon="Tag" />
      <FilterSelectionInput label="More filters" :icon="Filter" :selected="true" :count="2" />
    `
  })
}
