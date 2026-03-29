import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Search } from 'lucide-vue-next'
import TextInput from './TextInput.vue'

const meta = {
  title: 'Admin/TextInput',
  component: TextInput,
  tags: ['autodocs'],
  decorators: [
    () => ({
      template: '<div class="w-[400px]"><story /></div>'
    })
  ]
} satisfies Meta<typeof TextInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder'
  }
}

export const Large: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    size: 'lg'
  }
}

export const WithIcon: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder'
  },
  render: args => ({
    components: { TextInput, Search },
    setup: () => ({ args }),
    template: `
      <TextInput v-bind="args">
        <template #icon>
          <Search class="size-4 text-muted-foreground" />
        </template>
      </TextInput>
    `
  })
}

export const WithIconLarge: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    size: 'lg'
  },
  render: args => ({
    components: { TextInput, Search },
    setup: () => ({ args }),
    template: `
      <TextInput v-bind="args">
        <template #icon>
          <Search class="size-4 text-muted-foreground" />
        </template>
      </TextInput>
    `
  })
}

export const Disabled: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    disabled: true
  }
}

export const DisabledWithIcon: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    disabled: true
  },
  render: args => ({
    components: { TextInput, Search },
    setup: () => ({ args }),
    template: `
      <TextInput v-bind="args">
        <template #icon>
          <Search class="size-4 text-muted-foreground" />
        </template>
      </TextInput>
    `
  })
}

export const Error: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    error: 'Validation error'
  }
}

export const ErrorWithIcon: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    error: 'Validation error'
  },
  render: args => ({
    components: { TextInput, Search },
    setup: () => ({ args }),
    template: `
      <TextInput v-bind="args">
        <template #icon>
          <Search class="size-4 text-muted-foreground" />
        </template>
      </TextInput>
    `
  })
}

export const AllStates: Story = {
  decorators: [
    () => ({
      template: '<div class="flex gap-8"><story /></div>'
    })
  ],
  render: () => ({
    components: { TextInput, Search },
    template: `
      <div class="flex flex-col gap-6 w-[400px]">
        <h3 class="text-sm font-medium text-foreground-secondary">Default size</h3>
        <TextInput label="Label" placeholder="Placeholder">
          <template #icon><Search class="size-4 text-muted-foreground" /></template>
        </TextInput>
        <TextInput label="Label" placeholder="Placeholder" disabled>
          <template #icon><Search class="size-4 text-muted-foreground" /></template>
        </TextInput>
        <TextInput label="Label" placeholder="Placeholder" error="Validation error">
          <template #icon><Search class="size-4 text-muted-foreground" /></template>
        </TextInput>
      </div>
      <div class="flex flex-col gap-6 w-[400px]">
        <h3 class="text-sm font-medium text-foreground-secondary">Large size</h3>
        <TextInput label="Label" placeholder="Placeholder" size="lg">
          <template #icon><Search class="size-4 text-muted-foreground" /></template>
        </TextInput>
        <TextInput label="Label" placeholder="Placeholder" size="lg" disabled>
          <template #icon><Search class="size-4 text-muted-foreground" /></template>
        </TextInput>
        <TextInput label="Label" placeholder="Placeholder" size="lg" error="Validation error">
          <template #icon><Search class="size-4 text-muted-foreground" /></template>
        </TextInput>
      </div>
    `
  })
}
