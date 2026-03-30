import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Store } from 'lucide-vue-next'
import AdminAvatar from './AdminAvatar.vue'

const meta = {
  title: 'Admin/Brand/AdminAvatar',
  component: AdminAvatar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg']
    }
  }
} satisfies Meta<typeof AdminAvatar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: 'Jane Doe'
  }
}

export const ExtraSmall: Story = {
  args: {
    name: 'Jane Doe',
    size: 'xs'
  }
}

export const Small: Story = {
  args: {
    name: 'Jane Doe',
    size: 'sm'
  }
}

export const Medium: Story = {
  args: {
    name: 'Jane Doe',
    size: 'md'
  }
}

export const Large: Story = {
  args: {
    name: 'Jane Doe',
    size: 'lg'
  }
}

export const WithIcon: Story = {
  args: {
    name: 'Store',
    size: 'lg',
    icon: Store
  }
}

export const SingleName: Story = {
  args: {
    name: 'Alice',
    size: 'lg'
  }
}

export const AllSizes: Story = {
  args: {
    name: 'Jane Doe'
  },
  render: () => ({
    components: { AdminAvatar },
    template: `
      <div class="flex items-center gap-3">
        <AdminAvatar name="Jane Doe" size="xs" />
        <AdminAvatar name="Jane Doe" size="sm" />
        <AdminAvatar name="Jane Doe" size="md" />
        <AdminAvatar name="Jane Doe" size="lg" />
      </div>
    `
  })
}

export const DifferentLetters: Story = {
  args: {
    name: 'Alice'
  },
  render: () => ({
    components: { AdminAvatar },
    template: `
      <div class="flex items-center gap-2">
        <AdminAvatar name="Alice Brown" size="md" />
        <AdminAvatar name="Charlie Davis" size="md" />
        <AdminAvatar name="Eve Foster" size="md" />
        <AdminAvatar name="Grace Hill" size="md" />
        <AdminAvatar name="Kyle Morgan" size="md" />
        <AdminAvatar name="Paul Reed" size="md" />
        <AdminAvatar name="Sam Turner" size="md" />
        <AdminAvatar name="Wendy Young" size="md" />
      </div>
    `
  })
}
