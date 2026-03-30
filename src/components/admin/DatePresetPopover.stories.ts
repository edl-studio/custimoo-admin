import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { Calendar } from 'lucide-vue-next'
import DatePresetPopover from './DatePresetPopover.vue'

const meta = {
  title: 'Admin/Popovers/DatePresetPopover',
  component: DatePresetPopover,
  tags: ['autodocs'],
  decorators: [
    () => ({
      template:
        '<div class="w-56 rounded-lg border border-border bg-card p-0 shadow-[0_2px_4px_-2px_rgba(0,0,0,0.1),0_4px_6px_-1px_rgba(0,0,0,0.1)]"><story /></div>'
    })
  ]
} satisfies Meta<typeof DatePresetPopover>

export default meta
type Story = StoryObj<typeof meta>

const dueDatePresets = [
  { key: 'overdue', label: 'Overdue', icon: Calendar, iconClass: 'text-destructive' },
  { key: 'today', label: 'Today', icon: Calendar, iconClass: 'text-orange-500' },
  { key: 'thisWeek', label: 'This week', icon: Calendar, iconClass: 'text-foreground-tertiary' },
  { key: 'thisMonth', label: 'This month', icon: Calendar, iconClass: 'text-foreground-tertiary' }
]

export const ShowAll: Story = {
  args: {
    options: dueDatePresets,
    modelValue: null
  }
}

export const WithSelection: Story = {
  args: {
    options: dueDatePresets,
    modelValue: 'overdue'
  }
}

export const WithDateRange: Story = {
  args: {
    options: dueDatePresets,
    modelValue: null,
    showDateRange: true
  }
}

export const Interactive: Story = {
  args: {
    options: dueDatePresets,
    modelValue: 'today',
    showDateRange: true
  },
  render: args => ({
    components: { DatePresetPopover },
    setup() {
      const preset = ref<string | null>('today')
      return { preset, options: args.options }
    },
    template: `
      <DatePresetPopover :options="options" v-model="preset" show-date-range />
      <div class="border-t border-border px-4 py-2 text-xs text-foreground-tertiary">
        Selected: {{ preset ?? 'all' }}
      </div>
    `
  })
}
