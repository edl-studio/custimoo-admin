import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ViewPopover from './ViewPopover.vue'

const meta = {
  title: 'Admin/Table/ViewPopover',
  component: ViewPopover,
  tags: ['autodocs']
} satisfies Meta<typeof ViewPopover>

export default meta
type Story = StoryObj<typeof meta>

export const NewView: Story = {
  render: args => ({
    components: { ViewPopover },
    setup: () => ({ args }),
    template: `
      <ViewPopover v-bind="args">
        <button class="inline-flex h-9 items-center rounded-lg border border-border px-3 text-sm font-medium">
          + Add view
        </button>
      </ViewPopover>
    `
  })
}

export const EditingView: Story = {
  args: {
    viewName: 'Unfulfilled',
    color: 'red',
    includeColumns: true,
    includeFilters: true,
    editing: true
  },
  render: args => ({
    components: { ViewPopover },
    setup: () => ({ args }),
    template: `
      <ViewPopover v-bind="args">
        <button class="inline-flex h-9 items-center rounded-lg border border-border px-3 text-sm font-medium">
          Edit view
        </button>
      </ViewPopover>
    `
  })
}
