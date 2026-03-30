import type { Meta, StoryObj } from '@storybook/vue3-vite'
import CustimooLogoMark from './CustimooLogoMark.vue'

const meta = {
  title: 'Admin/Brand/CustimooLogoMark',
  component: CustimooLogoMark,
  tags: ['autodocs']
} satisfies Meta<typeof CustimooLogoMark>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const CustomSize: Story = {
  args: {
    class: 'size-10'
  }
}
