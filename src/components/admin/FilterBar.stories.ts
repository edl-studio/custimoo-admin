import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { Calendar, Tag, MapPin, User, Package, Truck, CreditCard } from 'lucide-vue-next'
import FilterBar from './FilterBar.vue'
import type { FilterDef } from './FilterBar.vue'

const meta = {
  title: 'Admin/Filters/FilterBar',
  component: FilterBar,
  tags: ['autodocs']
} satisfies Meta<typeof FilterBar>

export default meta
type Story = StoryObj<typeof meta>

const filters: FilterDef[] = [
  { key: 'status', label: 'Status', icon: Tag },
  { key: 'date', label: 'Date', icon: Calendar },
  { key: 'location', label: 'Location', icon: MapPin }
]

export const Default: Story = {
  args: {
    filters,
    activeFilters: {}
  }
}

export const WithActiveFilters: Story = {
  args: {
    filters,
    activeFilters: {
      status: 'Unfulfilled',
      date: 'Last 7 days'
    }
  }
}

export const ManyFilters: Story = {
  args: {
    filters: [
      { key: 'status', label: 'Status', icon: Tag },
      { key: 'date', label: 'Date', icon: Calendar },
      { key: 'location', label: 'Location', icon: MapPin },
      { key: 'customer', label: 'Customer', icon: User },
      { key: 'product', label: 'Product', icon: Package },
      { key: 'shipping', label: 'Shipping', icon: Truck },
      { key: 'payment', label: 'Payment', icon: CreditCard }
    ],
    activeFilters: { status: 'Open' }
  },
  decorators: [
    () => ({
      template: '<div class="w-[500px]"><story /></div>'
    })
  ]
}

export const Interactive: Story = {
  args: {
    filters: [],
    activeFilters: {}
  },
  render: () => ({
    components: { FilterBar },
    setup() {
      const filters: FilterDef[] = [
        { key: 'status', label: 'Status', icon: Tag },
        { key: 'date', label: 'Date', icon: Calendar },
        { key: 'location', label: 'Location', icon: MapPin }
      ]
      const activeFilters = ref<Record<string, string | null>>({})

      function onFilterClick(key: string) {
        if (key in activeFilters.value) return
        activeFilters.value = { ...activeFilters.value, [key]: 'Selected' }
      }

      function onFilterClear(key: string) {
        const next = { ...activeFilters.value }
        delete next[key]
        activeFilters.value = next
      }

      return { filters, activeFilters, onFilterClick, onFilterClear }
    },
    template: `
      <FilterBar
        :filters="filters"
        :active-filters="activeFilters"
        @filter-click="onFilterClick"
        @filter-clear="onFilterClear"
      />
    `
  })
}
