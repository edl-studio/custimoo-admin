import type { Meta, StoryObj } from '@storybook/vue3-vite'
import CellText from './CellText.vue'

const meta = {
  title: 'Admin/Table Cells/CellText',
  component: CellText,
  tags: ['autodocs'],
  decorators: [
    () => ({
      template: '<div class="w-[300px]"><story /></div>'
    })
  ]
} satisfies Meta<typeof CellText>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => ({
    components: { CellText },
    setup: () => ({ args }),
    template: '<CellText v-bind="args">Acme Corporation</CellText>'
  })
}

export const Primary: Story = {
  args: { color: 'primary', weight: 'medium' },
  render: args => ({
    components: { CellText },
    setup: () => ({ args }),
    template: '<CellText v-bind="args">ORD-18530</CellText>'
  })
}

export const Secondary: Story = {
  args: { color: 'secondary' },
  render: args => ({
    components: { CellText },
    setup: () => ({ args }),
    template: '<CellText v-bind="args">John Smith</CellText>'
  })
}

export const Tertiary: Story = {
  args: { color: 'tertiary' },
  render: args => ({
    components: { CellText },
    setup: () => ({ args }),
    template: '<CellText v-bind="args">3 days ago</CellText>'
  })
}

export const SmallSize: Story = {
  args: { color: 'secondary', size: 'sm' },
  render: args => ({
    components: { CellText },
    setup: () => ({ args }),
    template: '<CellText v-bind="args">Upload production files</CellText>'
  })
}

export const Monospace: Story = {
  args: { color: 'secondary', mono: true },
  render: args => ({
    components: { CellText },
    setup: () => ({ args }),
    template: '<CellText v-bind="args">REF-2024-ABC-1234</CellText>'
  })
}

export const AllVariants: Story = {
  decorators: [
    () => ({
      template: '<div class="w-[400px]"><story /></div>'
    })
  ],
  render: () => ({
    components: { CellText },
    template: `
      <div class="flex flex-col gap-3">
        <CellText color="primary" weight="medium">Primary medium — ORD-18530</CellText>
        <CellText color="primary">Primary regular — Order title</CellText>
        <CellText color="secondary">Secondary — Acme Corporation</CellText>
        <CellText color="tertiary">Tertiary — 3 days ago</CellText>
        <CellText color="secondary" size="sm">Small — Upload production files</CellText>
        <CellText color="secondary" mono>Mono — REF-2024-ABC-1234</CellText>
      </div>
    `
  })
}
