import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { RotateCcw, Columns2, Trash2, ChevronsUp, ChevronRight, Calendar } from 'lucide-vue-next'
import PopoverMenuItem from './PopoverMenuItem.vue'

const meta = {
  title: 'Admin/Controls/PopoverMenuItem',
  component: PopoverMenuItem,
  tags: ['autodocs'],
  decorators: [
    () => ({
      template: '<div class="w-52 rounded-lg border border-border bg-card p-1"><story /></div>'
    })
  ]
} satisfies Meta<typeof PopoverMenuItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { label: 'Priority' }
}

export const WithIcon: Story = {
  args: { label: 'Columns', icon: Columns2 }
}

export const Draggable: Story = {
  args: { label: 'Merchant', draggable: true }
}

export const WithCheckbox: Story = {
  args: { label: 'Customer', checked: true, draggable: true }
}

export const Unchecked: Story = {
  args: { label: 'Quantity', checked: false, draggable: true }
}

export const Destructive: Story = {
  args: { label: 'Delete view', icon: Trash2, variant: 'destructive' }
}

export const RestoreDefault: Story = {
  args: { label: 'Restore default', icon: RotateCcw }
}

export const SelectedCheckmark: Story = {
  args: { label: 'Show all', selected: true }
}

export const UnselectedCheckmark: Story = {
  args: { label: 'This week', icon: Calendar, selected: false }
}

export const WithCount: Story = {
  args: {
    label: 'High',
    icon: ChevronsUp,
    iconClass: 'text-destructive',
    count: 97,
    checked: false
  }
}

export const WithCountChecked: Story = {
  args: { label: 'High', icon: ChevronsUp, iconClass: 'text-destructive', count: 97, checked: true }
}

export const ColoredIcon: Story = {
  args: { label: 'Overdue', icon: Calendar, iconClass: 'text-destructive', selected: true }
}

export const WithTrailingChevron: Story = {
  render: args => ({
    components: { PopoverMenuItem },
    setup: () => ({ args, ChevronRight }),
    template: `
      <PopoverMenuItem v-bind="args">
        <template #trailing>
          <component :is="ChevronRight" class="size-3.5 shrink-0 text-foreground-tertiary" />
        </template>
      </PopoverMenuItem>
    `
  }),
  args: { label: 'Date range' }
}

export const WithLeadingSlot: Story = {
  render: args => ({
    components: { PopoverMenuItem },
    setup: () => ({ args }),
    template: `
      <PopoverMenuItem v-bind="args">
        <template #leading>
          <span class="flex size-6 shrink-0 items-center justify-center rounded-md bg-primary text-[10px] font-bold text-primary-foreground">SA</span>
        </template>
      </PopoverMenuItem>
    `
  }),
  args: { label: 'Samar (You)', count: 12, checked: false }
}
