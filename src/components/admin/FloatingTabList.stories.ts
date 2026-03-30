import type { Meta, StoryObj } from '@storybook/vue3-vite'
import FloatingTabList from './FloatingTabList.vue'
import type { SheetState } from '@/composables/useSheet'

const meta = {
  title: 'Admin/Sheets/FloatingTabList',
  component: FloatingTabList,
  tags: ['autodocs'],
  decorators: [
    () => ({
      template: '<div class="relative h-[500px] w-96 bg-muted p-4"><story /></div>'
    })
  ]
} satisfies Meta<typeof FloatingTabList>

export default meta
type Story = StoryObj<typeof meta>

const mockSheets: SheetState[] = [
  { id: 'order-1', type: 'order', data: { number: '1042', name: 'John Doe' } },
  { id: 'order-2', type: 'order', data: { number: '1043', name: 'Jane Smith' } },
  { id: 'order-3', type: 'order', data: { number: '1044', name: 'Bob Johnson' } },
  { id: 'order-4', type: 'order', data: { number: '1045', name: 'Alice Williams' } },
  { id: 'order-5', type: 'order', data: { number: '1046', name: 'Charlie Brown' } }
]

export const Collapsed: Story = {
  args: {
    sheets: mockSheets,
    getLabel: (s: SheetState) => (s.data as { name: string }).name,
    getId: (s: SheetState) => (s.data as { number: string }).number
  }
}

export const WithFlagColors: Story = {
  args: {
    sheets: mockSheets,
    getLabel: (s: SheetState) => (s.data as { name: string }).name,
    getId: (s: SheetState) => (s.data as { number: string }).number,
    getFlagColor: (s: SheetState) => {
      const colors = ['#ef4444', '#f97316', '#22c55e', '#3b82f6', '#a855f7']
      const idx = mockSheets.indexOf(s)
      return colors[idx]
    }
  }
}
