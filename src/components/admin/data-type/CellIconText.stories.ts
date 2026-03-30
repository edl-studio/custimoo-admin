import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Calendar, Building2, MapPin } from 'lucide-vue-next'
import CellIconText from './CellIconText.vue'

const meta = {
  title: 'Admin/Table Cells/CellIconText',
  component: CellIconText,
  tags: ['autodocs'],
  decorators: [
    () => ({
      template: '<div class="w-[300px]"><story /></div>'
    })
  ]
} satisfies Meta<typeof CellIconText>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => ({
    components: { CellIconText, Calendar },
    setup: () => ({ args }),
    template: `
      <CellIconText v-bind="args">
        <template #icon><Calendar class="size-4" /></template>
        Mar 15, 2026
      </CellIconText>
    `
  })
}

export const WithBuilding: Story = {
  render: args => ({
    components: { CellIconText, Building2 },
    setup: () => ({ args }),
    template: `
      <CellIconText v-bind="args">
        <template #icon><Building2 class="size-4" /></template>
        Acme Factory
      </CellIconText>
    `
  })
}

export const Tertiary: Story = {
  args: { color: 'tertiary' },
  render: args => ({
    components: { CellIconText, MapPin },
    setup: () => ({ args }),
    template: `
      <CellIconText v-bind="args">
        <template #icon><MapPin class="size-4" /></template>
        Shanghai, China
      </CellIconText>
    `
  })
}
