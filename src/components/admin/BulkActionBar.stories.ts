import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { UserPlus, Download, ArrowRightLeft, PauseCircle, Trash2 } from 'lucide-vue-next'
import BulkActionBar from './BulkActionBar.vue'
import { Button } from '@/components/ui/button'

const meta = {
  title: 'Admin/Controls/BulkActionBar',
  component: BulkActionBar,
  tags: ['autodocs']
} satisfies Meta<typeof BulkActionBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { count: 14, itemLabel: 'orders' },
  render: () => ({
    components: { BulkActionBar, Button, UserPlus, Download },
    setup() {
      const count = ref(14)
      const menuItems = [
        {
          label: 'Change order step',
          icon: ArrowRightLeft,
          onClick: () => console.log('Change order step')
        },
        {
          label: 'Put on hold',
          icon: PauseCircle,
          onClick: () => console.log('Put on hold')
        },
        {
          label: 'Delete order',
          icon: Trash2,
          variant: 'destructive' as const,
          onClick: () => console.log('Delete order')
        }
      ]
      return { count, menuItems }
    },
    template: `
      <div class="h-[200px] flex items-center justify-center text-sm text-foreground-tertiary">
        The bulk action bar appears at the bottom of the viewport
      </div>
      <BulkActionBar
        :count="count"
        item-label="orders"
        :menu-items="menuItems"
        @close="count = 0"
      >
        <Button variant="default">
          <UserPlus class="size-4" />
          Assign order admin
        </Button>
        <Button variant="default">
          <Download class="size-4" />
          Export order data
        </Button>
      </BulkActionBar>
    `
  })
}

export const SingleAction: Story = {
  args: { count: 3, itemLabel: 'products' },
  render: () => ({
    components: { BulkActionBar, Button, Download },
    setup() {
      const count = ref(3)
      return { count }
    },
    template: `
      <div class="h-[200px] flex items-center justify-center text-sm text-foreground-tertiary">
        Single action variant
      </div>
      <BulkActionBar
        :count="count"
        item-label="products"
        @close="count = 0"
      >
        <Button variant="default">
          <Download class="size-4" />
          Export
        </Button>
      </BulkActionBar>
    `
  })
}
