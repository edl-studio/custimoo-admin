import type { Meta, StoryObj } from '@storybook/vue3-vite'
import FloatingTabBar from './FloatingTabBar.vue'
import FloatingTab from './FloatingTab.vue'

const meta = {
  title: 'Admin/Sheets/FloatingTabBar',
  component: FloatingTabBar,
  tags: ['autodocs'],
  decorators: [
    () => ({
      template: '<div class="relative h-20 w-full bg-muted"><story /></div>'
    })
  ]
} satisfies Meta<typeof FloatingTabBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { FloatingTabBar, FloatingTab },
    template: `
      <FloatingTabBar>
        <FloatingTab id="1042" label="John Doe" />
        <FloatingTab id="1043" label="Jane Smith" />
      </FloatingTabBar>
    `
  })
}

export const SingleTab: Story = {
  render: () => ({
    components: { FloatingTabBar, FloatingTab },
    template: `
      <FloatingTabBar>
        <FloatingTab id="1042" label="John Doe" />
      </FloatingTabBar>
    `
  })
}

export const ManyTabs: Story = {
  render: () => ({
    components: { FloatingTabBar, FloatingTab },
    template: `
      <FloatingTabBar>
        <FloatingTab id="1042" label="John Doe" flagColor="#ef4444" />
        <FloatingTab id="1043" label="Jane Smith" flagColor="#22c55e" />
        <FloatingTab id="1044" label="Bob Johnson" flagColor="#3b82f6" />
        <FloatingTab id="1045" label="Alice Williams" />
      </FloatingTabBar>
    `
  })
}
