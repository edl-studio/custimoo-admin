import type { Meta, StoryObj } from '@storybook/vue3-vite'
import StageBadge from './StageBadge.vue'

const meta = {
  title: 'Admin/Table Cells/StageBadge',
  component: StageBadge,
  tags: ['autodocs']
} satisfies Meta<typeof StageBadge>

export default meta
type Story = StoryObj<typeof meta>

export const OrderApproval: Story = {
  args: { stage: 'Order approval' }
}

export const SampleFile: Story = {
  args: { stage: 'Sample file' }
}

export const SampleProduction: Story = {
  args: { stage: 'Sample production' }
}

export const ProductionFiles: Story = {
  args: { stage: 'Production files' }
}

export const InProduction: Story = {
  args: { stage: 'In production' }
}

export const QualityControl: Story = {
  args: { stage: 'Quality control' }
}

export const Shipping: Story = {
  args: { stage: 'Shipping' }
}

export const Completed: Story = {
  args: { stage: 'Completed' }
}

export const AllStages: Story = {
  args: { stage: 'Order approval' },
  render: () => ({
    components: { StageBadge },
    template: `
      <div class="flex flex-wrap gap-2">
        <StageBadge stage="Order approval" />
        <StageBadge stage="Sample file" />
        <StageBadge stage="Sample production" />
        <StageBadge stage="Production files" />
        <StageBadge stage="In production" />
        <StageBadge stage="Quality control" />
        <StageBadge stage="Shipping" />
        <StageBadge stage="Completed" />
      </div>
    `
  })
}

export const CustomColorMap: Story = {
  args: {
    stage: 'Pending review',
    colorMap: {
      'Pending review': 'bg-violet-100 text-violet-700 border-violet-200',
      Approved: 'bg-emerald-100 text-emerald-700 border-emerald-200'
    }
  }
}
