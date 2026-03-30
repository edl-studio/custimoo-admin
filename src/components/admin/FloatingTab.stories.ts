import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Moon } from 'lucide-vue-next'
import FloatingTab from './FloatingTab.vue'

const meta = {
  title: 'Admin/Sheets/FloatingTab',
  component: FloatingTab,
  tags: ['autodocs'],
  decorators: [
    () => ({
      template:
        '<div class="relative flex h-60 w-full items-end justify-end bg-background p-0"><story /></div>'
    })
  ]
} satisfies Meta<typeof FloatingTab>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    id: '#1042',
    label: 'John Doe'
  },
  render: args => ({
    components: { FloatingTab, Moon },
    setup: () => ({ args }),
    template: `
      <FloatingTab v-bind="args">
        <template #icon>
          <Moon class="size-4 text-primary" />
        </template>
      </FloatingTab>
    `
  })
}

export const WithFlagColor: Story = {
  args: {
    id: '#1042',
    label: 'John Doe',
    flagColor: 'red'
  },
  render: args => ({
    components: { FloatingTab, Moon },
    setup: () => ({ args }),
    template: `
      <FloatingTab v-bind="args">
        <template #icon>
          <Moon class="size-4 text-primary" />
        </template>
      </FloatingTab>
    `
  })
}

export const LongLabel: Story = {
  args: {
    id: '#9999',
    label: 'Very Long Order Name That Should Truncate Properly'
  },
  render: args => ({
    components: { FloatingTab, Moon },
    setup: () => ({ args }),
    template: `
      <FloatingTab v-bind="args">
        <template #icon>
          <Moon class="size-4 text-primary" />
        </template>
      </FloatingTab>
    `
  })
}
