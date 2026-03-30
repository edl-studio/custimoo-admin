import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Plus, Download, Filter } from 'lucide-vue-next'
import ResponsiveButton from './ResponsiveButton.vue'

const meta = {
  title: 'Admin/Controls/ResponsiveButton',
  component: ResponsiveButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'primary',
        'outline',
        'ghost',
        'destructive',
        'ghost-destructive',
        'link'
      ]
    }
  }
} satisfies Meta<typeof ResponsiveButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Add item'
  },
  render: args => ({
    components: { ResponsiveButton, Plus },
    setup: () => ({ args }),
    template: `
      <ResponsiveButton v-bind="args">
        <Plus class="size-4" />
      </ResponsiveButton>
    `
  })
}

export const Outline: Story = {
  args: {
    label: 'Download',
    variant: 'outline'
  },
  render: args => ({
    components: { ResponsiveButton, Download },
    setup: () => ({ args }),
    template: `
      <ResponsiveButton v-bind="args">
        <Download class="size-4" />
      </ResponsiveButton>
    `
  })
}

export const Ghost: Story = {
  args: {
    label: 'Filter',
    variant: 'ghost'
  },
  render: args => ({
    components: { ResponsiveButton, Filter },
    setup: () => ({ args }),
    template: `
      <ResponsiveButton v-bind="args">
        <Filter class="size-4" />
      </ResponsiveButton>
    `
  })
}

export const ResponsiveBehavior: Story = {
  args: {
    label: 'Add item'
  },
  render: () => ({
    components: { ResponsiveButton, Plus, Download, Filter },
    template: `
      <div class="flex flex-col gap-6">
        <div>
          <p class="mb-2 text-sm text-muted-foreground">Narrow container (icon only):</p>
          <div class="@container w-32 border border-dashed border-border rounded-lg p-2">
            <div class="flex gap-2">
              <ResponsiveButton label="Add item"><Plus class="size-4" /></ResponsiveButton>
              <ResponsiveButton label="Download" variant="outline"><Download class="size-4" /></ResponsiveButton>
            </div>
          </div>
        </div>
        <div>
          <p class="mb-2 text-sm text-muted-foreground">Wide container (icon + label):</p>
          <div class="@container w-96 border border-dashed border-border rounded-lg p-2">
            <div class="flex gap-2">
              <ResponsiveButton label="Add item"><Plus class="size-4" /></ResponsiveButton>
              <ResponsiveButton label="Download" variant="outline"><Download class="size-4" /></ResponsiveButton>
            </div>
          </div>
        </div>
      </div>
    `
  })
}
