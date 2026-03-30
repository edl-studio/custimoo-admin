import type { Meta, StoryObj } from '@storybook/vue3-vite'
import CellAssignee from './CellAssignee.vue'

const meta = {
  title: 'Admin/Data Type/CellAssignee',
  component: CellAssignee,
  tags: ['autodocs'],
  decorators: [
    () => ({
      template: '<div class="w-[250px]"><story /></div>'
    })
  ]
} satisfies Meta<typeof CellAssignee>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { name: 'Samar Ahmed' }
}

export const WithYouTag: Story = {
  args: { name: 'Samar Ahmed', showYouTag: true }
}

export const LongName: Story = {
  args: { name: 'Alexander Konstantinovich' }
}

export const AllVariants: Story = {
  args: { name: 'Samar Ahmed' },
  decorators: [
    () => ({
      template: '<div class="w-[300px]"><story /></div>'
    })
  ],
  render: () => ({
    components: { CellAssignee },
    template: `
      <div class="flex flex-col gap-3">
        <CellAssignee name="Samar Ahmed" />
        <CellAssignee name="Samar Ahmed" :showYouTag="true" />
        <CellAssignee name="Jane Cooper" />
        <CellAssignee name="Alexander Konstantinovich" />
      </div>
    `
  })
}
