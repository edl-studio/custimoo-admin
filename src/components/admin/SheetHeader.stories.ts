import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Minus, Maximize2 } from 'lucide-vue-next'
import SheetHeader from './SheetHeader.vue'
import { Button } from '@/components/ui/button'

const meta = {
  title: 'Admin/Sheets/SheetHeader',
  component: SheetHeader,
  tags: ['autodocs'],
  decorators: [
    () => ({
      template: '<div class="w-[480px] rounded-lg border border-border bg-card"><story /></div>'
    })
  ]
} satisfies Meta<typeof SheetHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {}
}

export const WithTrailingActions: Story = {
  render: args => ({
    components: { SheetHeader, Button, Minus, Maximize2 },
    setup: () => ({ args }),
    template: `
      <SheetHeader v-bind="args">
        <template #trailing>
          <Button variant="ghost" size="icon"><Minus /></Button>
          <Button variant="ghost" size="icon"><Maximize2 /></Button>
        </template>
      </SheetHeader>
    `
  })
}

export const WithLeadingContent: Story = {
  render: args => ({
    components: { SheetHeader, Button, Minus },
    setup: () => ({ args }),
    template: `
      <SheetHeader v-bind="args">
        <template #leading>
          <span class="text-sm font-medium text-foreground">Order #1042</span>
        </template>
        <template #trailing>
          <Button variant="ghost" size="icon"><Minus /></Button>
        </template>
      </SheetHeader>
    `
  })
}
