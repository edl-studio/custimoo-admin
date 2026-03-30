import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import GroupByPopover from './GroupByPopover.vue'

const meta = {
  title: 'Admin/Popovers/GroupByPopover',
  component: GroupByPopover,
  tags: ['autodocs'],
  decorators: [
    () => ({
      template:
        '<div class="w-56 rounded-lg border border-border bg-card p-0 shadow-[0_2px_4px_-2px_rgba(0,0,0,0.1),0_4px_6px_-1px_rgba(0,0,0,0.1)]"><story /></div>'
    })
  ]
} satisfies Meta<typeof GroupByPopover>

export default meta
type Story = StoryObj<typeof meta>

const defaultOptions = [
  { key: 'status', label: 'Status' },
  { key: 'stage', label: 'Stage' },
  { key: 'orderType', label: 'Order type' },
  { key: 'dueDate', label: 'Due date' }
]

export const NoneSelected: Story = {
  args: {
    options: defaultOptions,
    modelValue: null
  }
}

export const WithSelection: Story = {
  args: {
    options: defaultOptions,
    modelValue: 'dueDate'
  }
}

export const Interactive: Story = {
  args: {
    options: defaultOptions,
    modelValue: 'stage'
  },
  render: args => ({
    components: { GroupByPopover },
    setup() {
      const groupBy = ref<string | null>('stage')
      return { groupBy, options: args.options }
    },
    template: `
      <GroupByPopover :options="options" v-model="groupBy" />
      <div class="border-t border-border px-4 py-2 text-xs text-foreground-tertiary">
        Selected: {{ groupBy ?? 'none' }}
      </div>
    `
  })
}
