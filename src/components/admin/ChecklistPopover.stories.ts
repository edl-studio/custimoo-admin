import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { ChevronsUp, Minus, ChevronsDown } from 'lucide-vue-next'
import ChecklistPopover from './ChecklistPopover.vue'

const meta = {
  title: 'Admin/Popovers/ChecklistPopover',
  component: ChecklistPopover,
  tags: ['autodocs'],
  decorators: [
    () => ({
      template:
        '<div class="w-56 rounded-lg border border-border bg-card p-0 shadow-[0_2px_4px_-2px_rgba(0,0,0,0.1),0_4px_6px_-1px_rgba(0,0,0,0.1)]"><story /></div>'
    })
  ]
} satisfies Meta<typeof ChecklistPopover>

export default meta
type Story = StoryObj<typeof meta>

const stageOptions = [
  { key: 'order-approval', label: 'Order approval', count: 24 },
  { key: 'sample-file', label: 'Sample file', count: 8 },
  { key: 'in-production', label: 'In production', count: 31 },
  { key: 'quality-control', label: 'Quality control', count: 12 },
  { key: 'shipping', label: 'Shipping', count: 5 },
  { key: 'completed', label: 'Completed', count: 47 }
]

const priorityOptions = [
  { key: 'high', label: 'High', count: 97, icon: ChevronsUp, iconClass: 'text-destructive' },
  { key: 'normal', label: 'Normal', count: 12, icon: Minus, iconClass: 'text-foreground-tertiary' },
  { key: 'low', label: 'Low', count: 0, icon: ChevronsDown, iconClass: 'text-primary' }
]

export const ShowAll: Story = {
  args: {
    options: stageOptions,
    modelValue: []
  }
}

export const WithSelections: Story = {
  args: {
    options: stageOptions,
    modelValue: ['in-production', 'quality-control']
  }
}

export const WithIcons: Story = {
  args: {
    options: priorityOptions,
    modelValue: []
  }
}

export const Interactive: Story = {
  args: {
    options: stageOptions,
    modelValue: []
  },
  render: args => ({
    components: { ChecklistPopover },
    setup() {
      const selected = ref<string[]>([])
      return { selected, options: args.options }
    },
    template: `
      <ChecklistPopover :options="options" v-model="selected" />
      <div class="border-t border-border px-4 py-2 text-xs text-foreground-tertiary">
        Selected: {{ selected.length ? selected.join(', ') : 'all' }}
      </div>
    `
  })
}
