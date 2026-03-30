import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Moon } from 'lucide-vue-next'
import FloatingTabBar from './FloatingTabBar.vue'
import FloatingTab from './FloatingTab.vue'
import FloatingTabList from './FloatingTabList.vue'
import type { FloatingTabItem } from './FloatingTabList.vue'

const tabItems: FloatingTabItem[] = [
  { id: '#1045', label: 'Alice Williams', flagColor: 'teal' },
  { id: '#1046', label: 'Charlie Brown', flagColor: 'orange' },
  { id: '#1047', label: 'Diana Ross' },
  { id: '#1048', label: 'Edward Norton', flagColor: 'indigo' }
]

const meta = {
  title: 'Admin/Sheets/FloatingTabBar',
  component: FloatingTabBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  },
  decorators: [
    () => ({
      template: '<div class="relative h-[400px] w-full bg-background"><story /></div>'
    })
  ]
} satisfies Meta<typeof FloatingTabBar>

export default meta
type Story = StoryObj<typeof meta>

export const WithTabsAndList: Story = {
  render: () => ({
    components: { FloatingTabBar, FloatingTab, FloatingTabList, Moon },
    setup: () => ({ tabItems }),
    template: `
      <FloatingTabBar>
        <FloatingTab id="#1042" label="John Doe" flagColor="red">
          <template #icon>
            <Moon class="size-4 text-primary" />
          </template>
        </FloatingTab>
        <FloatingTab id="#1043" label="Jane Smith" flagColor="green">
          <template #icon>
            <Moon class="size-4 text-primary" />
          </template>
        </FloatingTab>
        <FloatingTabList :items="tabItems">
          <template #icon>
            <Moon class="size-4 text-primary" />
          </template>
        </FloatingTabList>
      </FloatingTabBar>
    `
  })
}

export const SingleTab: Story = {
  render: () => ({
    components: { FloatingTabBar, FloatingTab, FloatingTabList, Moon },
    template: `
      <FloatingTabBar>
        <FloatingTab id="#1042" label="John Doe">
          <template #icon>
            <Moon class="size-4 text-primary" />
          </template>
        </FloatingTab>
        <FloatingTabList :items="[]">
          <template #icon>
            <Moon class="size-4 text-primary" />
          </template>
        </FloatingTabList>
      </FloatingTabBar>
    `
  })
}

export const OnlyTabList: Story = {
  render: () => ({
    components: { FloatingTabBar, FloatingTabList, Moon },
    setup: () => ({ tabItems }),
    template: `
      <FloatingTabBar>
        <FloatingTabList :items="tabItems">
          <template #icon>
            <Moon class="size-4 text-primary" />
          </template>
        </FloatingTabList>
      </FloatingTabBar>
    `
  })
}
