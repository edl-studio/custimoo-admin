import type { Meta, StoryObj } from '@storybook/vue3-vite'
import PageHeader from './PageHeader.vue'

const meta = {
  title: 'Admin/PageHeader',
  component: PageHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded'
  },
  decorators: [
    () => ({
      template:
        '<div class="w-[800px] border border-border rounded-lg overflow-hidden"><story /></div>'
    })
  ]
} satisfies Meta<typeof PageHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Orders'
  }
}

export const WithActions: Story = {
  args: {
    title: 'Orders'
  },
  render: args => ({
    components: { PageHeader },
    setup: () => ({ args }),
    template: `
      <PageHeader v-bind="args">
        <template #actions>
          <button class="inline-flex h-9 items-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground">
            Create order
          </button>
        </template>
      </PageHeader>
    `
  })
}

export const LongTitle: Story = {
  args: {
    title: 'This is a very long page title that should truncate when the container is too small'
  }
}
