import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ShoppingCart } from 'lucide-vue-next'
import FloatingTab from './FloatingTab.vue'

const meta = {
  title: 'Admin/Sheets/FloatingTab',
  component: FloatingTab,
  tags: ['autodocs'],
  decorators: [
    () => ({
      template: '<div class="relative h-20 w-80 bg-muted p-4"><story /></div>'
    })
  ]
} satisfies Meta<typeof FloatingTab>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    id: '1042',
    label: 'John Doe'
  }
}

export const WithFlagColor: Story = {
  args: {
    id: '1042',
    label: 'John Doe',
    flagColor: 'red'
  }
}

export const WithIcon: Story = {
  args: {
    id: '1042',
    label: 'Summer Sale Bundle'
  },
  render: args => ({
    components: { FloatingTab, ShoppingCart },
    setup: () => ({ args }),
    template: `
      <FloatingTab v-bind="args">
        <template #icon>
          <ShoppingCart class="size-4 text-foreground-tertiary" />
        </template>
      </FloatingTab>
    `
  })
}

export const LongLabel: Story = {
  args: {
    id: '9999',
    label: 'Very Long Order Name That Should Truncate Properly'
  }
}
