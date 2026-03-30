import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { computed, provide, ref } from 'vue'
import {
  ShoppingCart,
  Package,
  Users,
  LayoutDashboard,
  Settings,
  Tag,
  BarChart3
} from 'lucide-vue-next'
import SidebarNav from './SidebarNav.vue'
import type { NavSection } from './SidebarNav.vue'

const sections: NavSection[] = [
  {
    items: [
      { label: 'Dashboard', icon: LayoutDashboard, to: '/dashboard' },
      { label: 'Orders', icon: ShoppingCart, to: '/orders', badge: 12 },
      { label: 'Products', icon: Package, to: '/products' },
      { label: 'Customers', icon: Users, to: '/customers' }
    ]
  },
  {
    label: 'Analytics',
    items: [
      { label: 'Reports', icon: BarChart3, to: '/reports' },
      { label: 'Discounts', icon: Tag, to: '/discounts', dot: 'red' }
    ]
  },
  {
    label: 'Configuration',
    items: [{ label: 'Settings', icon: Settings, to: '/settings' }]
  }
]

const meta = {
  title: 'Admin/Layout/SidebarNav',
  component: SidebarNav,
  tags: ['autodocs'],
  args: {
    sections,
    userName: 'John Doe',
    userEmail: 'john@custimoo.com'
  },
  parameters: {
    layout: 'fullscreen'
  }
} satisfies Meta<typeof SidebarNav>

export default meta
type Story = StoryObj<typeof meta>

export const Expanded: Story = {
  decorators: [
    story => ({
      components: { Story: story() },
      setup() {
        provide(
          'sidebar-collapsed',
          computed(() => false)
        )
        provide('toggle-collapsed', () => {})
      },
      template: '<div class="h-[600px] w-64 border-r border-border"><Story /></div>'
    })
  ]
}

export const Collapsed: Story = {
  decorators: [
    story => ({
      components: { Story: story() },
      setup() {
        provide(
          'sidebar-collapsed',
          computed(() => true)
        )
        provide('toggle-collapsed', () => {})
      },
      template: '<div class="h-[600px] w-16 border-r border-border"><Story /></div>'
    })
  ]
}

export const Interactive: Story = {
  decorators: [
    story => ({
      components: { Story: story() },
      setup() {
        const collapsed = ref(false)
        provide(
          'sidebar-collapsed',
          computed(() => collapsed.value)
        )
        provide('toggle-collapsed', () => {
          collapsed.value = !collapsed.value
        })
        return { collapsed }
      },
      template:
        '<div class="h-[600px] transition-[width] duration-200" :class="collapsed ? \'w-16\' : \'w-64\'" style="border-right: 1px solid var(--border)"><Story /></div>'
    })
  ]
}
