import type { Meta, StoryObj } from '@storybook/vue3-vite'
import FloatingTabList from './FloatingTabList.vue'
import type { FloatingTabItem } from './FloatingTabList.vue'

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

const mockItems: FloatingTabItem[] = [
  { id: '1042', label: 'John Doe' },
  { id: '1043', label: 'Jane Smith' },
  { id: '1044', label: 'Bob Johnson' },
  { id: '1045', label: 'Alice Williams' },
  { id: '1046', label: 'Charlie Brown' }
]

export const Collapsed: Story = {
  args: {
    items: mockItems
  }
}

export const WithFlagColors: Story = {
  args: {
    items: [
      { id: '1042', label: 'John Doe', flagColor: 'red' },
      { id: '1043', label: 'Jane Smith', flagColor: 'orange' },
      { id: '1044', label: 'Bob Johnson', flagColor: 'green' },
      { id: '1045', label: 'Alice Williams', flagColor: 'teal' },
      { id: '1046', label: 'Charlie Brown', flagColor: 'indigo' }
    ]
  }
}

export const Empty: Story = {
  args: {
    items: []
  }
}
