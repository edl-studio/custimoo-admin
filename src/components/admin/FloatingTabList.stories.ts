import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Moon } from 'lucide-vue-next'
import FloatingTabList from './FloatingTabList.vue'
import type { FloatingTabItem } from './FloatingTabList.vue'

const mockItems: FloatingTabItem[] = [
  { id: '#1042', label: 'John Doe', flagColor: 'red' },
  { id: '#1043', label: 'Jane Smith', flagColor: 'orange' },
  { id: '#1044', label: 'Bob Johnson', flagColor: 'green' },
  { id: '#1045', label: 'Alice Williams', flagColor: 'teal' },
  { id: '#1046', label: 'Charlie Brown', flagColor: 'indigo' }
]

const meta = {
  title: 'Admin/Sheets/FloatingTabList',
  component: FloatingTabList,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  },
  decorators: [
    () => ({
      template:
        '<div class="relative flex h-[500px] w-full items-end justify-end bg-background p-2"><story /></div>'
    })
  ]
} satisfies Meta<typeof FloatingTabList>

export default meta
type Story = StoryObj<typeof meta>

export const Collapsed: Story = {
  args: {
    items: mockItems
  },
  render: args => ({
    components: { FloatingTabList, Moon },
    setup: () => ({ args }),
    template: `
      <FloatingTabList v-bind="args">
        <template #icon>
          <Moon class="size-4 text-primary" />
        </template>
      </FloatingTabList>
    `
  })
}

export const Empty: Story = {
  args: {
    items: []
  },
  render: args => ({
    components: { FloatingTabList, Moon },
    setup: () => ({ args }),
    template: `
      <FloatingTabList v-bind="args">
        <template #icon>
          <Moon class="size-4 text-primary" />
        </template>
      </FloatingTabList>
    `
  })
}
