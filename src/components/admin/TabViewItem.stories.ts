import type { Meta, StoryObj } from '@storybook/vue3-vite'
import TabViewItem from './TabViewItem.vue'

const meta = {
  title: 'Admin/TabViewItem',
  component: TabViewItem,
  tags: ['autodocs'],
  args: {
    default: 'All orders'
  }
} satisfies Meta<typeof TabViewItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => ({
    components: { TabViewItem },
    setup: () => ({ args }),
    template: '<TabViewItem v-bind="args">All orders</TabViewItem>'
  })
}

export const Active: Story = {
  args: {
    active: true
  },
  render: args => ({
    components: { TabViewItem },
    setup: () => ({ args }),
    template: '<TabViewItem v-bind="args">All orders</TabViewItem>'
  })
}

export const ActiveEditable: Story = {
  args: {
    active: true,
    editable: true
  },
  render: args => ({
    components: { TabViewItem },
    setup: () => ({ args }),
    template: '<TabViewItem v-bind="args">All orders</TabViewItem>'
  })
}

export const WithColorIndicator: Story = {
  args: {
    active: true,
    indicatorColor: '#6366f1'
  },
  render: args => ({
    components: { TabViewItem },
    setup: () => ({ args }),
    template: '<TabViewItem v-bind="args">Custom View</TabViewItem>'
  })
}

export const TabBar: Story = {
  render: () => ({
    components: { TabViewItem },
    template: `
      <div class="flex border-b border-border">
        <TabViewItem active>All orders</TabViewItem>
        <TabViewItem>Unfulfilled</TabViewItem>
        <TabViewItem indicator-color="#22c55e">Completed</TabViewItem>
        <TabViewItem indicator-color="#ef4444">Cancelled</TabViewItem>
      </div>
    `
  })
}
