import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ShoppingCart, Package, Users, LayoutDashboard, Settings } from 'lucide-vue-next'
import Layout from './Layout.vue'
import SidebarNav from './SidebarNav.vue'
import PageHeader from './PageHeader.vue'
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
    label: 'Configuration',
    items: [{ label: 'Settings', icon: Settings, to: '/settings' }]
  }
]

const meta = {
  title: 'Admin/Layout/Layout',
  component: Layout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  }
} satisfies Meta<typeof Layout>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { Layout, SidebarNav, PageHeader },
    setup: () => ({ sections }),
    template: `
      <Layout>
        <template #sidebar>
          <SidebarNav
            :sections="sections"
            user-name="John Doe"
            user-email="john@custimoo.com"
          />
        </template>
        <PageHeader title="Orders" />
        <div class="p-4 text-sm text-foreground-secondary">
          Page content goes here
        </div>
      </Layout>
    `
  })
}
