import type { Meta, StoryObj } from '@storybook/vue3-vite'
import CustimooLogo from './CustimooLogo.vue'

const meta = {
  title: 'Admin/CustimooLogo',
  component: CustimooLogo,
  tags: ['autodocs']
} satisfies Meta<typeof CustimooLogo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const CustomSize: Story = {
  args: {
    class: 'h-10 w-auto'
  }
}

export const OnDark: Story = {
  decorators: [
    () => ({
      template: '<div class="rounded-lg bg-zinc-900 p-6 text-white"><story /></div>'
    })
  ]
}
