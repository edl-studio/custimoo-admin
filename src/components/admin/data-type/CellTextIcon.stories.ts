import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Calendar, Building2, MapPin } from 'lucide-vue-next'
import CellTextIcon from './CellTextIcon.vue'

const meta = {
  title: 'Admin/Data Type/CellTextIcon',
  component: CellTextIcon,
  tags: ['autodocs'],
  decorators: [
    () => ({
      template: '<div class="w-[300px]"><story /></div>'
    })
  ]
} satisfies Meta<typeof CellTextIcon>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => ({
    components: { CellTextIcon, Calendar },
    setup: () => ({ args }),
    template: `
      <CellTextIcon v-bind="args">
        <template #icon><Calendar class="size-4" /></template>
        Mar 15, 2026
      </CellTextIcon>
    `
  })
}

export const WithBuilding: Story = {
  render: args => ({
    components: { CellTextIcon, Building2 },
    setup: () => ({ args }),
    template: `
      <CellTextIcon v-bind="args">
        <template #icon><Building2 class="size-4" /></template>
        Acme Factory
      </CellTextIcon>
    `
  })
}

export const Tertiary: Story = {
  args: { color: 'tertiary' },
  render: args => ({
    components: { CellTextIcon, MapPin },
    setup: () => ({ args }),
    template: `
      <CellTextIcon v-bind="args">
        <template #icon><MapPin class="size-4" /></template>
        Shanghai, China
      </CellTextIcon>
    `
  })
}
