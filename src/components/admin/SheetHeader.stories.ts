import type { Meta, StoryObj } from '@storybook/vue3-vite'
import SheetHeader from './SheetHeader.vue'

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

export const WithMinimize: Story = {
  args: {
    showMinimize: true
  }
}

export const WithFullscreen: Story = {
  args: {
    showFullscreen: true
  }
}

export const AllControls: Story = {
  args: {
    showMinimize: true,
    showFullscreen: true
  }
}

export const FullscreenActive: Story = {
  args: {
    showMinimize: true,
    showFullscreen: true,
    isFullscreen: true
  }
}

export const WithLeadingContent: Story = {
  args: {
    showMinimize: true,
    showFullscreen: true
  },
  render: args => ({
    components: { SheetHeader },
    setup: () => ({ args }),
    template: `
      <SheetHeader v-bind="args">
        <template #leading>
          <span class="text-sm font-medium text-foreground">Order #1042</span>
        </template>
      </SheetHeader>
    `
  })
}
