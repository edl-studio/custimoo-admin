import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { DollarSign, ShoppingCart, Users, Package } from 'lucide-vue-next'
import StatCard from './StatCard.vue'

const meta = {
  title: 'Admin/StatCard',
  component: StatCard,
  tags: ['autodocs'],
  decorators: [
    () => ({
      template: '<div class="w-[280px]"><story /></div>'
    })
  ]
} satisfies Meta<typeof StatCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Total Revenue',
    value: '$45,231.89'
  }
}

export const WithTrendUp: Story = {
  args: {
    title: 'Total Revenue',
    value: '$45,231.89',
    trend: { value: 20.1, direction: 'up' },
    icon: DollarSign
  }
}

export const WithTrendDown: Story = {
  args: {
    title: 'Refunds',
    value: '$1,234.56',
    trend: { value: 4.5, direction: 'down' },
    icon: DollarSign
  }
}

export const WithIcon: Story = {
  args: {
    title: 'Active Orders',
    value: '2,350',
    icon: ShoppingCart
  }
}

export const Grid: Story = {
  args: {
    title: 'Total Revenue',
    value: '$45,231.89'
  },
  decorators: [
    () => ({
      template: '<div class="grid w-[900px] grid-cols-4 gap-4"><story /></div>'
    })
  ],
  render: () => ({
    components: { StatCard },
    setup: () => ({ DollarSign, Users, ShoppingCart, Package }),
    template: `
      <StatCard title="Total Revenue" value="$45,231.89" :trend="{ value: 20.1, direction: 'up' }" :icon="DollarSign" />
      <StatCard title="Customers" value="2,350" :trend="{ value: 12.5, direction: 'up' }" :icon="Users" />
      <StatCard title="Orders" value="12,234" :trend="{ value: 3.2, direction: 'down' }" :icon="ShoppingCart" />
      <StatCard title="Products" value="573" :icon="Package" />
    `
  })
}
