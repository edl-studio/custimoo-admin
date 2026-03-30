import type { Meta, StoryObj } from '@storybook/vue3-vite'
import SheetContent from './SheetContent.vue'

const meta = {
  title: 'Admin/Sheets/SheetContent',
  component: SheetContent,
  tags: ['autodocs'],
  decorators: [
    () => ({
      template: '<div class="flex h-[400px] w-full"><story /></div>'
    })
  ]
} satisfies Meta<typeof SheetContent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { SheetContent },
    template: `
      <SheetContent>
        <div class="p-6 text-sm text-foreground-tertiary">Sheet content goes here</div>
      </SheetContent>
    `
  })
}

export const Fullscreen: Story = {
  render: () => ({
    components: { SheetContent },
    template: `
      <SheetContent fullscreen>
        <div class="p-6 text-sm text-foreground-tertiary">Fullscreen sheet content</div>
      </SheetContent>
    `
  })
}
